"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ScrollToTop,
  ScrollProgress,
  ReadingProgress,
  ScrollIndicator,
} from "@/components/ui/scroll-to-top"

const meta = {
  title: "Components/Utils/ScrollToTop",
  component: ScrollToTop,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Button to scroll back to top of page. Features visibility threshold, smooth scroll animation, progress indicator, and multiple positions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["bottom-right", "bottom-left", "bottom-center"],
      description: "Position on screen",
    },
    variant: {
      control: "radio",
      options: ["default", "primary", "minimal", "with-text"],
      description: "Button variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showProgress: {
      control: "boolean",
      description: "Show progress ring",
    },
  },
} satisfies Meta<typeof ScrollToTop>

export default meta
type Story = StoryObj<typeof meta>

// Scrollable content wrapper
function ScrollableContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-[300vh] bg-[var(--color-surface)] p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-[var(--color-text)]">
          Scroll down to see the button
        </h1>
        <p className="text-[var(--color-text-muted)]">
          The scroll to top button will appear after scrolling past the threshold.
        </p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} className="text-[var(--color-text-muted)]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris.
          </p>
        ))}
      </div>
      {children}
    </div>
  )
}

// Default
export const Default: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollToTop />
    </ScrollableContent>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4 p-8">
      <p className="text-sm text-[var(--color-text-muted)] mb-8">
        Note: These buttons are shown inline for demo. In actual use, they are fixed-positioned
        and only appear after scrolling.
      </p>
      <div className="flex items-center gap-4">
        <button className="h-12 w-12 flex items-center justify-center rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">Default</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="h-12 w-12 flex items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">Primary</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="h-12 w-12 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">Minimal</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] shadow-lg">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm font-medium">Back to top</span>
        </button>
        <span className="text-sm text-[var(--color-text-muted)]">With Text</span>
      </div>
    </div>
  ),
}

// Primary variant
export const Primary: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollToTop variant="primary" />
    </ScrollableContent>
  ),
}

// With progress ring
export const WithProgress: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollToTop showProgress variant="primary" />
    </ScrollableContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Shows a progress ring indicating scroll position.",
      },
    },
  },
}

// With text
export const WithText: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollToTop variant="with-text" label="Back to top" />
    </ScrollableContent>
  ),
}

// Positions
export const Positions: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollToTop position="bottom-left" offset={80} />
      <ScrollToTop position="bottom-center" offset={20} variant="primary" />
      <ScrollToTop position="bottom-right" offset={80} />
    </ScrollableContent>
  ),
}

// Scroll progress bar
export const ProgressBar: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollProgress />
    </ScrollableContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Fixed progress bar showing scroll position.",
      },
    },
  },
}

// Gradient progress bar
export const GradientProgress: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollProgress color="gradient" height={4} />
    </ScrollableContent>
  ),
}

// Progress with percentage
export const ProgressWithPercent: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollProgress showPercent height={4} />
    </ScrollableContent>
  ),
}

// Bottom progress bar
export const BottomProgress: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollProgress position="bottom" />
    </ScrollableContent>
  ),
}

// Reading progress (for articles)
export const ArticleProgress: Story = {
  render: () => (
    <div className="h-[300vh] bg-[var(--color-surface)]">
      <ReadingProgress height={4} />
      <article className="max-w-3xl mx-auto p-8" id="article">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-4">
          Article Title
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-8">
          Published on January 1, 2024 · 10 min read
        </p>
        {Array.from({ length: 25 }).map((_, i) => (
          <p key={i} className="text-[var(--color-text-muted)] mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        ))}
      </article>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Progress bar for tracking article reading progress.",
      },
    },
  },
}

// Scroll indicator (landing page)
export const Indicator: Story = {
  render: () => (
    <div className="h-[200vh] bg-[var(--color-surface)]">
      <section className="h-screen flex flex-col items-center justify-center relative">
        <h1 className="text-4xl font-bold text-[var(--color-text)] mb-4">
          Welcome to Our Site
        </h1>
        <p className="text-[var(--color-text-muted)] mb-16">
          Scroll down to explore more
        </p>
        <div className="absolute bottom-16">
          <ScrollIndicator text="Scroll" />
        </div>
      </section>
      <section className="p-8">
        <h2 className="text-2xl font-bold text-[var(--color-text)]">
          More content here
        </h2>
      </section>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Scroll hint indicator for hero sections.",
      },
    },
  },
}

// Combined example
export const CombinedExample: Story = {
  render: () => (
    <ScrollableContent>
      <ScrollProgress color="gradient" height={3} />
      <ScrollToTop variant="primary" showProgress />
    </ScrollableContent>
  ),
  parameters: {
    docs: {
      description: {
        story: "Combining progress bar with scroll to top button.",
      },
    },
  },
}
