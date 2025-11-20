# sanity-plugin-mathml-editor

A visual MathML + LaTeX editor for Sanity Studio (v3/v4), powered by MathLive.  
Adds a `mathFormula` object type with a WYSIWYG math editor, virtual keyboard, and automatic LaTeX + MathML output.

---

##  Installation

```bash
npm install sanity-plugin-mathml-editor
```

Or with yarn/pnpm:

```bash
yarn add sanity-plugin-mathml-editor
pnpm add sanity-plugin-mathml-editor
```

---

##  Usage

### 1. Add the plugin to your Sanity config

**sanity.config.ts**

```ts
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {mathMLEditor} from 'sanity-plugin-mathml-editor'

export default defineConfig({
  // ...
  plugins: [
    deskTool(),
    mathMLEditor(),   // 👈 register the math editor
  ],
})
```

---

### 2. Use `mathFormula` in your schema

```ts
defineField({
  name: 'content',
  title: 'Content',
  type: 'array',
  of: [
    {type: 'block'},
    {type: 'mathFormula'},   // 👈 math editor block
  ],
})
```

That’s all you need.

---

##  Output format

Each formula is stored as:

```json
{
  "_type": "mathFormula",
  "latex": "\\frac{a}{b}",
  "mathml": "<mfrac><mi>a</mi><mi>b</mi></mfrac>"
}
```

---

##  License

MIT © AJ Beumer
