# sanity-plugin-mathml-editor

Visual **Math editor** for Sanity Studio (v3/v4) built on top of [MathLive](https://cortexjs.io/mathlive/).  
Stores **LaTeX** and **MathML** for each formula, so you get both a nice editing experience and accessible output.

> Created and maintained by **AJ Beumer**.

---

## Features

- Visual WYSIWYG math editor (no LaTeX knowledge required)
- MathLive virtual keyboard and symbol palette
- Auto-focus when the editor opens (start typing immediately)
- Stores both:
  - `latex` – for rendering with MathLive/KaTeX/MathJax
  - `mathml` – for accessible output and future-proof rendering
- Compact, rendered preview inside Portable Text content

The plugin defines a reusable object type: **`mathFormula`**.

---

## Requirements

- Sanity Studio **v3 or v4**
- React **18** (`react` and `react-dom` peer deps)
- A modern browser (MathLive uses web components)

---

## Installation

### From npm (recommended once published)

```bash
npm install sanity-plugin-mathml-editor
# or
yarn add sanity-plugin-mathml-editor
# or
pnpm add sanity-plugin-mathml-editor
