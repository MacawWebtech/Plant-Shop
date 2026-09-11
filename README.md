# Fernleigh & Co. — Flower Pot & Indoor Plant Shop Template

A complete, premium, responsive 18-page HTML template for a flower pot &
indoor/outdoor plant shop. Earthy botanical brand identity, dark mode, full
RTL support, and no build step to run the site — open any `.html` file
directly in a browser, or upload the folder to any static host.

## Stack

- **HTML5 + real Bootstrap 5.3**, loaded from the jsDelivr CDN (no local
  vendoring, no `npm install` — every page links directly to
  `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/...`).
- **Bootstrap Icons 1.11**, also via CDN, used throughout instead of custom SVGs.
- **Real photography** — every hero, category, product, blog and gallery
  image is a real photograph served from Unsplash's CDN
  (`images.unsplash.com`), not a placeholder or illustration. See "Images"
  below for licensing.
- **Vanilla JS** (`assets/js/main.js`) for the pieces Bootstrap doesn't
  provide out of the box: theme + direction switching, scroll-reveal,
  back-to-top, quantity steppers, gallery thumbnails, wishlist/bag toggle
  state, and form validation. Navbar collapse, dropdowns, the mobile
  offcanvas drawer, the search modal, the FAQ accordion, product tabs and
  the testimonial carousel are all **native Bootstrap 5 components**
  (`data-bs-*` attributes) — no custom JS needed for those.
- **Google Fonts** (Playfair Display + Manrope), via CDN.

Because Bootstrap, the icon font, the fonts and every image are loaded from
CDNs, **this template needs an internet connection to look right** — that's
the trade-off of using the real thing instead of a bundled copy. If you need
a fully offline template, download the Bootstrap 5.3 CSS/JS bundle and the
Bootstrap Icons webfont and swap the CDN `<link>`/`<script>` tags for local
paths in every page's `<head>`/`</body>`, and replace the Unsplash URLs in
`assets/images` with your own local files.

## Structure

```
plant-shop/
├── index.html               Home page 1 — organic hero, full landing page
├── index-2.html              Home page 2 — editorial hero, shop-by-room, size selector
├── about.html                 Company story, timeline, values, team
├── shop.html                  Full product listing with filters, sort & pagination
├── product-details.html       Single product page (gallery, specs, tabs, related)
├── indoor-plants.html         Category listing — Indoor Plants
├── outdoor-plants.html        Category listing — Outdoor Plants
├── succulents.html            Category listing — Succulents & Cactus
├── pots-planters.html         Category listing — Pots & Planters
├── gardening-supplies.html    Soil, fertilizers, seeds & tools
├── plant-care.html            Blog / Plant Care Guide listing
├── blog-details.html          Full article layout with ToC, callouts, author box
├── gifting.html                Plant gifting experience + FAQ
├── bulk-orders.html           B2B bulk/corporate order page with enquiry form
├── contact.html                Contact page with validated form + map embed
├── faq.html                    FAQ accordion (Bootstrap accordion component)
├── 404.html                    Error page
├── coming-soon.html           Coming soon / launch page
│
├── assets/
│   ├── css/
│   │   ├── style.css          Design tokens + Bootstrap re-theme + every custom component
│   │   ├── dark-mode.css      Complete dark theme (auto + manual + saved)
│   │   └── rtl.css            Arabic/Hebrew-compatible RTL overrides
│   └── js/
│       └── main.js            Theme, direction, reveal, back-to-top, forms, etc.
│
├── documentation/
│   └── documentation.html     How to use & customize this template
├── README.md
├── robots.txt
└── sitemap.xml
```

There is no build step in the delivered template — every `.html` file is
static, hand-authored markup. (Internally, this template was assembled with
a small set of Node.js scripts to keep 18 pages consistent; those scripts
are not part of the deliverable and are not included here.)

## Theming (real Bootstrap, re-skinned)

Rather than overriding Bootstrap with `!important` or forking its Sass,
`style.css` uses Bootstrap 5.3's own per-component CSS custom-property API —
things like `--bs-btn-bg`, `--bs-primary`, `--bs-primary-rgb`,
`--bs-body-bg`, and `--bs-border-color` — to retheme the CDN build to the
brand palette without touching Bootstrap's files at all:

```css
--primary-color:#1F4D3A; --secondary-color:#6F8F72; --light-sage:#DCE7DC;
--light-bg:#F7F5EF; --warm-beige:#E8E0D1; --accent-color:#B86645;
--dark-text:#1D2A22; --light-text:#FFFFFF;
```

## Images

Every photograph is real, freely-licensed stock photography served directly
from `images.unsplash.com` (Unsplash's own CDN — no local copies are
bundled, so there's nothing to attribute-track file by file, and no broken
links to manage). Unsplash photos are free to use under the
[Unsplash License](https://unsplash.com/license) for commercial and
non-commercial purposes without permission, though attribution is
appreciated. If you'd rather self-host images, download the ones you want to
keep and point the `<img src="...">` attributes at your own `assets/images/`
paths.

## Regenerating pages

Not needed for normal use — every page is static HTML you can edit directly.
If you're comfortable with Node.js and want to change something that repeats
across all 18 pages (the header, footer, a card component, or the product/blog
data), the original internal build scripts are the easiest way to do it: they
are not shipped in this package, but the pattern is straightforward to
reproduce — one JS module for data, one for shared header/footer/component
markup, and one that calls them to write out each page.

## Dark mode & RTL

- **Dark mode**: click the moon/sun icon in the header. Preference is saved
  to `localStorage` (`fernleigh-theme`) and respected on every page; if the
  visitor has never chosen, the OS-level `prefers-color-scheme` is used, with
  an inline blocking script in `<head>` to avoid a flash of the wrong theme.
- **RTL**: a hidden `<select data-dir-switch>` in the header sets
  `dir="rtl"` on `<html>` and activates `assets/css/rtl.css` — logical CSS
  properties (`margin-inline`, `inset-inline-start`, `text-align:start`,
  etc.) handle most of the mirroring automatically; `rtl.css` covers the
  rest (mirrored hero art, flex-direction reversals, directional icons).
  Compatible with Arabic and Hebrew.

## Forms

Every form uses `data-validate` + `data-rules` (see `main.js`) for
client-side validation with accessible error messaging — no library
dependency. They're intentionally left as static forms ready to point at:

- **Formspree / Netlify Forms** — add `action="https://formspree.io/f/…"`
  (or a Netlify `data-netlify="true"` attribute) to any `<form>`.
- **Mailchimp / ConvertKit** — swap the newsletter forms' `action` for your
  list endpoint.
- **Stripe / PayPal** — "Add to Cart" buttons are UI-only; wire them to your
  checkout provider of choice.
- **Maps** — `contact.html` embeds an OpenStreetMap iframe; swap for Google
  Maps and your own API key if you prefer.

## Accessibility & SEO

Skip link, semantic landmarks, one `<h1>` per page, visible focus states,
44px-minimum touch targets, `prefers-reduced-motion` support, `aria-label`s
on icon-only buttons, and JSON-LD `GardenStore` structured data on every
page. Each page has a unique title, meta description, canonical URL and Open
Graph tags.

## Browser support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge) — whatever
Bootstrap 5.3 itself supports.
