"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Typewriter,
  TypewriterHighlight,
  HeroTypewriter,
  TypingIndicator,
  CodeTypewriter,
} from "@/components/ui/typewriter"

const meta = {
  title: "Components/Utils/Typewriter",
  component: Typewriter,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Animated typing effect for text. Features configurable typing speed, multiple strings with loop, delete animation, and blinking cursor.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    speed: {
      control: { type: "number", min: 10, max: 200 },
      description: "Typing speed in ms per character",
    },
    deleteSpeed: {
      control: { type: "number", min: 10, max: 100 },
      description: "Delete speed in ms per character",
    },
    loop: {
      control: "boolean",
      description: "Loop through strings continuously",
    },
    cursor: {
      control: "boolean",
      description: "Show cursor",
    },
  },
} satisfies Meta<typeof Typewriter>

export default meta
type Story = StoryObj<typeof meta>

// Default single string
export const Default: Story = {
  render: () => (
    <div className="text-2xl font-medium text-[var(--color-text)]">
      <Typewriter text="Hello, World!" />
    </div>
  ),
}

// Multiple strings
export const MultipleStrings: Story = {
  render: () => (
    <div className="text-2xl font-medium text-[var(--color-text)]">
      <Typewriter
        text={["Developer", "Designer", "Creator", "Builder"]}
        pauseDelay={2000}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Cycle through multiple strings with delete and retype animation.",
      },
    },
  },
}

// Different speeds
export const Speeds: Story = {
  render: () => (
    <div className="space-y-6 text-xl text-[var(--color-text)]">
      <div>
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Fast:</span>
        <Typewriter text="This is fast typing" speed={30} />
      </div>
      <div>
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Medium:</span>
        <Typewriter text="This is medium typing" speed={80} />
      </div>
      <div>
        <span className="text-sm text-[var(--color-text-muted)] mr-2">Slow:</span>
        <Typewriter text="This is slow typing" speed={150} />
      </div>
    </div>
  ),
}

// Custom cursor
export const CustomCursor: Story = {
  render: () => (
    <div className="space-y-4 text-xl text-[var(--color-text)]">
      <div><Typewriter text="Default cursor |" /></div>
      <div><Typewriter text="Underscore cursor" cursorChar="_" /></div>
      <div><Typewriter text="Block cursor" cursorChar="█" /></div>
      <div><Typewriter text="No cursor" cursor={false} /></div>
    </div>
  ),
}

// Without delete
export const WithoutDelete: Story = {
  render: () => (
    <div className="text-xl text-[var(--color-text)]">
      <Typewriter
        text={["First text", "Second text", "Third text"]}
        deleteOnChange={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Switch between strings without delete animation.",
      },
    },
  },
}

// Highlighted typewriter
export const Highlighted: Story = {
  render: () => (
    <div className="text-2xl font-medium text-[var(--color-text)]">
      <TypewriterHighlight
        prefix="We build"
        text={["websites", "apps", "products", "experiences"]}
        highlightColor="primary"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Typewriter with highlighted rotating text.",
      },
    },
  },
}

// Gradient highlight
export const GradientHighlight: Story = {
  render: () => (
    <div className="text-2xl font-medium text-[var(--color-text)]">
      <TypewriterHighlight
        prefix="Make it"
        text={["beautiful", "powerful", "seamless"]}
        highlightColor="gradient"
      />
    </div>
  ),
}

// Hero typewriter
export const Hero: Story = {
  render: () => (
    <HeroTypewriter
      prefix="Build"
      rotatingText={["websites", "applications", "products", "dreams"]}
      suffix="faster"
      highlight="primary"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Large typewriter for hero sections.",
      },
    },
  },
}

// Hero variants
export const HeroVariants: Story = {
  render: () => (
    <div className="space-y-12">
      <HeroTypewriter
        prefix="Create"
        rotatingText={["amazing", "powerful", "beautiful"]}
        suffix="experiences"
        highlight="primary"
        as="h2"
      />
      <HeroTypewriter
        prefix="Design"
        rotatingText={["faster", "smarter", "better"]}
        highlight="gradient"
        as="h2"
      />
      <HeroTypewriter
        rotatingText={["Innovation", "Excellence", "Quality"]}
        suffix="starts here"
        highlight="underline"
        as="h2"
      />
    </div>
  ),
}

// Typing indicator
export const TypingIndicatorDemo: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--color-text-muted)]">Default:</span>
        <TypingIndicator />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--color-text-muted)]">Primary:</span>
        <TypingIndicator color="primary" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-[var(--color-text-muted)]">Sizes:</span>
        <TypingIndicator size="sm" />
        <TypingIndicator size="md" />
        <TypingIndicator size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Chat-style typing indicator with bouncing dots.",
      },
    },
  },
}

// Chat message context
export const ChatContext: Story = {
  render: () => (
    <div className="w-80 p-4 bg-[var(--color-surface-muted)] rounded-[var(--radius-lg)]">
      <div className="space-y-3">
        <div className="flex justify-end">
          <div className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] rounded-tr-none">
            Hello, how can I help?
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="h-8 w-8 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center">
            AI
          </div>
          <div className="px-4 py-2 bg-[var(--color-surface)] rounded-[var(--radius-lg)] rounded-tl-none">
            <TypingIndicator size="sm" />
          </div>
        </div>
      </div>
    </div>
  ),
}

// Code typewriter
export const CodeDemo: Story = {
  render: () => (
    <div className="w-[500px]">
      <CodeTypewriter
        lines={[
          "npm install @acme/design-system",
          "cd my-project",
          "npm run dev",
        ]}
        speed={40}
        lineDelay={800}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Terminal-style typewriter for code examples.",
      },
    },
  },
}

// Code with line numbers
export const CodeWithLineNumbers: Story = {
  render: () => (
    <div className="w-[600px]">
      <CodeTypewriter
        lines={[
          "const greeting = 'Hello, World!';",
          "console.log(greeting);",
          "process.exit(0);",
        ]}
        showLineNumbers
        prompt=">"
      />
    </div>
  ),
}

// Landing page hero
export const LandingPageHero: Story = {
  render: () => (
    <div className="w-[800px] text-center py-16 px-8 bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 rounded-[var(--radius-xl)]">
      <p className="text-sm text-[var(--color-primary)] font-medium mb-4">
        Welcome to the future
      </p>
      <HeroTypewriter
        prefix="Build"
        rotatingText={["products", "experiences", "applications", "communities"]}
        suffix="that matter"
        highlight="gradient"
      />
      <p className="mt-6 text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto">
        The modern platform for developers to create, deploy, and scale applications.
      </p>
    </div>
  ),
}

// With callback
export const WithCallback: Story = {
  render: () => (
    <div className="text-xl text-[var(--color-text)]">
      <Typewriter
        text={["First", "Second", "Third"]}
        onComplete={() => console.log("All strings typed!")}
        onStringTyped={(index) => console.log(`String ${index} typed`)}
        loop={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Check console for callback events.",
      },
    },
  },
}
