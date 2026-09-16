# Kendu Unleashed — Website Editing Guide

This site is plain HTML, CSS, and JavaScript. There is no build step and no framework to learn. Content lives in `index.html`; appearance lives in `styles.css`; menus, slides, and form handling live in `scripts.js`.

## Start here: a safe editing workflow

1. Open the repository in GitHub and select `astra-final-polish` (or a new editing branch after this work is merged).
2. Open the file you want to edit and choose the pencil icon.
3. Search for the section comment listed below. Change the words, link, or image path you need.
4. Commit to your editing branch, open/update a pull request, and inspect its Netlify Deploy Preview.
5. Check the result on a phone and desktop before merging. Merging to `main` can publish the production site.

Keep a previous working commit available. To undo a bad change, revert that commit rather than deleting unfamiliar code. Never paste passwords or private athlete information into this public repository.

### File map

| File | Purpose |
| --- | --- |
| `index.html` | All homepage sections, text, images, links, forms, and athlete template |
| `styles.css` | Design tokens, section styling, responsive layouts, and cropping |
| `scripts.js` | Mobile menu, carousel, active navigation, Netlify forms, thank-you dialog, year |
| `assets/images/` | Existing action and lifestyle photography |
| `assets/merch/` | Merchandise images |
| `assets/community-logos/` | Community logos and the existing Energy product image |
| `assets/favicons/` | Browser icons and brand artwork |
| `_redirects` | Netlify legacy page URLs and thank-you routes |
| `thank-you.html` | Standalone confirmation after a native form submission |
| `QA-NOTES.md` | Validation results, content decisions, and remaining checks |

Run locally from the repository folder with `python -m http.server 4173`, then visit `http://localhost:4173`. Serve from the repository root; double-clicking HTML is not equivalent. Paths begin with `/` to work at a site's root on Netlify. They also resolve when viewing repository files in GitHub; a GitHub Pages deployment under `/repository-name/` would need a deliberate base-path adaptation.

## Common edits

```html
<h2 id="events-title">Good things are in motion.</h2>
<p>Your paragraph goes here.</p>
<a class="btn" href="#application">Apply Now</a>
<img src="/assets/images/surf-action.jpg" alt="Surfer carving across a blue wave"
     width="1206" height="758" loading="lazy">
```

Change words between tags to change displayed text. Change `href` to change a button/link destination. Change `src` to replace an image. Keep the quotes. Use `&amp;` when typing an ampersand in HTML. Do not change a section's `id`, a form field's `name`, or accessibility attributes casually.

`href="#application"` scrolls within this page. `href="https://..."` opens another site. If a link uses `target="_blank"`, retain `rel="noopener"`.

## Section map

The markers are large comments, for example `<!-- ... HOME ... -->`. The exact uppercase label is your search term. Every section's first heading has a corresponding `*-title` ID used by `aria-labelledby`.

| Marker | HTML ID | Main classes | Main content |
| --- | --- | --- | --- |
| NAVIGATION | `primary-nav` | `site-nav`, `navwrap`, `navbrand`, `navlinks`, `navtoggle` | Logo and navigation links |
| HOME | `home` | `hero`, `hero-slide`, `hero-content`, `hero-bar` | Featured photography, headline, CTAs, carousel |
| ABOUT | `about` | `about-section`, `section-copy`, `brand-story` | Brand introduction and expandable story |
| ATHLETES | `athletes` | `athletes-section`, `athlete-grid`, `athlete-card` | Recruitment and future verified profiles |
| EVENTS | `events` | `events-section`, `feature-image`, `section-copy` | Upcoming-event message |
| MERCH | `merch` | `merch-section`, `product-grid`, `product-card`, `product-media` | Existing shop link and products |
| SPONSORSHIPS | `sponsorships` | `sponsorships-section`, `tiers-grid`, `tier` | Bronze, Silver, Gold benefits |
| COMMUNITY | `community` | `community-section`, `community-directory`, `brand-grid`, `brand-card` | Community introduction and expandable directory |
| CONTACT | `contact` | `contact-section`, `netlify-form`, `contact-addresses` | Contact form and email addresses |
| APPLICATION | `application` | `application-section`, `netlify-form` | Athlete application |
| ENERGY | `energy` | `energy-section`, `energy-media`, `section-copy` | Separate Kendu Energy partner feature |
| FOOTER | `footer` | `footerwrap`, `social`, `copyright` | Brand, copyright, social links |

### Navigation

Edit the visible text and `href` inside `#primary-nav`. Change the brand words in `.navbrand span`, and the logo path in `.navbrand img`. The current image is `/assets/favicons/favicon-512x512.png`.

To add a destination, duplicate one navigation `<a>` and point it at an existing section ID. Keep `aria-controls="primary-nav"` on `.navtoggle` and preserve the button and hamburger markup. The menu is used below 1440px so all ten destinations stay comfortable; its desktop breakpoint must match in CSS and JavaScript. Test the menu if you add links. Without JavaScript the navigation stays visible.

### Home / hero

- Headline: the single `<h1 id="home-title">` in `.hero-content`.
- Short label: `.hero-content .eyebrow`.
- Supporting text: `.hero-intro`.
- Main CTA: `.hero-content .btn`; edit its text and `href="#community"`.
- Secondary link: `.hero-content .text-link`; edit its text and `href="#athletes"`.
- Photos: each `.hero-slide img` inside `.hero-slides`.
- Small image caption: each figure's `data-caption`; JavaScript copies it into `.hero-caption`.

The headline and CTAs deliberately remain steady while the photograph changes. Do not add another H1 for each photograph. Mobile puts the text below the photo to protect the subject and readability. Desktop uses a restrained readability gradient.

**Replace a slide image:** upload the file, change that slide's `src`, update `alt`, `width`, and `height`. See image recommendations below.

**Add a slide:** copy an entire `<figure class="hero-slide" ...>...</figure>` inside `.hero-slides`; use a new photo and caption. Keep `hidden` on all but the first figure. Only the first figure should have `is-active`; only its image should have `fetchpriority="high"`. Use `loading="lazy"` on other slides. Controls and slide counts are generated automatically; there is no JavaScript array to edit. Update static `aria-label="1 of 4"` etc. for clarity, though the script also updates them.

**Remove/reorder:** delete or move a complete figure. After reordering, make the first figure visible (`is-active`, no `hidden`), transfer high fetch priority to its image, and update the initial `.hero-caption` to match. Keep about 3–5 slides. One slide works as a static feature with no controls.

**Timing:** `SLIDE_DELAY = 8000` in `scripts.js` means eight seconds. Autoplay stops on manual navigation and keyboard focus, pauses on hover/offscreen/hidden tabs, and starts paused for reduced-motion users. Play resumes after focus and the pointer leave the hero. Do not remove the Pause control or motion preference handling.

### About / brand

Edit `#about-title`, the first paragraph, and the paragraphs inside `<details class="brand-story">`. Its `<summary>Our story</summary>` is the disclosure label. Edit the CTA text/link in `.cta-row`. The image is `/assets/images/cliff-dive.jpg`; its square crop is set by `.about-section .feature-image`.

Keep `details`/`summary` paired. Routine copy changes do not need CSS. Avoid adding large amounts of introductory text outside the story disclosure, because it pushes the athlete content down the page.

### Athletes

Edit `#athletes-title`, introductory paragraphs, `.sponsor-list` items, and the Apply Now button in this section. The recruitment image is `/assets/images/dirtbike.jpg` and has a 4:5 crop.

The `.athlete-grid` is currently empty because verified athlete names, biographies, and profile photos were not in the repository. The `<template id="athlete-template">` is intentionally invisible; it is an editing aid, not a published fake athlete. Keep it until you no longer need the example. Exact steps for adding athletes are below.

### Events

Edit `#events-title` and the paragraphs under it. The Contact us text and `href="#contact"` are in the second paragraph. Image: `/assets/images/surf-barrel.jpg`, styled by `.events-section .feature-image`.

No scheduled dates or venues have been invented. For a confirmed event, replace the upcoming message with its approved title, date, location, and a real registration link. Add another paragraph or `<article>` for a second event; use an H3 inside each article. A larger events calendar would merit a dedicated layout instead of duplicating whole sections with the same ID.

### Merch

Edit `#merch-title`, the short statement, and the first `.btn` link. Every `.product-card` is itself a shop link: update that `href` as well when changing the shop destination.

Duplicate one complete `.product-card` to add a product. Change `.product-name`, the image `src` and `alt`, and the card link. Existing files: `hoodie.png`, `snapback.png`, `patch.png` under `/assets/merch/`. These use `object-fit: contain` so the whole product is shown. The grid wraps automatically. No checkout or new Shopify integration was added; the existing external shop remains linked.

### Sponsorships

Edit the main heading and overview paragraphs, then each `.tier` heading, introductory paragraph, and `.sponsor-list` benefits. The bottom `.cta-row` holds the application link.

To add a tier, duplicate one complete `.section-copy.tier` block inside `.tiers-grid`. The `bronze`, `silver`, and `gold` classes identify current tiers; `gold` controls its orange top border. Confirm actual benefits before editing promises. No image is embedded here; the existing moto photo is presented prominently in Athletes instead of repeated.

### Community / stories directory

Edit `#community-title`, the Kendu.io introduction, and its links. Expand `<details class="community-directory">` to find existing category headings and `.brand-grid` groups. Each `.brand-card` contains an image, H4 title, description, and external links.

Duplicate an entire `.brand-card` within its category to add a partner. Change both the `<source srcset>` and `<img src>` if using the existing `<picture>` markup. A simpler single `<img>` also works when you do not need multiple formats. Keep category headings as H3 and partner names as H4. Copy and destinations are retained from the previous site; review their currency before publishing.

There are no authored news stories in the source repository. This section remains community content; it does not present invented headlines or imply existing partners are sponsored athletes.

### Contact

Edit `#contact-title`, its intro, the visible label words, and the Send button text. Image: `/assets/images/longboard.jpg`. Edit the three email addresses in `.contact-addresses`, including both their displayed text and `mailto:` links.

**Preserve:** `name="contact"`, `method="POST"`, `data-netlify="true"`, `netlify-honeypot="bot-field"`, the hidden `form-name`, all existing field `name` values, label `for` / input `id` pairs, and `action="/thank-you.html"`. These affect delivery and accessibility. Add new fields only when needed and verify Netlify recognizes them after deployment. An added topic can be another `<option>` in the existing select.

### Athlete application

Edit `#application-title`, intro, label words, discipline options, and Submit Application button text. There is no image in this section. Keep the same form protections listed above and retain `name="athlete-application"` and the matching hidden form name.

The current age range (10–100), required fields, and discipline options were retained. Review whether your youth-athlete process needs a parent/guardian contact and consent before expanding it; none was invented here. Never publish submitted application details automatically.

### Kendu Energy

Edit `#energy-title`, partner paragraph, and `.btn` text/link. Image: `/assets/community-logos/kendu-energy.avif`, a product photo already in the repository, shown uncropped inside `.energy-media`.

This is a separate partner feature. Avoid turning it into a youth-athlete product endorsement or adding unverified health/performance claims. The inherited product destination is preserved. Replace it only with a confirmed destination.

### Footer

Edit the brand text, tagline, and `.social a` links and labels. Social SVG shapes are decorative; keep `aria-hidden="true"`. The X link also has an `aria-label` that must match if its account changes. `#copyright-year` is updated automatically by JavaScript; the HTML contains a fallback year.

### Thank-you behavior

The homepage `<dialog id="thanks-modal">` contains the confirmation heading, message, community/shop links, and Close button. `thank-you.html` contains equivalent fallback copy and links for visitors without JavaScript. Edit both if you change the confirmation message.

Keep dialog IDs and the native dialog element. It handles keyboard focus and Escape. AJAX submission opens it only after a successful HTTP response; failed requests keep entries and show a retry message. The static local server cannot deliver forms. Netlify form detection and actual delivery must be checked on the deployed site. The `#thank-you` compatibility link still opens the dialog.

## ADDING AND CHANGING IMAGES

### Quick replacement

1. Upload your image to the appropriate `assets/` folder.
2. Find the section marker in `index.html` and change the image's `src` path.
3. Update `alt` to describe the new image and set `width` / `height` to the file's actual pixel dimensions.
4. Commit, open the Deploy Preview, and check its phone crop.

For a file with **the same dimensions, subject, and filename**, replacing the file is enough. A new filename is preferable for larger changes because browsers may cache the old image. Most replacements need HTML only; cropping adjustments need CSS.

### Folders and filenames

Keep the current straightforward folders. Use lowercase words separated by hyphens, such as `athlete-name-track-action.webp`. Avoid spaces, `IMG_1234`, parentheses, and uppercase variations. Netlify paths are case-sensitive. Do not move existing assets unless you update every `src`, `srcset`, icon, and metadata reference.

For future athlete images you may create `assets/athletes/`; for a growing collection, `assets/events/` and `assets/stories/` are also sensible. They do not need to exist before you have real files.

### Image recommendations

These are preparation targets for **new** assets; do not enlarge a low-resolution source to pretend it has more detail.

| Use | Suggested new source | Format | Placement / crop |
| --- | --- | --- | --- |
| Hero | 2000 × 1250 or larger, roughly 16:10 | WebP or good-quality JPEG | `.hero-slide img`: 4:3 mobile frame, wide desktop frame; leave room around subject |
| Athlete action | 1600 × 1200, 4:3 | WebP/JPEG | `.athlete-card > img`: 4:3 |
| Athlete portrait | 1000 × 1250, 4:5 | WebP/JPEG | Optional portrait variant described below |
| About feature | 1000 × 1000 | WebP/JPEG | `.about-section .feature-image`: square |
| Recruitment moto / contact | 1000 × 1250, 4:5 | WebP/JPEG | `.athletes-section` / `.contact-section .feature-image` |
| Story photo | 1600 × 1200, 4:3 | WebP/JPEG | Future story articles; no fictional story cards currently exist |
| Event photo | 1800 × 1200, 3:2 | WebP/JPEG | `.events-section .feature-image`: 3:2 |
| Kendu Energy | 1600 × 1200, 4:3 | WebP/JPEG/AVIF | `.energy-media img`: contain; whole product retained |
| Merchandise | 1200 × 1200, square | WebP or PNG for transparency | `.product-media img`: contain |
| Logo | Vector original, or 512px+ raster | Trusted SVG / PNG / AVIF | `.navbrand img` or `.brand-card img`: contain |

Aim for around 150–400 KB for large photos when quality allows, and smaller thumbnails for logos. Inspect detail before compressing further. Existing photos include baked-in brand marks and some small source files; replacing them with original high-resolution action photography will improve quality more than CSS can.

### Alt text

Describe what matters: `Maya clearing a hurdle at a track meet`. Do not claim an unknown person's identity or sponsorship. Product alt text can name the product. A decorative duplicate logo can use `alt=""`. Do not use filenames as alt text.

### Cropping: object-fit and object-position

`object-fit: cover` fills the frame and can crop edges. `contain` shows the full image and can leave space around it. Never stretch by setting unrelated width and height without an object-fit rule.

Existing hero images use `object-position: center 42%` on mobile and `center 40%` on desktop. Higher/lower percentage values move the crop's focus. To change **only one** slide:

1. Add a meaningful class to its figure, e.g. `class="hero-slide hero-slide-track"`.
2. Add this rule under the HOME / HERO CSS section:

```css
.hero-slide-track img { object-position: 65% 35%; }
```

3. For a separate desktop crop, add the same selector inside the `min-width: 900px` media block with different values.
4. Check 320, 390, 768, and 1440px views. Check faces and primary action, not just the center of the frame.

A normal image replacement with similar composition needs no CSS. A portrait substituted for a landscape hero often needs crop changes or a different image. Prefer a wide hero source; do not solve a bad crop by blurring it.

### Loading and responsive behavior

Keep actual `width` and `height` attributes to reserve space before images load. Keep `loading="lazy"` below the fold. Do not lazy-load the first hero image. Responsive sizing is handled by CSS; there are no generated `srcset` variants to maintain. If you add multiple file sizes later, keep a valid `src` fallback and document the new `srcset` values.

## Adding future athletes

1. Get the approved name, sport, public location, short bio, and image. For a youth athlete, use only the details cleared for publication.
2. Upload the image, preferably to `assets/athletes/`.
3. Find `ATHLETE TEMPLATE` in `index.html`.
4. Copy **only the complete `<article class="athlete-card">...</article>`** from inside the template.
5. Paste it inside the currently empty `<div class="athlete-grid" ...></div>`, outside the template.
6. Replace all `REPLACE:` text, the image path, alt text, and actual dimensions. Do not leave sample identities or photos that imply a real endorsement.
7. Add an optional profile link inside `.athlete-copy` only when its destination exists:

```html
<a class="text-link" href="https://your-confirmed-profile-url">Meet the athlete →</a>
```

Remove that entire anchor to omit a profile link; do not use `href="#"`. Reorder athletes by moving whole articles. Delete one entire article to remove a profile. Duplicate an existing completed article for the next athlete, changing every athlete-specific field.

The grid supports 1–20 and more entries without a code limit: one column on phones, two from 600px, three from 900px. At roughly 12–20 profiles, consider filters or a separate roster page to reduce scrolling. Routine additions need no JavaScript.

For a portrait-led card, add `athlete-card-portrait` to the article and put this rule under ATHLETES in CSS:

```css
.athlete-card-portrait > img { aspect-ratio: 4 / 5; }
```

Use the same variant consistently in a row. A second portrait alongside an action image would need a considered layout; the simple default uses one lead image per card.

## Adjusting the visual system

At the top of `styles.css`, DESIGN TOKENS contains the shared settings:

- `--bg`, `--surface`, `--surface-soft`: light backgrounds.
- `--bg-dark`: hero and Energy charcoal.
- `--text`, `--muted`, `--on-dark`, `--muted-dark`: readable text colors.
- `--accent`: orange buttons and highlights.
- `--accent-link`: darker orange for readable links on white.
- `--glow`: restrained hover glow; reduce its alpha percentage for less glow.
- `--space-*`, `--section-space`, `--gutter`: spacing.
- `--container`: desktop maximum content width.
- `--h1`, `--h2`, `--h3`, `--body`: responsive type sizes.
- `--radius`, `--shadow`, `--duration`: corner shape, shadow, transition speed.

Change tokens before adding isolated overrides. Keep the reduced-motion block. Do not add scroll snapping or hide overflowing content to disguise a layout problem.

## Pre-publish checklist

- Inspect 320, 375, 390, 430, 768, 1024, and 1440px widths.
- Check no sideways scrolling, readable text, photo crops, menu open/close/Escape, links and anchors.
- Test carousel arrows, dots, Play/Pause, mobile swipe, and reduced-motion behavior.
- Expand Our story and the community directory.
- Test required fields, a deliberate failed form request, and a controlled real submission when Netlify Forms is enabled.
- Confirm both form names appear in Netlify and your test reaches the intended inbox/dashboard.
- Check legacy routes and `/thank-you`, `/thank-you/`, and `/thank-you.html`.
- Keep production unchanged until you approve the preview.
