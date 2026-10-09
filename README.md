# Presentations

A home for my talks and workshops, with a responsive collection homepage and individual presentation pages. The first featured session is **AI Gateway in Practice**, an public workshop hands-on workshop.

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

The workflow packages tracked repository content, excluding `.github/` and this README, so new presentation folders and assets are included automatically. It does not publish untracked local files. GitHub Pages is a public website: only add presentations and materials approved for public sharing.

## Add a presentation

1. Add the deck and any assets in a descriptive folder, such as `presentations/my-talk/`. PDF and HTML decks can both be hosted; PowerPoint files can be offered as downloads.
2. Optionally create an HTML session page. The existing `ai-gateway.html` is an example with an embedded PDF, download links and a workshop outline.
3. In `index.html`, duplicate the `<article class="presentation">` inside `.collection`. Update its title, description, tags, date and links. Give its heading a unique ID and use the same ID in `aria-labelledby`.
4. Use relative links (not paths starting with `/`) so they work under the `/presentations/` GitHub Pages URL. Encode spaces in URLs as `%20`.
5. Preview locally, commit the new files and push to `main`.

The homepage works without JavaScript or a build step. The workshop page embeds the PDF when the browser supports PDF viewing and also provides direct open and download links. The deck's agenda and the workshop outline follow the same lab order.