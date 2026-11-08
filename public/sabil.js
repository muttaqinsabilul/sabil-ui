/*!
 * Sabil UI — sabil.js
 * Vanilla JavaScript for the interactive components in sabil.css.
 * No dependencies. Load once, anywhere on the page:
 *
 *   <script src="sabil.js" defer></script>
 *
 * Components wire themselves up from data attributes, including markup
 * added later (all listeners are delegated to document).
 *
 *   Tabs       <div data-s-tabs> role="tablist" / role="tab" / role="tabpanel"
 *   Dialog     <button data-s-open="id">  <dialog id="id" class="s-dialog">
 *   Sheet      <button data-s-open="id">  <dialog id="id" class="s-sheet">
 *   Close      any element with data-s-close inside a dialog or sheet
 *   Menu       <button data-s-menu="id">  <div id="id" class="s-menu" role="menu" hidden>
 *   Popover    <button data-s-popover="id">  <div id="id" class="s-popover" hidden>
 *   Combobox   <div class="s-combobox" data-s-combobox> input + role="listbox"
 *   Toast      Sabil.toast({ title, description, variant, action })
 *              or <button data-s-toast="Title" data-s-toast-description="…">
 */
;(function () {
  "use strict"

  var EXIT_MS = 160
  var Sabil = (window.Sabil = window.Sabil || {})

  function $(sel, root) {
    return (root || document).querySelector(sel)
  }
  function $$(sel, root) {
    return Array.prototype.slice.call((root || document).querySelectorAll(sel))
  }

  /* Opens an element: unhide, then set data-state on the next frame so
   * the CSS transition runs from the closed state. */
  function show(el) {
    clearTimeout(el._kTimer)
    el.hidden = false
    el.setAttribute("data-state", "closed")
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        el.setAttribute("data-state", "open")
      })
    })
  }

  /* Closes an element: play the exit transition, then hide it. */
  function hide(el, done) {
    el.setAttribute("data-state", "closed")
    clearTimeout(el._kTimer)
    el._kTimer = setTimeout(function () {
      if (el.getAttribute("data-state") === "closed") {
        el.hidden = true
        if (done) done()
      }
    }, EXIT_MS)
  }

  /* ----------------------------------------------------------------
   * Tabs
   * ---------------------------------------------------------------- */
  function selectTab(tab, focus) {
    var list = tab.closest('[role="tablist"]')
    var root = tab.closest("[data-s-tabs]") || document
    $$('[role="tab"]', list).forEach(function (t) {
      var on = t === tab
      t.setAttribute("aria-selected", on ? "true" : "false")
      t.tabIndex = on ? 0 : -1
      var panel = document.getElementById(t.getAttribute("aria-controls"))
      if (panel) panel.hidden = !on
    })
    if (focus) tab.focus()
    root.dispatchEvent(new CustomEvent("s-change", { detail: { tab: tab }, bubbles: true }))
  }

  function initTabs(root) {
    $$('[data-s-tabs] [role="tablist"]', root).forEach(function (list) {
      var tabs = $$('[role="tab"]', list)
      var selected = tabs.filter(function (t) {
        return t.getAttribute("aria-selected") === "true"
      })[0] || tabs[0]
      if (selected) selectTab(selected, false)
    })
  }

  document.addEventListener("click", function (e) {
    var tab = e.target.closest('[data-s-tabs] [role="tab"]')
    if (tab) selectTab(tab, false)
  })

  document.addEventListener("keydown", function (e) {
    var tab = e.target.closest && e.target.closest('[data-s-tabs] [role="tab"]')
    if (!tab) return
    var tabs = $$('[role="tab"]', tab.closest('[role="tablist"]'))
    var i = tabs.indexOf(tab)
    var next = null
    if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length]
    if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length]
    if (e.key === "Home") next = tabs[0]
    if (e.key === "End") next = tabs[tabs.length - 1]
    if (next) {
      e.preventDefault()
      selectTab(next, true)
    }
  })

  /* ----------------------------------------------------------------
   * Dialog & sheet (native <dialog>: focus trap, Escape, top layer)
   * ---------------------------------------------------------------- */
  function openDialog(dialog, trigger) {
    if (!dialog || dialog.open) return
    dialog._kTrigger = trigger || document.activeElement
    dialog.showModal()
    dialog.setAttribute("data-state", "closed")
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        dialog.setAttribute("data-state", "open")
      })
    })
  }

  function closeDialog(dialog) {
    if (!dialog || !dialog.open) return
    var isSheet = dialog.classList.contains("s-sheet")
    dialog.setAttribute("data-state", "closed")
    setTimeout(function () {
      dialog.close()
      if (dialog._kTrigger && dialog._kTrigger.focus) dialog._kTrigger.focus()
    }, isSheet ? 250 : EXIT_MS)
  }

  Sabil.openDialog = function (id) {
    openDialog(document.getElementById(id))
  }
  Sabil.closeDialog = function (id) {
    closeDialog(document.getElementById(id))
  }

  document.addEventListener("click", function (e) {
    var opener = e.target.closest("[data-s-open]")
    if (opener) {
      openDialog(document.getElementById(opener.getAttribute("data-s-open")), opener)
      return
    }
    var closer = e.target.closest("[data-s-close]")
    if (closer) {
      closeDialog(closer.closest("dialog"))
      return
    }
    // A click on the <dialog> element itself is a click on the backdrop,
    // because the visible panel is a child that fills the content box.
    if (e.target.matches && e.target.matches("dialog.s-dialog, dialog.s-sheet")) {
      closeDialog(e.target)
    }
  })

  // Escape: animate out instead of closing instantly.
  document.addEventListener(
    "cancel",
    function (e) {
      if (e.target.matches && e.target.matches("dialog.s-dialog, dialog.s-sheet")) {
        e.preventDefault()
        closeDialog(e.target)
      }
    },
    true
  )

  /* ----------------------------------------------------------------
   * Menu & popover (shared floating logic)
   * ---------------------------------------------------------------- */
  var openFloating = null // { el, trigger, kind }

  /* Places el under (or above) the trigger and sets the transform
   * origin to the trigger side, so it grows out of the button. */
  function position(trigger, el) {
    var r = trigger.getBoundingClientRect()
    var w = el.offsetWidth
    var h = el.offsetHeight
    var gap = 6
    var vw = document.documentElement.clientWidth
    var vh = document.documentElement.clientHeight
    var align = el.getAttribute("data-align") || "start"

    var top = r.bottom + gap
    var originY = "top"
    if (top + h > vh - 8 && r.top - gap - h > 8) {
      top = r.top - gap - h
      originY = "bottom"
    }
    var left = align === "end" ? r.right - w : align === "center" ? r.left + r.width / 2 - w / 2 : r.left
    left = Math.max(8, Math.min(left, vw - w - 8))
    var originX = Math.max(0, Math.min(w, r.left + r.width / 2 - left))

    el.style.top = top + "px"
    el.style.left = left + "px"
    el.style.transformOrigin = originX + "px " + originY
  }

  function openFloat(el, trigger, kind) {
    if (openFloating) closeFloat(false)
    el.hidden = false
    position(trigger, el)
    show(el)
    trigger.setAttribute("aria-expanded", "true")
    openFloating = { el: el, trigger: trigger, kind: kind }
    if (kind === "menu") {
      var first = menuItems(el)[0]
      if (first) first.focus()
    } else {
      var focusable = $("input, textarea, select, button, [href], [tabindex]:not([tabindex='-1'])", el)
      if (focusable) focusable.focus()
    }
  }

  function closeFloat(returnFocus) {
    if (!openFloating) return
    var o = openFloating
    openFloating = null
    o.trigger.setAttribute("aria-expanded", "false")
    hide(o.el)
    if (returnFocus) o.trigger.focus()
  }

  function menuItems(menu) {
    return $$('[role="menuitem"]:not([disabled]), [role="menuitemcheckbox"]:not([disabled])', menu)
  }

  function toggle(trigger, attr, kind) {
    var el = document.getElementById(trigger.getAttribute(attr))
    if (!el) return
    if (openFloating && openFloating.el === el) closeFloat(true)
    else openFloat(el, trigger, kind)
  }

  document.addEventListener("click", function (e) {
    var menuTrigger = e.target.closest("[data-s-menu]")
    if (menuTrigger) return toggle(menuTrigger, "data-s-menu", "menu")
    var popTrigger = e.target.closest("[data-s-popover]")
    if (popTrigger) return toggle(popTrigger, "data-s-popover", "popover")

    var item = e.target.closest('.s-menu [role="menuitem"]')
    if (item && openFloating) {
      openFloating.el.dispatchEvent(
        new CustomEvent("s-select", { detail: { item: item, value: item.getAttribute("data-value") || item.textContent.trim() }, bubbles: true })
      )
      closeFloat(true)
      return
    }
    if (openFloating && !openFloating.el.contains(e.target)) closeFloat(false)
  })

  document.addEventListener("keydown", function (e) {
    // Arrow keys on a closed menu trigger open it.
    var trigger = e.target.closest && e.target.closest("[data-s-menu]")
    if (trigger && (e.key === "ArrowDown" || e.key === "ArrowUp") && !openFloating) {
      e.preventDefault()
      return toggle(trigger, "data-s-menu", "menu")
    }
    if (!openFloating) return
    if (e.key === "Escape") {
      e.preventDefault()
      return closeFloat(true)
    }
    if (openFloating.kind !== "menu") return
    var items = menuItems(openFloating.el)
    var i = items.indexOf(document.activeElement)
    var next = null
    if (e.key === "ArrowDown") next = items[(i + 1) % items.length]
    if (e.key === "ArrowUp") next = items[(i - 1 + items.length) % items.length]
    if (e.key === "Home") next = items[0]
    if (e.key === "End") next = items[items.length - 1]
    if (e.key === "Tab") return closeFloat(false)
    if (next) {
      e.preventDefault()
      next.focus()
    }
  })

  window.addEventListener("resize", function () {
    if (openFloating) position(openFloating.trigger, openFloating.el)
  })
  window.addEventListener(
    "scroll",
    function () {
      if (openFloating) position(openFloating.trigger, openFloating.el)
    },
    true
  )

  /* ----------------------------------------------------------------
   * Combobox
   * ---------------------------------------------------------------- */
  function comboParts(root) {
    return {
      input: $('input[role="combobox"]', root),
      list: $('[role="listbox"]', root),
      empty: $(".s-listbox__empty", root),
    }
  }

  function visibleOptions(list) {
    return $$('[role="option"]', list).filter(function (o) {
      return !o.hidden
    })
  }

  function setActive(root, option) {
    var p = comboParts(root)
    $$('[role="option"]', p.list).forEach(function (o) {
      o.removeAttribute("data-active")
    })
    if (option) {
      option.setAttribute("data-active", "true")
      p.input.setAttribute("aria-activedescendant", option.id)
      option.scrollIntoView({ block: "nearest" })
    } else {
      p.input.removeAttribute("aria-activedescendant")
    }
  }

  function filterCombo(root) {
    var p = comboParts(root)
    var q = p.input.value.trim().toLowerCase()
    var any = false
    $$('[role="option"]', p.list).forEach(function (o) {
      var match = o.textContent.toLowerCase().indexOf(q) !== -1
      o.hidden = !match
      if (match) any = true
    })
    if (p.empty) p.empty.hidden = any
    setActive(root, visibleOptions(p.list)[0])
  }

  function openCombo(root) {
    var p = comboParts(root)
    if (!p.list.hidden && p.list.getAttribute("data-state") === "open") return
    show(p.list)
    p.input.setAttribute("aria-expanded", "true")
  }

  function closeCombo(root) {
    var p = comboParts(root)
    if (p.list.hidden) return
    p.input.setAttribute("aria-expanded", "false")
    hide(p.list)
  }

  function chooseOption(root, option) {
    var p = comboParts(root)
    $$('[role="option"]', p.list).forEach(function (o) {
      o.setAttribute("aria-selected", o === option ? "true" : "false")
    })
    p.input.value = option.textContent.trim()
    closeCombo(root)
    root.dispatchEvent(
      new CustomEvent("s-change", { detail: { value: option.getAttribute("data-value") || p.input.value }, bubbles: true })
    )
  }

  function initCombobox(root) {
    $$("[data-s-combobox]", root).forEach(function (combo, n) {
      var p = comboParts(combo)
      if (!p.input || !p.list) return
      if (!p.list.id) p.list.id = "s-listbox-" + n
      p.input.setAttribute("aria-controls", p.list.id)
      p.input.setAttribute("aria-expanded", "false")
      p.input.setAttribute("aria-autocomplete", "list")
      $$('[role="option"]', p.list).forEach(function (o, i) {
        if (!o.id) o.id = p.list.id + "-" + i
        o.classList.add("s-option")
      })
    })
  }

  document.addEventListener("input", function (e) {
    var root = e.target.closest && e.target.closest("[data-s-combobox]")
    if (!root) return
    openCombo(root)
    filterCombo(root)
  })

  document.addEventListener("focusin", function (e) {
    var root = e.target.closest && e.target.closest("[data-s-combobox]")
    if (root && e.target.matches('input[role="combobox"]')) {
      openCombo(root)
      filterCombo(root)
    }
  })

  document.addEventListener("mousedown", function (e) {
    var option = e.target.closest('[data-s-combobox] [role="option"]')
    if (option) {
      e.preventDefault() // keep focus in the input
      chooseOption(option.closest("[data-s-combobox]"), option)
      return
    }
    $$("[data-s-combobox]").forEach(function (root) {
      if (!root.contains(e.target)) closeCombo(root)
    })
  })

  document.addEventListener("keydown", function (e) {
    var root = e.target.closest && e.target.closest("[data-s-combobox]")
    if (!root) return
    var p = comboParts(root)
    var options = visibleOptions(p.list)
    var current = options.indexOf($('[data-active="true"]', p.list))
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault()
      openCombo(root)
      var step = e.key === "ArrowDown" ? 1 : -1
      setActive(root, options[(current + step + options.length) % options.length])
    } else if (e.key === "Enter") {
      if (!p.list.hidden && options[current]) {
        e.preventDefault()
        chooseOption(root, options[current])
      }
    } else if (e.key === "Escape") {
      closeCombo(root)
    } else if (e.key === "Tab") {
      closeCombo(root)
    }
  })

  /* ----------------------------------------------------------------
   * Toast
   * ---------------------------------------------------------------- */
  var MAX_TOASTS = 3

  function toaster() {
    var el = $(".s-toaster")
    if (!el) {
      el = document.createElement("ol")
      el.className = "s-toaster"
      el.setAttribute("aria-live", "polite")
      document.body.appendChild(el)
    }
    return el
  }

  function dismiss(toast) {
    if (toast._kGone) return
    toast._kGone = true
    clearTimeout(toast._kTimer)
    toast.setAttribute("data-state", "closed")
    setTimeout(function () {
      toast.remove()
    }, EXIT_MS)
  }

  Sabil.toast = function (options) {
    var o = typeof options === "string" ? { title: options } : options || {}
    var list = toaster()
    var toast = document.createElement("li")
    toast.className = "s-toast" + (o.variant === "destructive" ? " s-toast--destructive" : "")
    toast.setAttribute("role", o.variant === "destructive" ? "alert" : "status")

    var title = document.createElement("p")
    title.className = "s-toast__title"
    title.textContent = o.title || ""
    toast.appendChild(title)

    if (o.description) {
      var desc = document.createElement("p")
      desc.className = "s-toast__description"
      desc.textContent = o.description
      toast.appendChild(desc)
    }

    if (o.action) {
      var btn = document.createElement("button")
      btn.type = "button"
      btn.className = "s-btn s-btn--outline s-btn--sm"
      btn.textContent = o.action.label
      btn.addEventListener("click", function () {
        if (o.action.onClick) o.action.onClick()
        dismiss(toast)
      })
      toast.appendChild(btn)
    }

    list.appendChild(toast)
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        toast.setAttribute("data-state", "open")
      })
    })

    // Auto-dismiss, paused while hovered or while the tab is hidden.
    var duration = o.duration || 4000
    var remaining = duration
    var started = Date.now()
    function start() {
      started = Date.now()
      toast._kTimer = setTimeout(function () {
        dismiss(toast)
      }, remaining)
    }
    function pause() {
      clearTimeout(toast._kTimer)
      remaining -= Date.now() - started
    }
    toast.addEventListener("mouseenter", pause)
    toast.addEventListener("mouseleave", start)
    document.addEventListener("visibilitychange", function () {
      if (toast._kGone) return
      if (document.hidden) pause()
      else start()
    })
    start()

    var live = $$(".s-toast:not([data-state='closed'])", list)
    if (live.length > MAX_TOASTS) dismiss(live[0])

    return { dismiss: function () { dismiss(toast) } }
  }

  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-s-toast]")
    if (t) {
      Sabil.toast({
        title: t.getAttribute("data-s-toast"),
        description: t.getAttribute("data-s-toast-description") || undefined,
        variant: t.getAttribute("data-s-toast-variant") || undefined,
      })
    }
  })

  /* ----------------------------------------------------------------
   * Init
   * ---------------------------------------------------------------- */
  Sabil.init = function (root) {
    initTabs(root)
    initCombobox(root)
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      Sabil.init()
    })
  } else {
    Sabil.init()
  }
})()
