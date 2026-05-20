# conixtract.github.io

Personal site & resume of **Paul Kern** — software engineer working on geometry processing,
computer graphics, and physical simulation.

Live at **https://conixtract.github.io**.

## Stack

A single static page — no build step, no bundler.

- HTML + CSS
- React 18 (loaded from unpkg)
- Babel Standalone (in-browser JSX transpile)
- Inter Tight + JetBrains Mono (Google Fonts)

## Structure

```
index.html            entry point
tokens.css            shared design tokens (colors, type, spacing, reveal animation)
v3-spectrum.css       layout & component styles
v3-spectrum.jsx       the React component that renders the page
data.jsx              all content (about, career, projects, research, skills, hobbies, links)
assets/portrait.jpg   photo used in the hero
```

To change copy, edit **`data.jsx`** — the rest of the code stays the same.

## Run locally

Open `index.html` in any modern browser. No server, no install.

If your browser blocks the inline Babel transpile when opened via `file://`, serve the
folder with any static server, e.g.:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

## License

Code is MIT. Content (text, photo, project descriptions) is © Paul Kern, all rights reserved.
