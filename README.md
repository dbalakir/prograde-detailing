# Pro Grade Detailing

Static site for Pro Grade Detailing (Rob Vernola, Silver Spring MD). No build step.

- `index.html`: car + RV landing page
- `rv/index.html`: RV-only landing page
- `assets/site.css`, `assets/site.js`: shared styles and scroll-reveal
- `assets/logo-red.svg` / `logo-white.svg`: vector rebuild of the logo (red or white "DETAILING" banner)
- `assets/img/`: work photos pulled from the Facebook page (WebP)

Booking: https://cal.callwhale.com/progradedetailing · Phone: (301) 888-6865

Preview locally: `python3 -m http.server` from this folder (paths are root-relative).

## Hosting

Live preview on GitHub Pages: https://dbalakir.github.io/prograde-detailing/

Pages use relative paths so they work under the `/prograde-detailing/` subpath and on a custom domain. `404.html` is the exception: GitHub serves it at any URL, so its links are prefixed with `/prograde-detailing/`. When the custom domain goes live, change those back to `/`.
