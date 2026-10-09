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
2. Use `ai-gateway.html` as an example of an interactive experience: request-flow exploration, expandable labs, a simulated consumption budget, session-only completion tracking and a temporary decision canvas. Shared behaviour and styles live in `assets/`.
3. In `index.html`, duplicate the `<article class="presentation">` inside `.collection`. Update its title, description, tags, date and links. Give its heading a unique ID and use the same ID in `aria-labelledby`.
4. Use relative links (not paths starting with `/`) so they work under the `/presentations/` GitHub Pages URL. Encode spaces in URLs as `%20`.
5. Preview locally, commit the new files and push to `main`.

The homepage and workshop content work without JavaScript or a build step. JavaScript enables request-flow exploration, the illustrative budget simulation and progress tracking. The workshop does not call Azure, store notes, or send entries to a backend. Canvas notes and progress are temporary and reset on reload. Provision an approved lab environment separately for the hands-on tasks and verify current Azure feature availability before use.