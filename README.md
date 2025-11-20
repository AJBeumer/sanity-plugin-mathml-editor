# sanity-plugin-mathml-editor

Visual **Math editor** for Sanity Studio (v3/v4) built on top of [MathLive](https://cortexjs.io/mathlive/).  
Stores **LaTeX** and **MathML** for each formula, giving authors a visual editor while producing accessible, standards-based output.

> Created and maintained by **AJ Beumer**.

---

## Features

- Full **WYSIWYG math editor** (MathLive)
- Built-in math keyboard & symbol palette
- Auto-focus on open (start typing immediately)
- Stores both:
    - `latex` – ideal for rendering with MathLive, KaTeX, MathJax
    - `mathml` – for accessible, browser-native math
- Clean block preview (renders formula, not LaTeX text)
- Fully compatible with **Sanity v3/v4** Portable Text

This plugin provides a new Portable Text object type: **`mathFormula`**.

---

## Installation

### 1. Install the plugin

#### From npm (recommended once published)

```bash
npm install sanity-plugin-mathml-editor
# or
yarn add sanity-plugin-mathml-editor
# or
pnpm add sanity-plugin-mathml-editor
```

#### From GitHub (latest main)

```bash
npm install git+https://github.com/AJBeumer/sanity-plugin-mathml-editor.git
# or
npm install github:AJBeumer/sanity-plugin-mathml-editor
```

> This repo uses a `prepare` script — when installed from GitHub, it automatically builds the `dist/` folder.

---

### 2. React / Sanity peer requirements

Your Sanity Studio must use **React 18**:

```jsonc
// package.json of your Sanity Studio
"dependencies": {
  "react": "^18.0.0",
  "react-dom": "^18.0.0",
  "sanity": "^3.0.0 || ^4.0.0"
}
```

If your studio was created with React 19, align it:

```bash
npm install react@18 react-dom@18
```

---

# Usage

Below is an example showing:
- What to add to `sanity.config.ts`
- How to define a schema using the math editor

---

## 1. Register the plugin

**File:** `sanity.config.ts`

```ts
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Import plugin
import {mathMLEditor} from 'sanity-plugin-mathml-editor'

export default defineConfig({
  name: 'default',
  title: 'MathML Test Studio',
  projectId: 'yourProjectId',
  dataset: 'production',
  plugins: [
    deskTool(),
    visionTool(),
    mathMLEditor(), // Registers mathFormula + editor UI
  ],
  schema: {
    types: schemaTypes,
  },
})
```

---

## 2. Create a schema that uses `mathFormula`

### 2.1 Document schema

**File:** `schemaTypes/section.ts`

```ts
import {defineField, defineType} from 'sanity'

export const sectionType = defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {type: 'block'},        // Normal Portable Text
        {type: 'mathFormula'},  // Math editor block
      ],
    }),
  ],
})
```

### 2.2 Add your type to your schema index

**File:** `schemaTypes/index.ts`

```ts
import {sectionType} from './section'

export const schemaTypes = [
  sectionType,
]
```

---

# What You’ll See in Studio

After running:

```bash
npm run dev
```

Inside a **Section** document:

1. Go to **Content**
2. Click the **“+”** button
3. Choose **“Math formula”**
4. A MathLive editor dialog appears:
    - Type directly
    - Use the virtual math keyboard
    - Close the dialog → the formula is rendered beautifully

---

# Stored Data Shape

A math formula is stored as:

```json
{
  "_type": "mathFormula",
  "_key": "dbfca46901d7",
  "latex": "a\dfrac{\mathrm{d}2}{\mathrm{d}x^2}2\bigm|_{x=2}",
  "mathml": "<mrow><mi>a</mi><mfrac>...</mfrac>...</mrow>"
}
```

Test via **Vision**:

```groq
*[_type == "section"]{
  title,
  content
}
```

---

# Frontend Rendering Example

Render MathML (or fall back to LaTeX):

### 1. `MathFormulaBlock` component

**File:** `components/MathFormulaBlock.tsx`

```tsx
type MathFormulaValue = {
  latex?: string
  mathml?: string
}

export function MathFormulaBlock(props: {value: MathFormulaValue}) {
  const {mathml, latex} = props.value

  if (mathml) {
    return (
      <span
        dangerouslySetInnerHTML={{__html: mathml}}
      />
    )
  }

  return <span>{latex}</span>
}
```

### 2. Integrate into `@portabletext/react`

```tsx
import {PortableText} from '@portabletext/react'
import {MathFormulaBlock} from './components/MathFormulaBlock'

const components = {
  types: {
    mathFormula: MathFormulaBlock,
  },
}

export function SectionBody(props: {value: any}) {
  return <PortableText value={props.value} components={components} />
}
```

---

# Local Development (Contributing / Forking)

```bash
git clone https://github.com/AJBeumer/sanity-plugin-mathml-editor.git
cd sanity-plugin-mathml-editor
npm install
npm run dev
```

## Use the local plugin in a Studio project

In your Studio `package.json`:

```jsonc
"dependencies": {
  "sanity-plugin-mathml-editor": "file:../sanity-plugin-mathml-editor"
}
```

Then:

```bash
npm install
npm run dev
```

The plugin will be resolved from your local folder.

---

# License

MIT © AJ Beumer
