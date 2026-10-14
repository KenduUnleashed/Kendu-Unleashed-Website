# Kendu Unleashed — final QA notes

Reviewed October 13, 2026. Branch: `astra-final-polish`, existing draft PR #2. Main/production was not modified.

## Completed

- Current **Unleash Yourself** message throughout the homepage and metadata; retired First Wave merchandise replaced with four current supplied products.
- Three-photo hero, lifestyle About, six approved athletes, surf/moto culture, Las Vegas event photography, multi-sport banner, and separate Energy partner feature.
- Light grayscale foundation, selective charcoal, restrained orange, responsive typography and natural continuous scrolling.
- Supplied photography only. Credits and full image frames retained; beach-walk video-frame black bars trimmed. Optimized derivatives organized by section; source originals retained.
- JD uses the explicitly identified skatepark photo. DC, Staysea, Mavie, Finn, and Tristan have complete approved text entries without guessed photo identities or invented facts.
- Existing form contracts, links, sponsorship benefits and community directory retained. Carousel Pause/Play focus behavior corrected.
- Editing guide updated to actual final markup, imagery and owner workflows; short final handoff added.

## Validation performed

The deployed preview passed **27 responsive and interaction checks** on October 13. Tests used the deployed HTML/CSS/JS in same-origin iframe viewports. Reduced-motion preferences and form responses were simulated. The temporary test page was removed from the final branch; no real messages were sent.

| Check | Result |
| --- | --- |
| Widths 320, 375, 390, 430, 768, 1024, 1440 and 1920px | No horizontal overflow, broken images or recorded site-script errors |
| Approved roster and merchandise | Six athletes; four current products |
| Mobile menu / Escape | Opens and closes correctly |
| First focused Pause click / explicit Play | Correct state and behavior |
| Eight-second autoplay | Observed advancing |
| Previous, next and pagination | Correct slide selection and wrap |
| Synthetic vertical / horizontal touch gestures | Vertical preserves slide; horizontal advances and pauses |
| All disclosures expanded at 320px | No horizontal overflow |
| Contact HTTP 500 / network failure | Honest error; entered values retained; no success dialog |
| Contact simulated HTTP 200 | Form resets and dialog opens |
| Dialog Close | Closes and returns focus to submitting button |
| Empty athlete application | Native required-field validation prevents submission |
| Completed application, simulated HTTP 200 | Success dialog opens |
| Reduced motion | Carousel starts paused |
| No-JavaScript fallback | Content, visible navigation and native form action retained |
| Local paths / anchors / unique IDs / single H1 / field labels | Pass |
| Netlify form identifiers, field names, actions and honeypots | Preserved against uploaded baseline |
| JavaScript syntax / git whitespace check | Pass |
| Homepage current campaign wording | No First Wave wording remains |
| Existing link destination set | Retained |
| Shop and Kendu.io | HTTP 200 |
| Energy destination | Redirects to password page; original destination retained |
| Netlify Deploy Preview | Successful build and rendered inspection |

Rendered screenshots were inspected for mobile hero, roster, merchandise, Energy and desktop composition. Browser tests do not establish physical iOS/Android behavior or actual inbox delivery. No comprehensive third-party directory availability or independent program-claims audit was performed. Earlier baseline checks also verified `/thank-you` and legacy `/about.html` redirects.

## Supplied-asset review and selection

All 22 newly supplied files were visually reviewed. The four product files were under `assets/inbox/`; the 18 photographs/graphics were under `assets/` with their original camera filenames. None was deleted.

| Supplied file | Decision |
| --- | --- |
| `343B4196-F617-4974-B3D8-66FF6C728673.jpeg` | Unidentified microphone portrait; not assigned to an athlete |
| `853A65CF-67B8-4C65-B4DF-0FE0B644C3F2.jpeg` | Alternate yellow-shirt skate image; stronger selected version used |
| `IMG_6057.jpeg` | You Kendu It wall; retained as future brand accent, not forced into page |
| `IMG_6107.jpeg` | Events: Las Vegas/Sphere photograph |
| `IMG_6730.jpeg` | Complete wide multi-sport banner |
| `IMG_8388.jpeg` | Alternate Energy water image; preferred driftwood selected |
| `IMG_8392.jpeg` | Driftwood alternate without wristband; not selected |
| `IMG_8394.jpeg` | Energy: driftwood with wristband |
| `IMG_8397.jpeg` | Backpack/can still-life; beach-walk preferred for About |
| `IMG_9647.jpeg` | Boat/video frame; not selected |
| `IMG_9653.jpeg` | Wider beach-walk frame for About |
| `IMG_9654.jpeg` | Closer duplicate beach-walk frame; not selected |
| `IMG_9949.jpeg` | Confirmed JD skatepark image |
| `IMG_9950.jpeg` | Blue-sky skateboard hero |
| `IMG_9951.jpeg` | Culture surf action; photographer/4SIDEHUSTLE marks retained |
| `IMG_9952.jpeg` | Lower-resolution JD duplicate; not selected |
| `IMG_9953.jpeg` | Yellow-shirt ramp hero with banner |
| `IMG_9954.jpeg` | Dog watching surfer hero |
| `assets/inbox/product shirt.webp` | Current Shirt |
| `assets/inbox/product hat.webp` | Current Hat |
| `assets/inbox/product skateboard.webp` | Current Skateboard deck |
| `assets/inbox/product onesie.webp` | Current Baby bodysuit |

The existing dirtbike photograph supplies additional sport variety. The hero remains skate/lifestyle led because these are the strongest supplied hero candidates. No higher resolution was invented for the 521 × 728 ramp image or 352px product sources. All major final filenames, dimensions, selectors and replacement guidance are in `WEBSITE-EDITING-GUIDE.md`.

## Remaining owner verification

- Review the preview on a physical phone, including Safari, swipes, menu, keyboard and scrolling.
- Verify Netlify detection/storage and notification receipt with one controlled real submission per form.
- Confirm whether the inherited Energy URL should remain while its store is password-protected, or supply the intended public URL.
- Photo matching for the other five athletes remains unavailable. Supply exact name-to-file associations before adding their photos; the approved text roster is already published.

Preview: https://deploy-preview-2--kenduunleashed.netlify.app/

Draft PR: https://github.com/KenduUnleashed/Kendu-Unleashed-Website/pull/2
