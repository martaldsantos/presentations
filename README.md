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
2. Use `ai-gateway.html` as an example of a slide-style web presentation. It has 16 slides, architecture diagrams, six lab walkthroughs and speaker notes. Its styles and navigation live in `assets/ai-gateway.css` and `assets/ai-gateway.js`.
3. In `index.html`, duplicate the `<article class="presentation">` inside `.collection`. Update its title, description, tags, date and links. Give its heading a unique ID and use the same ID in `aria-labelledby`.
4. Use relative links (not paths starting with `/`) so they work under the `/presentations/` GitHub Pages URL. Encode spaces in URLs as `%20`.
5. Preview locally, commit the new files and push to `main`.

## Present the AI Gateway deck

- Click the slide, use the previous/next buttons, or press arrow keys, Page Up/Page Down or Space to navigate.
- Use the slide picker to jump to a topic. Home and End jump to the opening and closing slides.
- Swipe horizontally on a touch screen. Vertical scrolling remains available for smaller screens or speaker notes.
- Press **N** or select **Notes** to show speaker notes. Press **F** or select **Fullscreen** to enter or leave fullscreen when supported; Escape also exits fullscreen.
- Each slide has a shareable URL fragment, such as `ai-gateway.html#lab-3`. Browser back/forward restores visited slides.
- With JavaScript disabled, slides appear in reading order. Printing includes all slides, not just the active slide.

The homepage and slide content require no build step. The deck does not call Azure, store data or submit entries to a backend. Provision an approved lab environment separately for the hands-on tasks and verify current Azure feature availability before use.