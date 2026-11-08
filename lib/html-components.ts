/** Plain HTML snippets for the CSS-only edition (public/sabil.css). */
export type HtmlComponent = {
  id: string
  title: string
  description: string
  html: string
  /** Needs sabil.js. */
  interactive?: boolean
  /** Minimum preview height, for overlays that open inside the frame. */
  minHeight?: number
}

const icon = (path: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`

const icons = {
  plus: icon('<path d="M5 12h14"/><path d="M12 5v14"/>'),
  arrowRight: icon('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
  info: icon('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  alert: icon('<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>'),
  folder: icon('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'),
  user: icon('<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>'),
  settings: icon('<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'),
  logout: icon('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>'),
  chevron: icon('<path d="m6 9 6 6 6-6"/>'),
  copy: icon('<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
}

export const htmlComponents: HtmlComponent[] = [
  {
    id: "button",
    title: "Button",
    description: "Primary uses the blue gradient surface. Add a modifier for other variants and sizes.",
    html: `<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
  <button class="s-btn">Sign in</button>
  <button class="s-btn s-btn--outline">Documentation</button>
  <button class="s-btn s-btn--secondary">Secondary</button>
  <button class="s-btn s-btn--ghost">Ghost</button>
  <button class="s-btn s-btn--destructive">Delete</button>
  <button class="s-btn s-btn--link">Link</button>
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
  <button class="s-btn s-btn--outline s-btn--sm">Small</button>
  <button class="s-btn s-btn--outline">Default</button>
  <button class="s-btn s-btn--outline s-btn--lg">Large</button>
  <button class="s-btn s-btn--outline s-btn--icon" aria-label="Add">${icons.plus}</button>
  <button class="s-btn">Continue ${icons.arrowRight}</button>
  <button class="s-btn" disabled>Disabled</button>
</div>`,
  },
  {
    id: "input",
    title: "Input & Field",
    description: "Wrap a label, control and hint in s-field. Set aria-invalid for the error state.",
    html: `<form style="display:grid;gap:16px;width:100%;max-width:360px">
  <div class="s-field">
    <label class="s-label" for="email">Email</label>
    <input class="s-input" id="email" type="email" placeholder="you@example.com">
    <p class="s-field__hint">We never share your email.</p>
  </div>
  <div class="s-field">
    <label class="s-label" for="password">Password</label>
    <input class="s-input" id="password" type="password" aria-invalid="true" value="123">
    <p class="s-field__error">Use at least 8 characters.</p>
  </div>
  <button class="s-btn s-btn--block">Create account</button>
</form>`,
  },
  {
    id: "textarea",
    title: "Textarea & Select",
    description: "Native elements with the same border, radius and focus ring as the input.",
    html: `<div style="display:grid;gap:16px;width:100%;max-width:360px">
  <div class="s-field">
    <label class="s-label" for="role">Role</label>
    <select class="s-select" id="role">
      <option>Designer</option>
      <option>Engineer</option>
      <option>Product manager</option>
    </select>
  </div>
  <div class="s-field">
    <label class="s-label" for="bio">Bio</label>
    <textarea class="s-textarea" id="bio" placeholder="Tell us a little about yourself"></textarea>
  </div>
</div>`,
  },
  {
    id: "choice",
    title: "Checkbox, Radio & Switch",
    description: "Native inputs restyled. Keyboard and form support come for free.",
    html: `<div style="display:grid;gap:12px">
  <label class="s-choice"><input class="s-checkbox" type="checkbox" checked> Accept terms and conditions</label>
  <label class="s-choice"><input class="s-checkbox" type="checkbox"> Send me product updates</label>
  <div style="display:flex;gap:16px">
    <label class="s-choice"><input class="s-radio" type="radio" name="plan" checked> Monthly</label>
    <label class="s-choice"><input class="s-radio" type="radio" name="plan"> Yearly</label>
  </div>
  <label class="s-choice"><input class="s-switch" type="checkbox" role="switch" checked> Notifications</label>
</div>`,
  },
  {
    id: "segmented",
    title: "Segmented Control",
    description: "Tabs without JavaScript, built on radio inputs. Use a shared name per group.",
    html: `<div class="s-tabs" role="radiogroup" aria-label="Billing period" style="width:100%;max-width:384px">
  <label class="s-tabs__item"><input type="radio" name="period" checked><span>Monthly</span></label>
  <label class="s-tabs__item"><input type="radio" name="period"><span>Yearly</span></label>
</div>`,
  },
  {
    id: "badge",
    title: "Badge",
    description: "Small status labels.",
    html: `<div style="display:flex;flex-wrap:wrap;gap:8px">
  <span class="s-badge">New</span>
  <span class="s-badge s-badge--secondary">Draft</span>
  <span class="s-badge s-badge--outline">v2.4.0</span>
  <span class="s-badge s-badge--destructive">Failed</span>
</div>`,
  },
  {
    id: "card",
    title: "Card",
    description: "Header, content and footer. Any element works inside.",
    html: `<div class="s-card" style="width:100%;max-width:360px">
  <div class="s-card__header">
    <h3 class="s-card__title">Upgrade to Pro</h3>
    <p class="s-card__description">Unlimited projects and priority support.</p>
  </div>
  <p style="margin:0;font-size:32px;font-weight:600;letter-spacing:-0.02em">$24<span style="font-size:14px;font-weight:400;color:var(--s-muted-fg)">/month</span></p>
  <div class="s-card__footer">
    <button class="s-btn s-btn--outline" style="flex:1">Later</button>
    <button class="s-btn" style="flex:1">Upgrade</button>
  </div>
</div>`,
  },
  {
    id: "alert",
    title: "Alert",
    description: "A callout with an optional icon.",
    html: `<div style="display:grid;gap:12px;width:100%;max-width:440px">
  <div class="s-alert" role="status">
    ${icons.info}
    <p class="s-alert__title">A new version is available</p>
    <p class="s-alert__description">Reload the page to get the latest features.</p>
  </div>
  <div class="s-alert s-alert--destructive" role="alert">
    ${icons.alert}
    <p class="s-alert__title">Payment failed</p>
    <p class="s-alert__description">Check your card details and try again.</p>
  </div>
</div>`,
  },
  {
    id: "avatar",
    title: "Avatar",
    description: "Initials or an image. Group them with s-avatar-group.",
    html: `<div style="display:flex;gap:24px;align-items:center">
  <span class="s-avatar">ML</span>
  <span class="s-avatar s-avatar--lg">JR</span>
  <div class="s-avatar-group">
    <span class="s-avatar">AL</span>
    <span class="s-avatar">MK</span>
    <span class="s-avatar">SN</span>
    <span class="s-avatar">+5</span>
  </div>
</div>`,
  },
  {
    id: "accordion",
    title: "Accordion",
    description: "Native <details>. Opens and closes without JavaScript, and stays accessible.",
    html: `<div style="width:100%;max-width:440px">
  <details class="s-accordion" open>
    <summary>What is your return policy?</summary>
    <div class="s-accordion__content">Return any item within 30 days for a full refund.</div>
  </details>
  <details class="s-accordion">
    <summary>How long does shipping take?</summary>
    <div class="s-accordion__content">Standard shipping takes 3–5 business days.</div>
  </details>
  <details class="s-accordion">
    <summary>Do you ship internationally?</summary>
    <div class="s-accordion__content">Yes, to over 40 countries.</div>
  </details>
</div>`,
  },
  {
    id: "table",
    title: "Table",
    description: "Readable defaults for tabular data.",
    html: `<table class="s-table" style="max-width:520px">
  <thead>
    <tr><th>Invoice</th><th>Status</th><th>Method</th><th style="text-align:right">Amount</th></tr>
  </thead>
  <tbody>
    <tr><td>INV-001</td><td><span class="s-badge s-badge--secondary">Paid</span></td><td>Card</td><td style="text-align:right">$250.00</td></tr>
    <tr><td>INV-002</td><td><span class="s-badge s-badge--outline">Pending</span></td><td>Transfer</td><td style="text-align:right">$150.00</td></tr>
    <tr><td>INV-003</td><td><span class="s-badge s-badge--destructive">Failed</span></td><td>Card</td><td style="text-align:right">$350.00</td></tr>
  </tbody>
</table>`,
  },
  {
    id: "navigation",
    title: "Breadcrumb & Pagination",
    description: "Mark the current page with aria-current.",
    html: `<div style="display:grid;gap:24px;justify-items:center">
  <nav aria-label="Breadcrumb">
    <ol class="s-breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">Settings</a></li>
      <li><span aria-current="page">Billing</span></li>
    </ol>
  </nav>
  <nav class="s-pagination" aria-label="Pagination">
    <a class="s-pagination__link" href="#">Previous</a>
    <a class="s-pagination__link" href="#">1</a>
    <a class="s-pagination__link" href="#" aria-current="page">2</a>
    <a class="s-pagination__link" href="#">3</a>
    <a class="s-pagination__link" href="#">Next</a>
  </nav>
</div>`,
  },
  {
    id: "feedback",
    title: "Progress, Skeleton & Spinner",
    description: "Loading states. The skeleton shimmer and spinner stop when reduced motion is on.",
    html: `<div style="display:grid;gap:20px;width:100%;max-width:360px">
  <progress class="s-progress" value="60" max="100">60%</progress>
  <div style="display:flex;gap:12px;align-items:center">
    <span class="s-skeleton" style="width:40px;height:40px;border-radius:50%"></span>
    <div style="display:grid;gap:8px;flex:1">
      <span class="s-skeleton" style="height:14px;width:60%"></span>
      <span class="s-skeleton" style="height:12px;width:85%"></span>
    </div>
  </div>
  <button class="s-btn" disabled style="opacity:1"><span class="s-spinner"></span> Saving</button>
</div>`,
  },
  {
    id: "tooltip",
    title: "Tooltip & Kbd",
    description: "A CSS-only tooltip from the data-s-tooltip attribute. It waits 300ms before showing.",
    html: `<div style="display:flex;gap:16px;align-items:center">
  <button class="s-btn s-btn--outline s-btn--icon" data-s-tooltip="Copy link" aria-label="Copy link">${icons.copy}</button>
  <span style="display:inline-flex;gap:4px;align-items:center;color:var(--s-muted-fg)">Search <kbd class="s-kbd">Ctrl</kbd><kbd class="s-kbd">K</kbd></span>
</div>`,
  },
  {
    id: "empty",
    title: "Empty State",
    description: "A placeholder for lists with nothing in them yet.",
    html: `<div class="s-empty" style="width:100%;max-width:420px">
  <div class="s-empty__icon">${icons.folder}</div>
  <h3 class="s-empty__title">No projects yet</h3>
  <p class="s-empty__description">Create your first project to start collaborating with your team.</p>
  <button class="s-btn">${icons.plus} New project</button>
</div>`,
  },
  {
    id: "tabs",
    title: "Tabs",
    interactive: true,
    description: "Tabs with panels. Arrow keys, Home and End move between tabs.",
    html: `<div data-s-tabs style="width:100%;max-width:400px">
  <div class="s-tablist" role="tablist" aria-label="Account">
    <button class="s-tab" role="tab" aria-selected="true" aria-controls="tab-account">Account</button>
    <button class="s-tab" role="tab" aria-controls="tab-password">Password</button>
    <button class="s-tab" role="tab" aria-controls="tab-billing">Billing</button>
  </div>
  <div class="s-tabpanel" role="tabpanel" id="tab-account" tabindex="0">
    <div class="s-field"><label class="s-label" for="t-name">Name</label><input class="s-input" id="t-name" value="Maya Lestari"></div>
  </div>
  <div class="s-tabpanel" role="tabpanel" id="tab-password" tabindex="0" hidden>
    <div class="s-field"><label class="s-label" for="t-pass">New password</label><input class="s-input" id="t-pass" type="password"></div>
  </div>
  <div class="s-tabpanel" role="tabpanel" id="tab-billing" tabindex="0" hidden>
    <p style="margin:0;color:var(--s-muted-fg)">You are on the Pro plan, billed monthly.</p>
  </div>
</div>`,
  },
  {
    id: "dialog",
    title: "Dialog",
    interactive: true,
    minHeight: 380,
    description: "Built on native <dialog>: focus is trapped, Escape and the backdrop close it, and focus returns to the trigger.",
    html: `<button class="s-btn s-btn--outline" data-s-open="edit-profile">Edit profile</button>

<dialog class="s-dialog" id="edit-profile" aria-labelledby="edit-title">
  <form class="s-dialog__panel" id="edit-form">
    <div class="s-dialog__header">
      <h2 class="s-dialog__title" id="edit-title">Edit profile</h2>
      <p class="s-dialog__description">Changes are visible to your team.</p>
    </div>
    <div class="s-field"><label class="s-label" for="d-name">Name</label><input class="s-input" id="d-name" value="Maya Lestari"></div>
    <div class="s-field"><label class="s-label" for="d-user">Username</label><input class="s-input" id="d-user" value="@maya"></div>
    <div class="s-dialog__footer">
      <button type="button" class="s-btn s-btn--outline" data-s-close>Cancel</button>
      <button type="submit" class="s-btn">Save changes</button>
    </div>
  </form>
</dialog>

<script>
  document.getElementById("edit-form").addEventListener("submit", (e) => {
    e.preventDefault()
    Sabil.closeDialog("edit-profile")
    Sabil.toast({ title: "Profile saved" })
  })
</script>`,
  },
  {
    id: "alert-dialog",
    title: "Alert Dialog",
    interactive: true,
    minHeight: 320,
    description: "The same dialog, used to confirm a destructive action.",
    html: `<button class="s-btn s-btn--destructive" data-s-open="confirm-delete">Delete project</button>

<dialog class="s-dialog" id="confirm-delete" role="alertdialog" aria-labelledby="del-title" aria-describedby="del-desc">
  <div class="s-dialog__panel">
    <div class="s-dialog__header">
      <h2 class="s-dialog__title" id="del-title">Delete this project?</h2>
      <p class="s-dialog__description" id="del-desc">This removes the project and all of its data. This cannot be undone.</p>
    </div>
    <div class="s-dialog__footer">
      <button class="s-btn s-btn--outline" data-s-close>Cancel</button>
      <button class="s-btn s-btn--destructive" data-s-close data-s-toast="Project deleted" data-s-toast-variant="destructive">Delete</button>
    </div>
  </div>
</dialog>`,
  },
  {
    id: "sheet",
    title: "Sheet",
    interactive: true,
    minHeight: 420,
    description: "A dialog that slides in from the edge with the drawer curve. Add s-sheet--left for the other side.",
    html: `<button class="s-btn s-btn--outline" data-s-open="filters">Open filters</button>

<dialog class="s-sheet" id="filters" aria-labelledby="filters-title">
  <div class="s-sheet__panel">
    <div class="s-dialog__header">
      <h2 class="s-dialog__title" id="filters-title">Filters</h2>
      <p class="s-dialog__description">Narrow down the results.</p>
    </div>
    <label class="s-choice"><input class="s-checkbox" type="checkbox" checked> In stock</label>
    <label class="s-choice"><input class="s-checkbox" type="checkbox"> On sale</label>
    <label class="s-choice"><input class="s-checkbox" type="checkbox"> Free shipping</label>
    <div style="margin-top:auto;display:flex;gap:8px">
      <button class="s-btn s-btn--outline" style="flex:1" data-s-close>Reset</button>
      <button class="s-btn" style="flex:1" data-s-close>Apply</button>
    </div>
  </div>
</dialog>`,
  },
  {
    id: "dropdown-menu",
    title: "Dropdown Menu",
    interactive: true,
    minHeight: 340,
    description: "Opens under its trigger and grows from it. Arrow keys move, Escape closes, focus returns to the button.",
    html: `<button class="s-btn s-btn--outline" data-s-menu="account-menu" aria-haspopup="menu" aria-expanded="false">
  ${icons.user} My account ${icons.chevron}
</button>

<div class="s-menu" id="account-menu" role="menu" hidden>
  <div class="s-menu__label">maya@acme.com</div>
  <button class="s-menu__item" role="menuitem">${icons.user} Profile <span class="s-menu__shortcut">Ctrl P</span></button>
  <button class="s-menu__item" role="menuitem">${icons.settings} Settings <span class="s-menu__shortcut">Ctrl ,</span></button>
  <div class="s-menu__separator" role="separator"></div>
  <button class="s-menu__item s-menu__item--destructive" role="menuitem">${icons.logout} Log out</button>
</div>`,
  },
  {
    id: "popover",
    title: "Popover",
    interactive: true,
    minHeight: 360,
    description: "Rich content in a floating panel. Click outside or press Escape to close.",
    html: `<button class="s-btn s-btn--outline" data-s-popover="dimensions" aria-expanded="false">Dimensions</button>

<div class="s-popover" id="dimensions" role="dialog" aria-label="Dimensions" hidden>
  <div style="display:grid;gap:12px">
    <div>
      <p style="margin:0;font-weight:500">Dimensions</p>
      <p style="margin:0;color:var(--s-muted-fg)">Set the size of the layer.</p>
    </div>
    <div class="s-field"><label class="s-label" for="p-w">Width</label><input class="s-input" id="p-w" value="100%"></div>
    <div class="s-field"><label class="s-label" for="p-h">Height</label><input class="s-input" id="p-h" value="25px"></div>
  </div>
</div>`,
  },
  {
    id: "combobox",
    title: "Combobox",
    interactive: true,
    minHeight: 360,
    description: "Type to filter, arrows to move, Enter to pick. Listen for the s-change event to read the value.",
    html: `<div class="s-field" style="width:100%;max-width:300px">
  <label class="s-label" for="framework">Framework</label>
  <div class="s-combobox" data-s-combobox>
    <input class="s-input" id="framework" role="combobox" placeholder="Search framework..." autocomplete="off">
    <ul class="s-listbox" role="listbox" hidden>
      <li role="option" data-value="next">Next.js</li>
      <li role="option" data-value="nuxt">Nuxt</li>
      <li role="option" data-value="sveltekit">SvelteKit</li>
      <li role="option" data-value="astro">Astro</li>
      <li role="option" data-value="remix">Remix</li>
      <li role="option" data-value="laravel">Laravel</li>
      <li class="s-listbox__empty" hidden>No framework found.</li>
    </ul>
  </div>
</div>`,
  },
  {
    id: "toast",
    title: "Toast",
    interactive: true,
    minHeight: 320,
    description: "Call Sabil.toast() from any script, or put data-s-toast on a button. Hover pauses the timer.",
    html: `<div style="display:flex;flex-wrap:wrap;gap:8px;justify-content:center">
  <button class="s-btn s-btn--outline" data-s-toast="Changes saved" data-s-toast-description="Your profile is up to date.">Show toast</button>
  <button class="s-btn s-btn--outline" id="toast-action">With action</button>
  <button class="s-btn s-btn--destructive" data-s-toast="Upload failed" data-s-toast-description="The file is larger than 10 MB." data-s-toast-variant="destructive">Error</button>
</div>

<script>
  document.getElementById("toast-action").addEventListener("click", () => {
    Sabil.toast({
      title: "Message archived",
      action: { label: "Undo", onClick: () => Sabil.toast({ title: "Message restored" }) },
    })
  })
</script>`,
  },
]
