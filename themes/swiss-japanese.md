---
name: "Swiss × Japanese Minimalism"
description: "Timeless editorial publication translated into a modern startup presentation: Swiss grid discipline combined with Japanese minimalism."
mode: light
---

# Swiss × Japanese Minimalism

## Palette

| Role   | Value     | Notes                                      |
| ------ | --------- | ------------------------------------------ |
| bg     | `#FFFFFF` | Matte white primary canvas (70% ratio)     |
| text   | `#111111` | Primary black copy                         |
| accent | `#3CA5A1` | Primary brand Teal (20% ratio)             |
| coral  | `#FF5F7C` | Controlled Coral Pink emphasis (10% ratio) |
| muted  | `#687076` | Secondary labels and captions              |
| soft   | `#F5F7F8` | Soft gray grouping surface                 |
| rule   | `#DDE2E5` | Neutral gray borders and dividers          |

## Typography

- Display font: `"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` — weight 700–800 for headlines.
- Body font: `"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` — weight 400–600.
- Webfont import: `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap`
- Type-scale overrides:
  - Hero title: 76–112 px
  - Section heading: 52–76 px
  - Body text: 22–28 px

## Layout

- Content padding: 120 px from canvas edges (1920 × 1080).
- Alignment: Strong left-aligned Swiss 12-column grid with deliberate asymmetrical balance.
- Grid notes: Subtle hairline grid lines with corner registration crosses.

## Fixed components

These are paste-ready. Copy them verbatim into a slide that uses this theme.

### Title

```tsx
const Title = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: 88,
      fontWeight: 800,
      lineHeight: 1.05,
      letterSpacing: '-0.03em',
      margin: 0,
      color: '#111111',
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode `pageNum` / `total` props.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 40,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 16,
        fontWeight: 500,
        color: '#687076',
      }}
    >
      <span>CODEPOLITAN · SWISS × JAPANESE DESIGN SYSTEM</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};
```

### Eyebrow / accents

```tsx
const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 15,
      fontWeight: 600,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: '#3CA5A1',
    }}
  >
    {children}
  </div>
);
```

## Motion

- Philosophy: subtle — restrained editorial transitions (240–280ms) with shared-element morphs (`MorphElement`) and stepped reveals (`<Steps>`).
- Reusable keyframes:

```css
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

## Aesthetic

Inspired by Josef Müller-Brockmann, Dieter Rams, MUJI, and Apple Keynote. Matte white surfaces, generous negative space, crisp Poppins typography, Teal (`#3CA5A1`) structural accents, and restrained Coral Pink (`#FF5F7C`) focal points. No heavy drop shadows, neon colors, or decorative clutter.

## Example usage

```tsx
const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%', background: '#FFFFFF', color: '#111111', padding: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <Eyebrow>SESI 01 · PART 1</Eyebrow>
    <Title>Less, but better.</Title>
    <p style={{ fontSize: 28, color: '#2A2A2A', maxWidth: 960, marginTop: 28 }}>
      Swiss International Typographic Style combined with Japanese Minimalism.
    </p>
    <Footer />
  </div>
);
```

