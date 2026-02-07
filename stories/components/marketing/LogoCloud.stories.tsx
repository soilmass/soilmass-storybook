import type { Meta, StoryObj } from "@storybook/react-vite"
import { LogoCloud, LogoRow, TrustedBy, type LogoItem } from "@/components/ui/logo-cloud"

const meta = {
  title: "Components/Marketing/LogoCloud",
  component: LogoCloud,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display partner/client logos in grid, flex, or marquee layouts. Features grayscale with hover effect, responsive wrapping, and optional links.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["grid", "flex", "marquee"],
      description: "Layout variant",
    },
    columns: {
      control: "radio",
      options: [3, 4, 5, 6],
      description: "Number of columns (grid variant)",
    },
    grayscale: {
      control: "boolean",
      description: "Apply grayscale filter",
    },
    logoHeight: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Max logo height",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Section size",
    },
  },
} satisfies Meta<typeof LogoCloud>

export default meta
type Story = StoryObj<typeof meta>

// Sample logos using placeholder service
const sampleLogos: LogoItem[] = [
  { name: "Vercel", src: "https://placehold.co/120x40/000000/FFFFFF?text=Vercel" },
  { name: "Stripe", src: "https://placehold.co/120x40/635BFF/FFFFFF?text=Stripe" },
  { name: "Linear", src: "https://placehold.co/120x40/5E6AD2/FFFFFF?text=Linear" },
  { name: "Notion", src: "https://placehold.co/120x40/000000/FFFFFF?text=Notion" },
  { name: "Figma", src: "https://placehold.co/120x40/F24E1E/FFFFFF?text=Figma" },
]

const moreSampleLogos: LogoItem[] = [
  ...sampleLogos,
  { name: "GitHub", src: "https://placehold.co/120x40/24292E/FFFFFF?text=GitHub" },
  { name: "Slack", src: "https://placehold.co/120x40/4A154B/FFFFFF?text=Slack" },
  { name: "Zoom", src: "https://placehold.co/120x40/2D8CFF/FFFFFF?text=Zoom" },
]

// Default (flex)
export const Default: Story = {
  render: () => (
    <div className="w-[800px]">
      <LogoCloud
        logos={sampleLogos}
        heading="Trusted by industry leaders"
      />
    </div>
  ),
}

// Grid layout
export const Grid: Story = {
  render: () => (
    <div className="w-[800px]">
      <LogoCloud
        logos={moreSampleLogos}
        heading="Our customers"
        variant="grid"
        columns={4}
      />
    </div>
  ),
}

// Different column counts
export const Columns: Story = {
  render: () => (
    <div className="w-[900px] space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">3 Columns</p>
        <LogoCloud
          logos={sampleLogos.slice(0, 6)}
          variant="grid"
          columns={3}
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">5 Columns</p>
        <LogoCloud
          logos={sampleLogos}
          variant="grid"
          columns={5}
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">6 Columns</p>
        <LogoCloud
          logos={moreSampleLogos.slice(0, 6)}
          variant="grid"
          columns={6}
        />
      </div>
    </div>
  ),
}

// Without grayscale
export const NoGrayscale: Story = {
  render: () => (
    <div className="w-[800px]">
      <LogoCloud
        logos={sampleLogos}
        heading="Our partners"
        grayscale={false}
      />
    </div>
  ),
}

// Logo heights
export const LogoHeights: Story = {
  render: () => (
    <div className="w-[800px] space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Small (24px max)</p>
        <LogoCloud logos={sampleLogos} logoHeight="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Medium (32px max)</p>
        <LogoCloud logos={sampleLogos} logoHeight="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Large (40px max)</p>
        <LogoCloud logos={sampleLogos} logoHeight="lg" />
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="w-[800px] space-y-8">
      <LogoCloud
        logos={sampleLogos.slice(0, 4)}
        heading="Small section"
        size="sm"
      />
      <LogoCloud
        logos={sampleLogos.slice(0, 4)}
        heading="Medium section (default)"
        size="md"
      />
      <LogoCloud
        logos={sampleLogos.slice(0, 4)}
        heading="Large section"
        size="lg"
      />
    </div>
  ),
}

// With links
export const WithLinks: Story = {
  render: () => {
    const logosWithLinks: LogoItem[] = [
      { name: "Vercel", src: "https://placehold.co/120x40/000000/FFFFFF?text=Vercel", href: "#" },
      { name: "Stripe", src: "https://placehold.co/120x40/635BFF/FFFFFF?text=Stripe", href: "#" },
      { name: "Linear", src: "https://placehold.co/120x40/5E6AD2/FFFFFF?text=Linear", href: "#" },
    ]

    return (
      <div className="w-[600px]">
        <LogoCloud
          logos={logosWithLinks}
          heading="Click to visit"
        />
      </div>
    )
  },
}

// Marquee animation
export const Marquee: Story = {
  render: () => (
    <div className="w-[800px]">
      <LogoCloud
        logos={moreSampleLogos}
        heading="Trusted by thousands of companies"
        variant="marquee"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Marquee variant with continuous scrolling animation (requires CSS keyframes).",
      },
    },
  },
}

// Simple logo row
export const Row: Story = {
  render: () => (
    <div className="w-[600px]">
      <LogoRow logos={sampleLogos.slice(0, 4)} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple inline logo row without heading.",
      },
    },
  },
}

// Trusted by component
export const TrustedByVariant: Story = {
  render: () => (
    <div className="w-[700px] space-y-8">
      <TrustedBy
        logos={sampleLogos.slice(0, 4)}
        heading="Trusted by leading companies"
        direction="horizontal"
      />
      <TrustedBy
        logos={sampleLogos.slice(0, 4)}
        heading="Used by teams at"
        direction="vertical"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact TrustedBy component with text and logos.",
      },
    },
  },
}

// Hero section usage
export const HeroContext: Story = {
  render: () => (
    <section className="py-16 w-[900px]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--color-text)]">
          Build faster, ship sooner
        </h1>
        <p className="mt-4 text-xl text-[var(--color-text-muted)]">
          The platform for modern development teams
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <button className="px-6 py-3 text-white bg-[var(--color-primary)] rounded-[var(--radius-md)]">
            Get Started
          </button>
          <button className="px-6 py-3 border border-[var(--color-border)] rounded-[var(--radius-md)]">
            Learn More
          </button>
        </div>
      </div>
      <LogoCloud
        logos={sampleLogos}
        heading="Trusted by the best teams"
        size="sm"
      />
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo cloud used in a hero section for social proof.",
      },
    },
  },
}

// Footer context
export const FooterContext: Story = {
  render: () => (
    <footer className="py-8 border-t border-[var(--color-border)] w-[900px]">
      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Backed by
        </p>
        <LogoRow
          logos={sampleLogos.slice(0, 3)}
          size="sm"
        />
      </div>
    </footer>
  ),
}

// Dark background
export const DarkBackground: Story = {
  render: () => (
    <div className="w-[800px] p-12 bg-[var(--color-text)] rounded-[var(--radius-xl)]">
      <LogoCloud
        logos={sampleLogos}
        heading="Powering leading brands"
        grayscale={false}
        className="[&_p]:text-white/60 [&_img]:invert"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo cloud on dark background with inverted logos.",
      },
    },
  },
}
