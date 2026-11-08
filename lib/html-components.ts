/** Plain HTML snippets for the CSS-only edition (public/kanvas.css). */
export type HtmlComponent = {
  id: string
  title: string
  description: string
  html: string
}

const icon = (path: string) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`

const icons = {
  plus: icon('<path d="M5 12h14"/><path d="M12 5v14"/>'),
  arrowRight: icon('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
  info: icon('<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>'),
  alert: icon('<circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/>'),
  folder: icon('<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>'),
  copy: icon('<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>'),
}

export const htmlComponents: HtmlComponent[] = [
  {
    id: "button",
    title: "Button",
    description: "Primary uses the blue gradient surface. Add a modifier for other variants and sizes.",
    html: `<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
  <button class="k-btn">Sign in</button>
  <button class="k-btn k-btn--outline">Documentation</button>
  <button class="k-btn k-btn--secondary">Secondary</button>
  <button class="k-btn k-btn--ghost">Ghost</button>
  <button class="k-btn k-btn--destructive">Delete</button>
  <button class="k-btn k-btn--link">Link</button>
</div>
<div style="display:flex;flex-wrap:wrap;gap:8px;align-items:center">
  <button class="k-btn k-btn--outline k-btn--sm">Small</button>
  <button class="k-btn k-btn--outline">Default</button>
  <button class="k-btn k-btn--outline k-btn--lg">Large</button>
  <button class="k-btn k-btn--outline k-btn--icon" aria-label="Add">${icons.plus}</button>
  <button class="k-btn">Continue ${icons.arrowRight}</button>
  <button class="k-btn" disabled>Disabled</button>
</div>`,
  },
  {
    id: "input",
    title: "Input & Field",
    description: "Wrap a label, control and hint in k-field. Set aria-invalid for the error state.",
    html: `<form style="display:grid;gap:16px;width:100%;max-width:360px">
  <div class="k-field">
    <label class="k-label" for="email">Email</label>
    <input class="k-input" id="email" type="email" placeholder="you@example.com">
    <p class="k-field__hint">We never share your email.</p>
  </div>
  <div class="k-field">
    <label class="k-label" for="password">Password</label>
    <input class="k-input" id="password" type="password" aria-invalid="true" value="123">
    <p class="k-field__error">Use at least 8 characters.</p>
  </div>
  <button class="k-btn k-btn--block">Create account</button>
</form>`,
  },
  {
    id: "textarea",
    title: "Textarea & Select",
    description: "Native elements with the same border, radius and focus ring as the input.",
    html: `<div style="display:grid;gap:16px;width:100%;max-width:360px">
  <div class="k-field">
    <label class="k-label" for="role">Role</label>
    <select class="k-select" id="role">
      <option>Designer</option>
      <option>Engineer</option>
      <option>Product manager</option>
    </select>
  </div>
  <div class="k-field">
    <label class="k-label" for="bio">Bio</label>
    <textarea class="k-textarea" id="bio" placeholder="Tell us a little about yourself"></textarea>
  </div>
</div>`,
  },
  {
    id: "choice",
    title: "Checkbox, Radio & Switch",
    description: "Native inputs restyled. Keyboard and form support come for free.",
    html: `<div style="display:grid;gap:12px">
  <label class="k-choice"><input class="k-checkbox" type="checkbox" checked> Accept terms and conditions</label>
  <label class="k-choice"><input class="k-checkbox" type="checkbox"> Send me product updates</label>
  <div style="display:flex;gap:16px">
    <label class="k-choice"><input class="k-radio" type="radio" name="plan" checked> Monthly</label>
    <label class="k-choice"><input class="k-radio" type="radio" name="plan"> Yearly</label>
  </div>
  <label class="k-choice"><input class="k-switch" type="checkbox" role="switch" checked> Notifications</label>
</div>`,
  },
  {
    id: "segmented",
    title: "Segmented Control",
    description: "Tabs without JavaScript, built on radio inputs. Use a shared name per group.",
    html: `<div class="k-tabs" role="radiogroup" aria-label="Billing period" style="width:100%;max-width:384px">
  <label class="k-tabs__item"><input type="radio" name="period" checked><span>Monthly</span></label>
  <label class="k-tabs__item"><input type="radio" name="period"><span>Yearly</span></label>
</div>`,
  },
  {
    id: "badge",
    title: "Badge",
    description: "Small status labels.",
    html: `<div style="display:flex;flex-wrap:wrap;gap:8px">
  <span class="k-badge">New</span>
  <span class="k-badge k-badge--secondary">Draft</span>
  <span class="k-badge k-badge--outline">v2.4.0</span>
  <span class="k-badge k-badge--destructive">Failed</span>
</div>`,
  },
  {
    id: "card",
    title: "Card",
    description: "Header, content and footer. Any element works inside.",
    html: `<div class="k-card" style="width:100%;max-width:360px">
  <div class="k-card__header">
    <h3 class="k-card__title">Upgrade to Pro</h3>
    <p class="k-card__description">Unlimited projects and priority support.</p>
  </div>
  <p style="margin:0;font-size:32px;font-weight:600;letter-spacing:-0.02em">$24<span style="font-size:14px;font-weight:400;color:var(--k-muted-fg)">/month</span></p>
  <div class="k-card__footer">
    <button class="k-btn k-btn--outline" style="flex:1">Later</button>
    <button class="k-btn" style="flex:1">Upgrade</button>
  </div>
</div>`,
  },
  {
    id: "alert",
    title: "Alert",
    description: "A callout with an optional icon.",
    html: `<div style="display:grid;gap:12px;width:100%;max-width:440px">
  <div class="k-alert" role="status">
    ${icons.info}
    <p class="k-alert__title">A new version is available</p>
    <p class="k-alert__description">Reload the page to get the latest features.</p>
  </div>
  <div class="k-alert k-alert--destructive" role="alert">
    ${icons.alert}
    <p class="k-alert__title">Payment failed</p>
    <p class="k-alert__description">Check your card details and try again.</p>
  </div>
</div>`,
  },
  {
    id: "avatar",
    title: "Avatar",
    description: "Initials or an image. Group them with k-avatar-group.",
    html: `<div style="display:flex;gap:24px;align-items:center">
  <span class="k-avatar">ML</span>
  <span class="k-avatar k-avatar--lg">JR</span>
  <div class="k-avatar-group">
    <span class="k-avatar">AL</span>
    <span class="k-avatar">MK</span>
    <span class="k-avatar">SN</span>
    <span class="k-avatar">+5</span>
  </div>
</div>`,
  },
  {
    id: "accordion",
    title: "Accordion",
    description: "Native <details>. Opens and closes without JavaScript, and stays accessible.",
    html: `<div style="width:100%;max-width:440px">
  <details class="k-accordion" open>
    <summary>What is your return policy?</summary>
    <div class="k-accordion__content">Return any item within 30 days for a full refund.</div>
  </details>
  <details class="k-accordion">
    <summary>How long does shipping take?</summary>
    <div class="k-accordion__content">Standard shipping takes 3–5 business days.</div>
  </details>
  <details class="k-accordion">
    <summary>Do you ship internationally?</summary>
    <div class="k-accordion__content">Yes, to over 40 countries.</div>
  </details>
</div>`,
  },
  {
    id: "table",
    title: "Table",
    description: "Readable defaults for tabular data.",
    html: `<table class="k-table" style="max-width:520px">
  <thead>
    <tr><th>Invoice</th><th>Status</th><th>Method</th><th style="text-align:right">Amount</th></tr>
  </thead>
  <tbody>
    <tr><td>INV-001</td><td><span class="k-badge k-badge--secondary">Paid</span></td><td>Card</td><td style="text-align:right">$250.00</td></tr>
    <tr><td>INV-002</td><td><span class="k-badge k-badge--outline">Pending</span></td><td>Transfer</td><td style="text-align:right">$150.00</td></tr>
    <tr><td>INV-003</td><td><span class="k-badge k-badge--destructive">Failed</span></td><td>Card</td><td style="text-align:right">$350.00</td></tr>
  </tbody>
</table>`,
  },
  {
    id: "navigation",
    title: "Breadcrumb & Pagination",
    description: "Mark the current page with aria-current.",
    html: `<div style="display:grid;gap:24px;justify-items:center">
  <nav aria-label="Breadcrumb">
    <ol class="k-breadcrumb">
      <li><a href="#">Home</a></li>
      <li><a href="#">Settings</a></li>
      <li><span aria-current="page">Billing</span></li>
    </ol>
  </nav>
  <nav class="k-pagination" aria-label="Pagination">
    <a class="k-pagination__link" href="#">Previous</a>
    <a class="k-pagination__link" href="#">1</a>
    <a class="k-pagination__link" href="#" aria-current="page">2</a>
    <a class="k-pagination__link" href="#">3</a>
    <a class="k-pagination__link" href="#">Next</a>
  </nav>
</div>`,
  },
  {
    id: "feedback",
    title: "Progress, Skeleton & Spinner",
    description: "Loading states. The skeleton shimmer and spinner stop when reduced motion is on.",
    html: `<div style="display:grid;gap:20px;width:100%;max-width:360px">
  <progress class="k-progress" value="60" max="100">60%</progress>
  <div style="display:flex;gap:12px;align-items:center">
    <span class="k-skeleton" style="width:40px;height:40px;border-radius:50%"></span>
    <div style="display:grid;gap:8px;flex:1">
      <span class="k-skeleton" style="height:14px;width:60%"></span>
      <span class="k-skeleton" style="height:12px;width:85%"></span>
    </div>
  </div>
  <button class="k-btn" disabled style="opacity:1"><span class="k-spinner"></span> Saving</button>
</div>`,
  },
  {
    id: "tooltip",
    title: "Tooltip & Kbd",
    description: "A CSS-only tooltip from the data-k-tooltip attribute. It waits 300ms before showing.",
    html: `<div style="display:flex;gap:16px;align-items:center">
  <button class="k-btn k-btn--outline k-btn--icon" data-k-tooltip="Copy link" aria-label="Copy link">${icons.copy}</button>
  <span style="display:inline-flex;gap:4px;align-items:center;color:var(--k-muted-fg)">Search <kbd class="k-kbd">Ctrl</kbd><kbd class="k-kbd">K</kbd></span>
</div>`,
  },
  {
    id: "empty",
    title: "Empty State",
    description: "A placeholder for lists with nothing in them yet.",
    html: `<div class="k-empty" style="width:100%;max-width:420px">
  <div class="k-empty__icon">${icons.folder}</div>
  <h3 class="k-empty__title">No projects yet</h3>
  <p class="k-empty__description">Create your first project to start collaborating with your team.</p>
  <button class="k-btn">${icons.plus} New project</button>
</div>`,
  },
]
