# Soilmass Design System

A premium React component library with interactive Storybook documentation.

## Overview

97 production-ready components featuring:

- **Premium Design Tokens**: Colored shadows, spring animations, glass effects
- **1,000+ Story Variants**: Comprehensive documentation for every component
- **Dark Mode**: Complete dark theme token set
- **Accessibility**: Built-in a11y testing

## Installation

```bash
pnpm install
```

## Development

```bash
# Start Storybook
pnpm storybook

# Build static Storybook
pnpm build-storybook
```

## Components

### Atoms
Button, Input, Badge, Avatar, Checkbox, Radio, Toggle, Select, Link, Divider

### Forms
Slider, Rating, File Upload, Calendar, Search Input, Number Input, Tag Input, Contact Form

### Feedback
Toast, Alert, Progress, Skeleton, Loading States, Empty State, Confetti, Cookie Consent, Notification Badge

### Navigation
Tabs, Accordion, Breadcrumb, Pagination, Stepper, FAB, Dock

### Overlays
Modal, Drawer, Dropdown, Tooltip, Popover, Command Palette, Collapsible

### Data Display
Table, Timeline, Code Block, Kbd, Cards (Pricing, Stat, Team, Blog), Video Player, Image Gallery, Avatar Stack, Bento Grid, Before/After

### Marketing
Hero Section, CTA Banner, Feature Card, Testimonial Card, Logo Cloud, FAQ, Newsletter Form, Comparison Table, Announcement Bar, Marquee, Social Links

### Effects & Utils
Particles, Meteors, Glass Effect, Glow Effects, Gradient Text, Text Highlight, Animated Border, Tilt Card, Flip Card, Scroll Animations, Cursor Effects, Magnetic Elements, Theme Toggle, Copy Button, Scroll to Top, Countdown Timer

## Design Tokens

All components use CSS custom properties from `app/globals.css`:

```css
/* Shadows with brand tints */
--shadow-primary-sm, --shadow-primary-md, --shadow-primary-lg
--shadow-accent-sm, --shadow-accent-md

/* Spring animations */
--ease-spring: cubic-bezier(0.22, 1, 0.36, 1)
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1)

/* Glass effects */
--glass-bg, --blur-sm, --blur-md, --blur-lg

/* Micro-interactions */
--scale-press: 0.98
--scale-hover: 1.02
```

## Project Structure

```
├── .storybook/           # Storybook configuration
├── app/
│   └── globals.css       # Design tokens
├── components/
│   ├── ui/               # Atomic components
│   └── patterns/         # Composed patterns
├── lib/
│   └── utils.ts          # Utilities (cn, etc.)
└── stories/              # Component documentation
```

## Tech Stack

- React 19
- Storybook 10.2
- Tailwind CSS 4
- TypeScript 5.7
- Vite 7

## Deployment

GitHub Pages auto-deployment is configured. Push to `main` to deploy.

**Live**: https://soilmass.github.io/soilmass-storybook

## License

MIT
