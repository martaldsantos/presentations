# Presentations

A home for my talks and workshops. The first featured session is **AI Gateway in Practice**, an public workshop hands-on workshop.

## Preview locally

From the repository root, run:

```sh
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Publish with GitHub Pages

The included GitHub Actions workflow publishes the site whenever changes are pushed to `main`. In the repository settings, open **Pages** and set the build and deployment source to **GitHub Actions**. The workflow packages `index.html` and the PDF in `apim presentation/`.

The page embeds the PDF when the browser supports PDF viewing and also provides direct open and download links. The deck's agenda and the website's workshop outline follow the same lab order.