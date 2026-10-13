# Kendu Unleashed — Owner Editing Guide

The current message is **Unleash Yourself**. The website is plain HTML, CSS, and JavaScript. There is no build step or framework. All six approved athletes are listed; only JD currently has an explicitly matched photograph.

## Make an edit safely

1. Select `astra-final-polish` in GitHub. After this work is approved and merged, create a new branch for future changes.
2. Open `index.html` and search for a section marker from the table below.
3. Change the text, image path, or link. Commit to the editing branch.
4. Review the Netlify Deploy Preview on a phone and desktop.
5. Merge only when you are ready for production to change. Keep the prior commit available for rollback.

To run locally, use `python -m http.server 4173` in the repository folder and open `http://localhost:4173`. Paths beginning with `/assets/` assume the site is served from the domain root, as it is on Netlify. GitHub file browsing works, but deploying under a GitHub Pages repository subpath would require a deliberate path adjustment.

## Files

| File/folder | What it controls |
| --- | --- |
| `index.html` | Homepage content, all sections, links, images, and form markup |
| `styles.css` | Shared design tokens, responsive layout, image treatment |
| `scripts.js` | Menu, carousel, active navigation, forms/dialog, copyright year |
| `thank-you.html` | Confirmation fallback for native form submissions |
| `_redirects` | Existing Netlify clean URLs and old-page redirects |
| `assets/hero/` | Three current carousel images |
| `assets/athletes/` | Confirmed public athlete photography |
| `assets/stories/` | Lifestyle and surf photography |
| `assets/events/` | Las Vegas event image |
| `assets/energy/` | Energy partner image |
| `assets/merch/` | Four current products plus retained older source files |
| `assets/branding/` | Wide multi-sport brand graphic |
| `assets/community-logos/`, `assets/favicons/` | Existing partner and icon assets |
| `assets/inbox/` and original camera filenames under `assets/` | Supplied originals; not automatically displayed |
| `FINAL-HANDOFF.md` | Short owner action list |
| `QA-NOTES.md` | Test evidence and limitations |

The new optimized files are derivatives of supplied originals. Originals and unused alternatives were retained. Do not assume a file is live merely because it is in `assets/`.

## Changing words and links

Change words between tags to change what visitors read. Change `href` to change a link destination. Change `src` to change a photo. Keep quotes and closing tags. Write `&amp;` for an ampersand in HTML.

```html
<h2 id="events-title">Good things are in motion.</h2>
<p>Your updated paragraph.</p>
<a class="btn" href="#contact">Contact us</a>
```

An `href` starting with `#` scrolls within the page; an `https://` URL opens a website. Keep `rel="noopener"` on links using `target="_blank"`. Do not casually rename section IDs: navigation and old shared links rely on them.

## Every section

All markers are large HTML comments. Search for their uppercase label. Each section's H2 has a matching `*-title` ID; the hero uses the single H1.

| Section / marker | ID | Main classes | Safe edits and important controls |
| --- | --- | --- | --- |
| NAVIGATION | `primary-nav` | `site-nav`, `navbrand`, `navlinks`, `navtoggle` | Brand words in `.navbrand span`; logo in its `img`; each link's label and `href`. Keep the toggle button, `aria-controls`, and IDs. |
| HOME / HERO | `home` | `hero`, `hero-slide`, `hero-content`, `hero-bar` | `#home-title`, `.eyebrow`, `.hero-intro`, main `.btn`, secondary `.text-link`, each figure's `data-caption` and image. Preserve carousel controls. |
| ABOUT | `about` | `about-section`, `section-copy`, `brand-story` | `#about-title`, intro paragraph, story paragraphs inside `details`, summary label, CTA label/link, `.feature-image`. Keep long copy in the disclosure. |
| ATHLETES | `athletes` | `athlete-roster`, `athlete-list`, `athlete-card`, `athlete-copy` | `#athletes-title`, application link, approved name/location/sport fields, confirmed images. Exact addition steps below. |
| CULTURE / IN MOTION | `culture` | `culture-section`, `culture-grid`, `culture-photo`, `brand-panorama` | `#culture-title`, supporting text, two image paths and figcaptions, wide brand graphic. No fabricated news links. Keep credited photos uncropped. |
| EVENTS | `events` | `events-section`, `event-photo`, `section-copy` | `#events-title`, upcoming message, photo/caption, Contact us label/link. Add real dates only when confirmed. |
| MERCH | `merch` | `product-grid`, `product-card`, `product-media`, `product-name` | Heading, intro, shop CTA; each card's category, photo, alt, and shop link. No prices or availability are encoded. |
| SPONSORSHIPS | `sponsorships` | `sponsorship-details`, `sponsorship-program`, `tiers-grid`, `tier` | Heading/overview, criteria, tier headings, benefits, application link. Confirm commercial promises before changing them. |
| COMMUNITY | `community` | `community-directory`, `brand-grid`, `brand-card` | Intro, Kendu.io links, directory summary, category headings, brand images/descriptions/links. Retain H3 categories/H4 brand names. |
| APPLICATION | `application` | `application-section`, `netlify-form` | Heading, intro, visible labels and submit-button label; keep technical form names/fields intact. |
| KENDU ENERGY | `energy` | `energy-section`, `energy-media`, `section-copy` | Heading, neutral partner paragraph, image, Visit Kendu Energy label/link. No unverified product or endorsement claims. |
| CONTACT | `contact` | `contact-section`, `netlify-form`, `contact-addresses` | Heading, intro, labels, Send label, displayed email addresses AND their `mailto:` links. |
| FOOTER | `footer` | `footerwrap`, `social`, `copyright` | Brand/tagline, social labels/URLs; update account-specific `aria-label` too. Keep `copyright-year` for automatic year updates. |

### Navigation and repeated items

Duplicate a navigation `<a>` to add a destination; point it at an existing section ID. The menu is used below 1440px; change that breakpoint in both `styles.css` and `scripts.js` if needed. Ten tiny desktop links should never be squeezed onto a phone. No JavaScript leaves a visible navigation list.

For community brands, duplicate one complete `.brand-card` within the appropriate `.brand-grid`. Change its name, description, links, and image. Existing `<picture>` elements contain both `source srcset` and `img src`; update both paths when replacing that image. A single `img` is sufficient if you do not need multiple formats.

For sponsorship levels, duplicate a whole `.tier` inside `.tiers-grid`. The `gold` class controls its orange border. The level descriptions and benefits remain inside the native “Explore sponsorship levels” disclosure to keep the homepage manageable.

For a real event, replace the upcoming paragraph with an approved title, date, place, and actual registration link. A second event can be another `<article>` with an H3 in the same section. Do not duplicate the whole section ID. A calendar is a future feature, not needed for a routine announcement.

## ADDING AND CHANGING IMAGES

### The normal replacement

1. Upload a new image to the relevant folder below using a lowercase descriptive name.
2. Change that image's `src` in `index.html`.
3. Update `alt` and the actual file's pixel `width`/`height`, commit, and check the preview.

If the new file has the same filename, dimensions, and meaning, replacing the file is enough. A fresh descriptive filename helps avoid stale browser caches. Preserve `loading="lazy"` below the fold; only the first hero image gets `fetchpriority="high"`.

Use names such as `athlete-name-action.webp`, not `IMG_1234` or filenames with spaces. Paths and capitalization must match exactly. Use WebP or a good-quality JPEG for photography; PNG/WebP for transparency; trusted SVG or PNG for logos. Do not upscale small sources or remove photographer credits. Aim for roughly 150–400 KB per large photo where quality allows; smaller images can be much lighter.

### Final image inventory

The table lists every major current placement. File dimensions are those of the supplied/optimized file, not a promise of higher resolution. Recommended dimensions apply to future replacements.

| Placement | Folder / final filename | File pixels | Recommended replacement | Mobile / desktop treatment | CSS selector |
| --- | --- | --- | --- | --- | --- |
| Hero 1 | `assets/hero/skate-sky.webp` | 1154 × 860 | 1800 × 1350, 4:3 | Full frame centered in stable media area; no crop on either | `.hero-slide img` |
| Hero 2 | `assets/hero/skate-ramp.webp` | 521 × 728 | 1200 × 1680, about 5:7 | Full portrait retained, with side space as needed | `.hero-slide--skate-ramp img` inherits full-frame rule |
| Hero 3 | `assets/hero/dog-watching-surf.webp` | 1200 × 942 | 1800 × 1413, about 1.27:1 | Full image and existing artwork retained | `.hero-slide--dog-watching-surf img` |
| About | `assets/stories/beach-walk.webp` | 556 × 1000 | 900 × 1600, about 9:16 | Complete beach-walk frame, centered; max 390px wide/560px tall | `.about-section .feature-image` |
| JD | `assets/athletes/jd-skatepark.webp` | 1152 × 740 | 1600 × 1028, about 1.56:1 | Natural ratio, no crop | `.athlete-photo` |
| Culture surf | `assets/stories/surf-action.webp` | 1170 × 1150 | 1600 × 1573, near square | Natural ratio; credits visible on all widths | `.culture-photo` |
| Culture moto | `assets/images/dirtbike.jpg` | 647 × 870 | 1200 × 1600, 3:4 | Natural ratio; stacked mobile, narrower desktop column | `.culture-photo` |
| Brand panorama | `assets/branding/multi-sport-banner.webp` | 1536 × 512 | 2400 × 800, 3:1 | Whole wide graphic, never made into a tall mobile hero | `.brand-panorama img` |
| Events | `assets/events/las-vegas-night.webp` | 1050 × 1400 | 1200 × 1600, 3:4 | Whole event image; max height 600px | `.events-section .feature-image` |
| Energy | `assets/energy/driftwood-wristband.webp` | 1050 × 1400 | 1200 × 1600, 3:4 | Whole can/wristband image; max height 640px | `.energy-media img` |
| Shirt | `assets/merch/unleash-shirt.webp` | 832 × 832 | 1200 × 1200, square | Contained square, 2 columns mobile / 4 desktop | `.product-media img` |
| Hat | `assets/merch/logo-hat.webp` | 352 × 352 | 1200 × 1200, square | Same product rule; small original not artificially enlarged | `.product-media img` |
| Deck | `assets/merch/logo-skateboard-deck.webp` | 352 × 352 | 1200 × 1200 canvas, square | Full deck inside square canvas | `.product-media img` |
| Baby bodysuit | `assets/merch/baby-bodysuit.webp` | 352 × 352 | 1200 × 1200, square | Whole product inside square | `.product-media img` |
| Header logo | `assets/favicons/favicon-512x512.png` | 512 × 512 | 512 × 512 or trusted vector | 42px square, contained | `.navbrand img` |
| Community logos | Existing `assets/community-logos/*.avif` paths in each card | Varies | About 600px across; preserve original ratio | Contained within 130px-high frame | `.brand-card img` |
| Social preview | `assets/hero/skate-sky.webp` | 1154 × 860 | Ideally a dedicated 1200 × 630 export later | Social platforms may crop; this does not affect homepage | `meta[property="og:image"]` |

Original-to-final traceability: `IMG_9950` → skate-sky; `IMG_9953` → skate-ramp; `IMG_9954` → dog-watching-surf; `IMG_9653` → beach-walk (only black video-frame bars trimmed); `IMG_9949` → JD; `IMG_9951` → credited surf; `IMG_6107` → Las Vegas; `IMG_8394` → Energy; `IMG_6730` → panorama. The four inbox product files map to the four `assets/merch/` names above.

### Hero slides: replace, add, remove, reorder

Each slide is one `<figure class="hero-slide ...">` inside `.hero-slides`. Change its image `src`, `alt`, actual dimensions, and `data-caption`. The headline and CTAs are deliberately shared across slides; edit them in `.hero-content`. Keep one H1.

To add a slide, duplicate an entire figure. Keep `hidden` on every slide except the first. Only the first figure gets `is-active`, and only its image gets `fetchpriority="high"`; later images use lazy loading (the script prepares the next one). Controls and slide counts are generated automatically. Update the static `aria-label="1 of 4"` values for clarity too.

To remove a slide, remove its complete figure. To reorder, move complete figures, then check the first-slide classes, loading settings, and initial `.hero-caption`. About 3–5 slides is a sensible limit. More than three increases control width, so recheck 320px and allow controls to wrap if needed. One slide displays without controls.

`SLIDE_DELAY = 8000` in `scripts.js` is the interval in milliseconds. Manual slide navigation pauses rotation; hover/focus/offscreen/hidden-tab behavior protects reading. Reduced motion starts paused. Explicit Play works immediately. Keep Pause and reduced-motion handling.

The mobile media frame sits above a connected charcoal text block. Desktop uses image and text side by side, avoiding text across faces. All current slide images use `object-fit: contain`, so their full frames and marks are kept. Centered `object-position` is the default; changing it mostly shifts any spare space when using contain.

### Crop and alt text

`contain` shows the entire image. `cover` fills a shape by cropping edges. Natural `height: auto` keeps the original ratio. Routine replacements usually need HTML only; new frame shapes or deliberate crop changes need CSS.

If you later use an **uncredited** image that benefits from a crop, give its figure a meaningful class such as `hero-slide--track`, then add a rule under HOME / HERO:

```css
.hero-slide--track img {
  object-fit: cover;
  object-position: 65% 40%;
}
```

Test every breakpoint. Do not use this on credited photography if the frame would hide attribution. Use a separate rule inside the 900px media query only when desktop genuinely needs a different crop. Prefer an appropriate source over extreme cropping.

Alt text should describe the action or product, not guess identity: `Skateboarder above a ramp`. Only use an athlete's name when the owner has confirmed that association. Logos repeated beside the brand name may have `alt=""`. Do not put a whole marketing paragraph in alt text.

## Adding Athlete #7 or updating a photo

The current layout has JD as a featured photo-led card and five concise entries in `.athlete-list`. These are intentional text entries, not fake photo placeholders. All use `.athlete-card` and `.athlete-copy`.

Approved roster: DC — Illinois, USA — Skateboarding; Staysea — Florida, USA — Surfing; JD — Switzerland — Skateboarding; Mavie — California, USA — Gymnastics; Finn — Colorado, USA — Skateboarding; Tristan — California, USA — Lifestyle Athlete.

1. Upload an approved image to `assets/athletes/`, if one is available.
2. Search for the `ATHLETE CARD` comment inside `.athlete-list`.
3. Copy one entire `<article class="athlete-card">...</article>` into that same list.
4. Change its H3 name, `.athlete-location`, and `.athlete-sport`. Include only approved public facts.
5. To add an image, insert it **before** `.athlete-copy`:

```html
<img class="athlete-photo" src="/assets/athletes/approved-name-action.webp"
     alt="Approved athlete description" width="1600" height="1200"
     loading="lazy" decoding="async">
```

Use actual file dimensions. Action photos around 1600 × 1200 work well; portraits around 1000 × 1250 also work because photos retain their natural ratio. Replace a photo by changing its `src`/alt/dimensions. Remove the whole `img` when a photo is unavailable; the name/location/sport treatment remains complete.

For both an action image and a portrait, keep the action image as `.athlete-photo`, and add a portrait image in `.athlete-copy` only after giving it an explicit small width and a dedicated class in CSS. Do not squeeze two unrelated photographs into one crop. The current site does not invent paired portraits.

Optional profile links go inside the card only when a real page exists:

```html
<a class="text-link" href="/your-real-profile-page.html">Meet the athlete →</a>
```

Remove the entire anchor to omit a link. Do not use `href="#"`. The current site has no separate athlete profile pages.

Mobile stacks the feature and roster. At 900px, the feature and list sit side by side. Additional roster entries flow vertically with no JavaScript changes. Around 12–20 athletes, consider a full roster page or filters. You can change the featured athlete by changing all fields and the image in `.athlete-card--featured`; never rename a person without replacing the associated photo.

**Photo matching still needed:** no explicit source-image match was found for DC, Staysea, Mavie, Finn, or Tristan. Do not infer these from appearance. JD's graffiti-skatepark association is supplied by the owner.

## Current and future merchandise

The current categories are Shirt, Hat, Skateboard deck, and Baby bodysuit. The older First Wave hoodie, hat, and patch files remain as source history but are no longer shown.

Duplicate one `.product-card` inside `.product-grid` to add a hoodie, another shirt/hat/deck, or another category. Update all five items: image `src`, alt, actual dimensions, `.product-name` text, and the card `href`. If changing stores, update the section's main CTA as well. Keep prices and stock claims out unless supplied and maintained.

Use square canvases with the entire product visible. Tall skateboard decks work well centered in a square canvas. The product grid has two columns on phones and four from 900px; more products wrap automatically. No layout redesign is needed for a normal product replacement.

## Forms, redirects, and thank-you

Preserve both `name="contact"` and `name="athlete-application"`; their hidden `form-name` values, field `name` attributes, required fields, `data-netlify`, `netlify-honeypot="bot-field"`, hidden honeypot, `method="POST"`, and `action="/thank-you.html"` are integration contracts. Label `for` attributes must match input IDs.

Visible wording can change. Adding a select option is straightforward, but changing its stored value may affect downstream handling. New fields require a deployment and Netlify detection check. The existing age range and fields were preserved; changes to a youth-athlete application process should be made deliberately.

The AJAX handler opens `#thanks-modal` only after a successful HTTP response. Errors retain values and show retry guidance. Native POST is the fallback without JavaScript. Update confirmation copy in both the dialog in `index.html` and `thank-you.html`. Keep `thanks-title`, `thanks-close`, dialog semantics, and `_redirects` routes. The old `#thank-you` compatibility behavior remains.

A browser simulation cannot verify delivery to a real Netlify dashboard or inbox. Perform one controlled submission and confirm receipt before production.

## Kendu Energy and editorial content

Keep partner wording neutral. The homepage does not claim Energy health benefits or athlete endorsements. The supplied Las Vegas photo does not establish an official partnership with Formula 1, the Sphere, or other visible brands.

The existing Energy destination is preserved. If it is closed/password-protected, use only an owner-confirmed replacement. Existing community destinations and sponsorship benefit promises remain owner-maintained content.

## Design tokens and spacing

At the top of `styles.css`, DESIGN TOKENS controls backgrounds (`--bg`, `--surface`, `--surface-soft`, `--bg-dark`), text (`--text`, `--muted`, dark equivalents), orange (`--accent`, darker `--accent-link`, `--glow`), spacing (`--space-*`, `--section-space`, `--gutter`), type (`--h1`, `--h2`, `--h3`, `--body`), width, radius, shadow, and transition duration.

Change shared tokens before adding isolated overrides. Keep the foundation light, charcoal selective, and orange restrained. There is no forced scroll snap. Keep the reduced-motion block and 16px form controls for mobile usability.

## Future “Kendu Unleashed in Motion” video

A comment marks the future insertion point at the end of Culture; no empty visible section is published. When an approved reel is ready, add a real heading and `<video controls playsinline preload="none" poster="...">` with a compressed MP4 source. Add captions for meaningful speech/audio. If muted autoplay is later added, require `muted`, avoid autoplay for reduced-motion/data-saving users, pause offscreen, and never autoplay sound. A deliberate Play interaction is the simpler default.

## Before merging

Review the actual Netlify preview at 320, 375, 390, 430, 768, 1024, and 1440px or wider. Check image credits, roster spelling, current products, links/anchors, menu, carousel controls, natural scrolling, and form behavior. Try a physical phone, especially iOS Safari. Verify real form receipt. Use `FINAL-HANDOFF.md` for the short remaining owner action list.
