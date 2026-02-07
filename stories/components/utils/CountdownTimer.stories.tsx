"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CountdownTimer,
  CompactCountdown,
  EventCountdown,
} from "@/components/ui/countdown-timer"

const meta = {
  title: "Components/Utils/CountdownTimer",
  component: CountdownTimer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Timer counting down to a target date. Features days, hours, minutes, seconds display with multiple variants including cards, flip animation, and minimal styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "cards", "flip", "minimal", "large"],
      description: "Display variant",
    },
    colorScheme: {
      control: "radio",
      options: ["default", "primary", "dark"],
      description: "Color scheme",
    },
    showDays: {
      control: "boolean",
      description: "Show days",
    },
    showHours: {
      control: "boolean",
      description: "Show hours",
    },
    showMinutes: {
      control: "boolean",
      description: "Show minutes",
    },
    showSeconds: {
      control: "boolean",
      description: "Show seconds",
    },
  },
} satisfies Meta<typeof CountdownTimer>

export default meta
type Story = StoryObj<typeof meta>

// Helper to create target date
const getTargetDate = (hours = 25) => {
  const date = new Date()
  date.setHours(date.getHours() + hours)
  return date
}

// Default
export const Default: Story = {
  render: () => <CountdownTimer targetDate={getTargetDate()} />,
}

// Cards variant
export const Cards: Story = {
  render: () => (
    <CountdownTimer
      targetDate={getTargetDate()}
      variant="cards"
    />
  ),
}

// Flip variant
export const Flip: Story = {
  render: () => (
    <CountdownTimer
      targetDate={getTargetDate()}
      variant="flip"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Flip animation variant (animation may require additional CSS keyframes).",
      },
    },
  },
}

// Minimal variant
export const Minimal: Story = {
  render: () => (
    <div className="space-y-4">
      <CountdownTimer targetDate={getTargetDate()} variant="minimal" />
      <CountdownTimer targetDate={getTargetDate()} variant="minimal" separator=" : " />
    </div>
  ),
}

// Large variant
export const Large: Story = {
  render: () => (
    <CountdownTimer
      targetDate={getTargetDate()}
      variant="large"
    />
  ),
}

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">Default</p>
        <CountdownTimer targetDate={getTargetDate()} variant="default" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">Cards</p>
        <CountdownTimer targetDate={getTargetDate()} variant="cards" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">Minimal</p>
        <CountdownTimer targetDate={getTargetDate()} variant="minimal" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">Large</p>
        <CountdownTimer targetDate={getTargetDate()} variant="large" />
      </div>
    </div>
  ),
}

// Color schemes
export const ColorSchemes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Default</p>
        <CountdownTimer targetDate={getTargetDate()} variant="cards" colorScheme="default" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Primary</p>
        <CountdownTimer targetDate={getTargetDate()} variant="cards" colorScheme="primary" />
      </div>
      <div className="p-6 bg-[var(--color-surface-inverse)] rounded-[var(--radius-lg)]">
        <p className="text-sm text-white/60 mb-4">Dark</p>
        <CountdownTimer targetDate={getTargetDate()} variant="cards" colorScheme="dark" />
      </div>
    </div>
  ),
}

// Custom labels
export const CustomLabels: Story = {
  render: () => (
    <CountdownTimer
      targetDate={getTargetDate()}
      labels={{
        days: "D",
        hours: "H",
        minutes: "M",
        seconds: "S",
      }}
    />
  ),
}

// Without days
export const WithoutDays: Story = {
  render: () => (
    <CountdownTimer
      targetDate={getTargetDate(2)}
      showDays={false}
    />
  ),
}

// Only hours and minutes
export const HoursMinutesOnly: Story = {
  render: () => (
    <CountdownTimer
      targetDate={getTargetDate(2)}
      showDays={false}
      showSeconds={false}
    />
  ),
}

// Compact countdown
export const Compact: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-[var(--color-text)]">
        Sale ends in <CompactCountdown targetDate={getTargetDate()} className="text-[var(--color-primary)]" />
      </p>
      <p className="text-[var(--color-text)]">
        Time remaining: <CompactCountdown targetDate={getTargetDate()} showLabels={false} />
      </p>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Compact inline countdown for use within text.",
      },
    },
  },
}

// Event countdown
export const Event: Story = {
  render: () => (
    <div className="w-[500px]">
      <EventCountdown
        title="Product Launch"
        description="Join us for the unveiling of our newest product"
        targetDate={getTargetDate(72)}
        onComplete={() => console.log("Event started!")}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete event countdown component with title and description.",
      },
    },
  },
}

// Event countdown variants
export const EventVariants: Story = {
  render: () => (
    <div className="w-[600px] space-y-8">
      <EventCountdown
        title="Conference 2024"
        description="The biggest tech conference of the year"
        targetDate={getTargetDate(168)}
        variant="default"
      />
      <EventCountdown
        title="Black Friday Sale"
        description="Don't miss our biggest sale"
        targetDate={getTargetDate(48)}
        variant="cards"
      />
    </div>
  ),
}

// Landing page usage
export const LandingPage: Story = {
  render: () => (
    <section className="w-[800px] py-16 text-center bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-[var(--radius-xl)]">
      <p className="text-sm text-white/80 uppercase tracking-wider mb-2">Coming Soon</p>
      <h2 className="text-3xl font-bold text-white mb-8">Something Amazing</h2>
      <CountdownTimer
        targetDate={getTargetDate(168)}
        variant="cards"
        colorScheme="dark"
      />
      <div className="mt-8">
        <input
          type="email"
          placeholder="Enter your email"
          className="px-4 py-2 rounded-l-[var(--radius-md)] border-none text-[var(--color-text)]"
        />
        <button className="px-4 py-2 bg-white text-[var(--color-primary)] font-medium rounded-r-[var(--radius-md)]">
          Notify Me
        </button>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Countdown timer in a coming soon landing page.",
      },
    },
  },
}

// Flash sale banner
export const FlashSale: Story = {
  render: () => (
    <div className="w-[600px] p-4 bg-[var(--color-error)] rounded-[var(--radius-lg)] flex items-center justify-between">
      <div className="text-white">
        <p className="text-sm font-medium">FLASH SALE</p>
        <p className="text-lg font-bold">50% OFF Everything</p>
      </div>
      <div className="text-white text-center">
        <p className="text-xs mb-1">Ends in</p>
        <CountdownTimer
          targetDate={getTargetDate(3)}
          variant="minimal"
          showDays={false}
          colorScheme="dark"
          separator=" : "
        />
      </div>
      <button className="px-4 py-2 bg-white text-[var(--color-error)] font-medium rounded-[var(--radius-md)]">
        Shop Now
      </button>
    </div>
  ),
}

// Completed state
export const Completed: Story = {
  render: () => (
    <CountdownTimer
      targetDate={new Date(Date.now() - 1000)}
      completedMessage="The event has started!"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Display when countdown reaches zero.",
      },
    },
  },
}

// With callback
export const WithCallback: Story = {
  render: () => (
    <CountdownTimer
      targetDate={new Date(Date.now() + 5000)}
      onComplete={() => alert("Time is up!")}
      variant="cards"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Wait 5 seconds to see the onComplete callback in action.",
      },
    },
  },
}
