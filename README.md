# Presentations

A home for my talks and workshops, with a responsive collection homepage and interactive, customer-neutral learning experiences. The first featured session is **AI Gateway in Practice**.

Site address after deployment: <https://martaldsantos.github.io/presentations/>.

## Preview locally

From the repository root, run:

```sh
python -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish with GitHub Pages

The included GitHub Actions workflow publishes the site whenever changes are pushed to `main`.

1. Open <https://github.com/martaldsantos/presentations/settings/pages>.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push changes to `main`, or open the **Deploy to GitHub Pages** workflow under **Actions** and select **Run workflow**.

The workflow publishes tracked HTML, CSS, JavaScript, SVG, PNG, JPEG, WebP and web-font files, excluding `.github/`. PDFs, office documents, repository metadata and untracked files are not deployed. New web experiences and supported assets are included automatically.

GitHub Pages is public. Only commit materials approved for public sharing, with no customer names, logos, identifying filenames or customer-specific details. Deployment exclusions do not make files in a public Git repository private, and deleting a file does not remove it from earlier Git history.

## Add a presentation

1. Create customer-neutral HTML content in a descriptive folder, such as `presentations/my-talk/`. Adapt approved source material into web content; do not commit customer source decks.
2. Use `ai-gateway.html` as an example of a self-paced slide-style web presentation with live deployment instructions, PoC checks and speaker notes. Its styles and navigation live in `assets/ai-gateway.css` and `assets/ai-gateway.js`.
3. In `index.html`, duplicate the `<article class="presentation">` inside `.collection`. Update its title, description, topics, session details and links. Give its heading a unique ID and use the same ID in `aria-labelledby`. The homepage uses the same editorial palette and typography as the deck, with styles in `assets/library.css`; update its version parameter in `index.html` when changing that stylesheet.
4. Use relative links (not paths starting with `/`) so they work under the `/presentations/` GitHub Pages URL. Encode spaces in URLs as `%20`.
5. Preview locally, commit the new files and push to `main`.

## Present the AI Gateway deck

The deck uses the editorial design system in `.github/copilot-instructions.md`: neutral surfaces, Segoe UI typography, one blue accent, ruled idea groups rather than cards, and a 16:9 canvas fitted between the presentation controls. Narrow screens use a stacked reading layout, including a readable equivalent of the architecture diagram.

The deck's stylesheet and script URLs include version parameters to avoid stale browser assets after deployment. Update the corresponding parameter in `ai-gateway.html` whenever that asset changes; changing only the page URL does not refresh cached CSS or JavaScript.

The first 14 slides introduce APIM fundamentals, the two gateway paths, dedicated-tier runtime/policies/preview, and architecture/PoC design. At `#schedule`, switch to the standalone gateway portal and begin the live deployment when ready. The introduction and hands-on steps are self-paced, with no fixed agenda times or lab durations. Complete each validation before continuing; technical policy windows and preview dates remain unchanged.

Core PoC: prerequisites, dedicated-tier creation, model onboarding, app runtime keys, first model call, policy enforcement, telemetry and an approved MCP tool. Backend pools and semantic caching are optional **standard APIM** extensions, not promised capabilities of the dedicated preview tier. No second APIM instance is deployed by the core path.

Technical content was checked against Microsoft Learn on 9 October 2026: [APIM concepts](https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts), [existing APIM AI capabilities](https://learn.microsoft.com/en-us/azure/api-management/genai-gateway-capabilities), [dedicated tier overview](https://learn.microsoft.com/en-us/azure/api-management/ai-gateway-overview), [quickstart](https://learn.microsoft.com/en-us/azure/api-management/quickstart-ai-gateway-create), and [governance](https://learn.microsoft.com/en-us/azure/api-management/ai-gateway-govern-secure-assets). Recheck preview details before delivery.

- Click the slide, use the previous/next buttons, or press arrow keys, Page Up/Page Down or Space to navigate.
- Use the slide picker to jump to a topic. Home and End jump to the opening and closing slides.
- Swipe horizontally on a touch screen. Vertical scrolling remains available for smaller screens or speaker notes.
- Press **N** or select **Notes** to show speaker notes. Press **F** or select **Fullscreen** to enter or leave fullscreen when supported; Escape also exits fullscreen.
- Each slide has a shareable URL fragment, such as `ai-gateway.html#lab-3`. Browser back/forward restores visited slides.
- With JavaScript disabled, slides appear in reading order. Printing includes all slides, not just the active slide.

The homepage and slide content require no build step. The deck does not call Azure, store data or submit entries to a backend. Prepare approved model deployments, access rights, telemetry and a safe tool backend beforehand; create the dedicated gateway live after the briefing. Run code examples in a local terminal with securely supplied environment variables, never with credentials committed to this repository. Verify current Azure feature availability before use.