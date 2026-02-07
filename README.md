# Soilmass Storybook

Interactive component documentation for the Soilmass Design System.

## Overview

This Storybook showcases 90+ components from the Soilmass Design System, featuring:

- **Premium Design Tokens**: Colored shadows, spring animations, glass effects
- **1,000+ Stories**: Comprehensive examples for every component variant
- **Accessibility Testing**: Built-in a11y validation
- **Dark Mode Support**: Full dark theme token set

## Categories

| Category | Components | Description |
|----------|------------|-------------|
| Atoms | 10 | Button, Input, Badge, Avatar, etc. |
| Forms | 8 | Slider, Rating, File Upload, Calendar, etc. |
| Feedback | 9 | Toast, Alert, Progress, Skeleton, etc. |
| Navigation | 7 | Tabs, Accordion, Breadcrumb, Pagination, etc. |
| Overlays | 7 | Modal, Drawer, Dropdown, Tooltip, etc. |
| Data Display | 12 | Table, Timeline, Cards, Code Block, etc. |
| Marketing | 11 | Hero, CTA, Testimonials, Pricing, etc. |
| Utils | 22 | Animations, Effects, Theme Toggle, etc. |

## Quick Start

```bash
# Install dependencies (from parent directory)
pnpm install

# Run Storybook
pnpm storybook

# Build static Storybook
pnpm build-storybook
```

## Project Structure

```
storybook/
├── .storybook/           # Storybook configuration
│   ├── main.ts           # Stories, addons, Vite config
│   ├── manager.ts        # UI theme and branding
│   ├── preview.tsx       # Decorators and parameters
│   └── vitest.setup.ts   # Test configuration
└── stories/
    ├── docs/             # MDX documentation pages
    │   ├── Introduction.mdx
    │   └── Colors.mdx
    └── components/       # Component stories
        ├── atoms/
        ├── forms/
        ├── feedback/
        ├── navigation/
        ├── overlays/
        ├── data-display/
        ├── marketing/
        └── utils/
```

## Design System Features

### Premium Tokens

- **Shadows**: Colored shadows with brand tints (`--shadow-primary-*`, `--shadow-accent-*`)
- **Gradients**: Brand gradients, mesh backgrounds, hero gradients
- **Motion**: Spring easing (`--ease-spring`), bounce, snappy transitions
- **Glass**: Backdrop blur effects (`--glass-bg`, `--blur-*`)
- **Micro-interactions**: Scale on press, hover lift animations

### Component Patterns

All components follow consistent patterns:

```tsx
// Spring-based transitions
className="transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]"

// Colored shadows
className="shadow-[var(--shadow-primary-sm)] hover:shadow-[var(--shadow-primary-md)]"

// Scale micro-interactions
className="active:scale-[var(--scale-press)]"

// Glass effects
className="bg-[var(--glass-bg)] backdrop-blur-[var(--blur-lg)]"
```

## Tech Stack

- **Storybook** 10.2.7
- **React** 19
- **Vite** 7
- **Tailwind CSS** 4
- **TypeScript** 5.7

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm storybook` | Start dev server on port 6006 |
| `pnpm build-storybook` | Build static site to `storybook-static/` |

## Deployment

### GitHub Pages

This repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages on push to `main`.

### Manual Deploy

```bash
pnpm build-storybook
# Deploy storybook-static/ to your hosting provider
```

## Related

- [Soilmass Design System Spec](https://github.com/soilmass/design-system-spec)
- [Soilmass Reference Site](https://github.com/soilmass/reference)

## License

MIT
