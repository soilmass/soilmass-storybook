import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BentoGrid,
  BentoItem,
  FeatureBento,
  BentoImageCard,
  BentoStatsCard,
  AnimatedBentoItem,
  BentoLayout,
} from "@/components/ui/bento-grid"

const meta = {
  title: "Components/DataDisplay/BentoGrid",
  component: BentoGrid,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Flexible bento box grid layouts. Features variable cell sizes, responsive layouts, animation on scroll, and glassmorphism support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    columns: {
      control: "radio",
      options: [2, 3, 4],
      description: "Number of columns",
    },
    gap: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Gap between items",
    },
  },
} satisfies Meta<typeof BentoGrid>

export default meta
type Story = StoryObj<typeof meta>

// Icons
const SparkleIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
)

const BoltIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const ShieldIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const ChartIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const CodeIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

// Default grid
export const Default: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <BentoItem
        icon={<SparkleIcon />}
        title="AI-Powered"
        description="Leverage cutting-edge AI to automate your workflow and boost productivity."
      />
      <BentoItem
        icon={<BoltIcon />}
        title="Lightning Fast"
        description="Built for performance with sub-millisecond response times."
      />
      <BentoItem
        icon={<ShieldIcon />}
        title="Enterprise Security"
        description="Bank-grade encryption and security compliance built in."
      />
      <BentoItem
        icon={<ChartIcon />}
        title="Analytics"
        description="Deep insights into your data with powerful analytics tools."
      />
      <BentoItem
        icon={<CodeIcon />}
        title="Developer First"
        description="Built by developers, for developers. Extensive API and documentation."
      />
    </BentoGrid>
  ),
}

// With spans
export const WithSpans: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <BentoItem
        colSpan={2}
        rowSpan={2}
        icon={<SparkleIcon />}
        title="Featured Item"
        description="This item spans 2 columns and 2 rows, making it the hero of the grid."
        variant="gradient"
        featured
      />
      <BentoItem
        icon={<BoltIcon />}
        title="Fast"
        description="Quick and efficient."
      />
      <BentoItem
        icon={<ShieldIcon />}
        title="Secure"
        description="Enterprise-grade security."
      />
      <BentoItem
        colSpan={2}
        icon={<ChartIcon />}
        title="Analytics Dashboard"
        description="Comprehensive analytics spanning multiple categories."
      />
      <BentoItem
        icon={<CodeIcon />}
        title="API Access"
        description="Full API documentation."
      />
    </BentoGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: "Bento grid with items spanning multiple columns and rows.",
      },
    },
  },
}

// Variants
export const Variants: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <BentoItem
        title="Default"
        description="Standard background with border."
        variant="default"
      />
      <BentoItem
        title="Muted"
        description="Muted background variant."
        variant="muted"
      />
      <BentoItem
        title="Glass"
        description="Glassmorphism effect."
        variant="glass"
      />
      <BentoItem
        title="Gradient"
        description="Gradient background."
        variant="gradient"
      />
      <BentoItem
        title="Primary"
        description="Primary color background."
        variant="primary"
      />
      <BentoItem
        title="Dark"
        description="Dark background."
        variant="dark"
      />
    </BentoGrid>
  ),
}

// With background images
export const WithBackgroundImages: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <BentoItem
        colSpan={2}
        rowSpan={2}
        title="Mountain Retreat"
        description="Escape to the peaks and find your peace."
        backgroundImage="https://placehold.co/800x600/1e293b/475569?text=Mountains"
      />
      <BentoItem
        title="Ocean Views"
        description="Endless horizons await."
        backgroundImage="https://placehold.co/400x300/1e293b/475569?text=Ocean"
      />
      <BentoItem
        title="City Lights"
        description="Urban adventures."
        backgroundImage="https://placehold.co/400x300/1e293b/475569?text=City"
      />
    </BentoGrid>
  ),
}

// Feature bento
export const FeatureBentoExample: Story = {
  render: () => (
    <FeatureBento
      features={[
        {
          icon: <SparkleIcon />,
          title: "AI Integration",
          description: "Seamlessly integrate AI into your workflow.",
          colSpan: 2,
        },
        {
          icon: <BoltIcon />,
          title: "Performance",
          description: "Optimized for speed.",
        },
        {
          icon: <ShieldIcon />,
          title: "Security",
          description: "Enterprise-grade protection.",
        },
        {
          icon: <ChartIcon />,
          title: "Analytics",
          description: "Deep insights into your data.",
          colSpan: 2,
        },
      ]}
      columns={3}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Feature showcase using the FeatureBento helper.",
      },
    },
  },
}

// Image card
export const ImageCards: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <BentoImageCard
        image="https://placehold.co/800x400/e2e8f0/64748b?text=Product"
        imagePosition="top"
        title="Product Feature"
        description="Discover our latest innovation."
      />
      <BentoImageCard
        image="https://placehold.co/800x400/e2e8f0/64748b?text=Service"
        imagePosition="top"
        icon={<BoltIcon />}
        title="Fast Delivery"
        description="Get your orders in record time."
      />
      <BentoImageCard
        image="https://placehold.co/800x600/1e293b/475569?text=Background"
        imagePosition="background"
        title="Background Style"
        description="Image as background with overlay."
      />
    </BentoGrid>
  ),
}

// Stats card
export const StatsCards: Story = {
  render: () => (
    <BentoGrid columns={2}>
      <BentoStatsCard
        title="Performance Metrics"
        stats={[
          { value: "99.9%", label: "Uptime" },
          { value: "50ms", label: "Latency" },
          { value: "10M+", label: "Requests" },
          { value: "24/7", label: "Support" },
        ]}
        layout="grid"
      />
      <BentoStatsCard
        title="Growth Stats"
        variant="gradient"
        stats={[
          { value: "250%", label: "Revenue" },
          { value: "500+", label: "Clients" },
        ]}
        layout="horizontal"
      />
    </BentoGrid>
  ),
}

// Animated items
export const Animated: Story = {
  render: () => (
    <BentoGrid columns={3}>
      <AnimatedBentoItem
        hoverEffect="lift"
        icon={<SparkleIcon />}
        title="Lift Effect"
        description="Hover to lift."
      />
      <AnimatedBentoItem
        hoverEffect="scale"
        icon={<BoltIcon />}
        title="Scale Effect"
        description="Hover to scale."
      />
      <AnimatedBentoItem
        hoverEffect="glow"
        icon={<ShieldIcon />}
        title="Glow Effect"
        description="Hover to glow."
      />
      <AnimatedBentoItem
        hoverEffect="border"
        icon={<ChartIcon />}
        title="Border Effect"
        description="Hover for border."
      />
    </BentoGrid>
  ),
  parameters: {
    docs: {
      description: {
        story: "Animated bento items with different hover effects.",
      },
    },
  },
}

// Layout presets
export const LayoutPresets: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Hero Left Layout</p>
        <BentoLayout
          layout="hero-left"
          items={[
            { icon: <SparkleIcon />, title: "Main Feature", description: "The hero item on the left." },
            { icon: <BoltIcon />, title: "Fast", description: "Quick and efficient." },
            { icon: <ShieldIcon />, title: "Secure", description: "Protected." },
            { icon: <ChartIcon />, title: "Analytics", description: "Insights." },
            { icon: <CodeIcon />, title: "Developer", description: "For devs." },
          ]}
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Balanced Layout</p>
        <BentoLayout
          layout="balanced"
          items={[
            { icon: <SparkleIcon />, title: "First", description: "Description here." },
            { icon: <BoltIcon />, title: "Second (wide)", description: "Spans two columns." },
            { icon: <ShieldIcon />, title: "Third (wide)", description: "Also spans two." },
            { icon: <ChartIcon />, title: "Fourth", description: "Back to normal." },
          ]}
        />
      </div>
    </div>
  ),
}

// Landing page section
export const LandingPageSection: Story = {
  render: () => (
    <section className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[var(--color-text)] mb-4">
          Why Choose Us
        </h2>
        <p className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
          Discover the features that set us apart from the competition.
        </p>
      </div>
      <BentoGrid columns={3} gap="lg">
        <BentoItem
          colSpan={2}
          rowSpan={2}
          variant="gradient"
          icon={<SparkleIcon />}
          title="AI-Powered Platform"
          description="Our cutting-edge AI technology helps you automate repetitive tasks, make smarter decisions, and scale your business faster than ever before."
          featured
        />
        <BentoItem
          icon={<BoltIcon />}
          title="Lightning Fast"
          description="Sub-millisecond response times."
          variant="muted"
        />
        <BentoItem
          icon={<ShieldIcon />}
          title="Enterprise Security"
          description="SOC 2 Type II certified."
          variant="muted"
        />
        <BentoItem
          colSpan={2}
          icon={<ChartIcon />}
          title="Comprehensive Analytics"
          description="Get deep insights into every aspect of your business with our powerful analytics dashboard."
        />
        <BentoItem
          icon={<CodeIcon />}
          title="Developer API"
          description="Full REST and GraphQL APIs."
        />
      </BentoGrid>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete bento grid section for a landing page.",
      },
    },
  },
}
