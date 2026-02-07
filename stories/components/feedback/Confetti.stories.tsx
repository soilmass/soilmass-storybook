"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  Confetti,
  ConfettiButton,
  Celebration,
  EmojiRain,
  useConfetti,
} from "@/components/ui/confetti"

const meta = {
  title: "Components/Feedback/Confetti",
  component: Confetti,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Celebration confetti animation. Features customizable colors and shapes, multiple trigger modes, canvas-based performance, gravity physics, and burst/continuous modes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    particleCount: {
      control: { type: "range", min: 20, max: 200 },
      description: "Number of particles",
    },
    spread: {
      control: { type: "range", min: 20, max: 180 },
      description: "Spread angle in degrees",
    },
    velocity: {
      control: { type: "range", min: 10, max: 60 },
      description: "Initial velocity",
    },
    gravity: {
      control: { type: "range", min: 0.1, max: 2, step: 0.1 },
      description: "Gravity strength",
    },
    duration: {
      control: { type: "range", min: 1000, max: 10000 },
      description: "Duration in ms",
    },
  },
} satisfies Meta<typeof Confetti>

export default meta
type Story = StoryObj<typeof meta>

// Confetti button
export const Default: Story = {
  render: () => (
    <ConfettiButton variant="primary">
      Click for Confetti!
    </ConfettiButton>
  ),
}

// Button variants
export const ButtonVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <ConfettiButton variant="primary">Primary</ConfettiButton>
      <ConfettiButton variant="default">Default</ConfettiButton>
      <ConfettiButton variant="outline">Outline</ConfettiButton>
    </div>
  ),
}

// Custom colors
export const CustomColors: Story = {
  render: () => (
    <div className="flex gap-4">
      <ConfettiButton
        confettiColors={["#ff577f", "#ff884b", "#ffd384"]}
        variant="primary"
      >
        Warm Colors
      </ConfettiButton>
      <ConfettiButton
        confettiColors={["#3498db", "#2ecc71", "#00dfd8"]}
        variant="primary"
      >
        Cool Colors
      </ConfettiButton>
      <ConfettiButton
        confettiColors={["#ff0080", "#7928ca", "#9b59b6"]}
        variant="primary"
      >
        Pink/Purple
      </ConfettiButton>
    </div>
  ),
}

// Particle count
export const ParticleCounts: Story = {
  render: () => (
    <div className="flex gap-4">
      <ConfettiButton particleCount={20}>Few (20)</ConfettiButton>
      <ConfettiButton particleCount={50}>Medium (50)</ConfettiButton>
      <ConfettiButton particleCount={100}>Many (100)</ConfettiButton>
    </div>
  ),
}

// Spread angles
export const SpreadAngles: Story = {
  render: () => (
    <div className="flex gap-4">
      <ConfettiButton spread={30}>Narrow (30°)</ConfettiButton>
      <ConfettiButton spread={60}>Medium (60°)</ConfettiButton>
      <ConfettiButton spread={120}>Wide (120°)</ConfettiButton>
    </div>
  ),
}

// Hook usage
function ConfettiHookDemo() {
  const { fire, ConfettiComponent } = useConfetti()

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => fire({ originX: 0.5, originY: 0.5 })}
          className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)]"
        >
          Center Burst
        </button>
        <button
          type="button"
          onClick={() => fire({ originX: 0, originY: 0.5, spread: 45 })}
          className="px-4 py-2 bg-[var(--color-secondary)] text-white rounded-[var(--radius-lg)]"
        >
          Left Burst
        </button>
        <button
          type="button"
          onClick={() => fire({ originX: 1, originY: 0.5, spread: 45 })}
          className="px-4 py-2 bg-[var(--color-success)] text-white rounded-[var(--radius-lg)]"
        >
          Right Burst
        </button>
      </div>
      <ConfettiComponent />
    </div>
  )
}

export const UseConfettiHook: Story = {
  render: () => <ConfettiHookDemo />,
  parameters: {
    docs: {
      description: {
        story: "Using the useConfetti hook for programmatic confetti triggers.",
      },
    },
  },
}

// Celebration overlay
function CelebrationDemo() {
  const [show, setShow] = React.useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setShow(true)}
        className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium"
      >
        Show Celebration
      </button>
      <Celebration
        active={show}
        message="Congratulations!"
        subMessage="You've completed your first milestone"
        onClose={() => setShow(false)}
      />
    </div>
  )
}

export const CelebrationOverlay: Story = {
  render: () => <CelebrationDemo />,
  parameters: {
    docs: {
      description: {
        story: "Full-screen celebration overlay with confetti and message.",
      },
    },
  },
}

// Emoji rain
function EmojiRainDemo() {
  const [active, setActive] = React.useState(false)

  return (
    <div>
      <button
        type="button"
        onClick={() => setActive(true)}
        className="px-6 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium"
      >
        Start Emoji Rain
      </button>
      <EmojiRain
        active={active}
        duration={4000}
        emojis={["🎉", "🎊", "✨", "⭐", "🌟", "💫"]}
      />
      {active && (
        <p className="mt-4 text-sm text-[var(--color-text-muted)]">
          Raining for 4 seconds...
        </p>
      )}
    </div>
  )
}

export const EmojiRainExample: Story = {
  render: () => <EmojiRainDemo />,
  parameters: {
    docs: {
      description: {
        story: "Emoji rain variation with falling emojis.",
      },
    },
  },
}

// Different emoji sets
function CustomEmojiRain() {
  const [active, setActive] = React.useState(false)
  const [emojis, setEmojis] = React.useState(["🎉", "🎊", "✨"])

  const emojiSets = {
    celebration: ["🎉", "🎊", "✨", "⭐"],
    hearts: ["❤️", "💕", "💖", "💗", "💓"],
    nature: ["🌸", "🌺", "🌻", "🌷", "🌹"],
    food: ["🍕", "🍔", "🌮", "🍣", "🍩"],
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {Object.entries(emojiSets).map(([name, set]) => (
          <button
            key={name}
            type="button"
            onClick={() => {
              setEmojis(set)
              setActive(true)
              setTimeout(() => setActive(false), 3000)
            }}
            className="px-4 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] capitalize hover:bg-[var(--color-surface-hover)]"
          >
            {name}
          </button>
        ))}
      </div>
      <EmojiRain active={active} emojis={emojis} duration={3000} />
    </div>
  )
}

export const CustomEmojis: Story = {
  render: () => <CustomEmojiRain />,
}

// Success completion
function SuccessCompletion() {
  const [completed, setCompleted] = React.useState(false)
  const { fire, ConfettiComponent } = useConfetti()

  const handleComplete = () => {
    setCompleted(true)
    fire({
      particleCount: 150,
      spread: 70,
      originY: 0.6,
    })
  }

  return (
    <div className="w-[400px] p-8 border border-[var(--color-border)] rounded-[var(--radius-xl)]">
      {!completed ? (
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center text-[var(--color-success)]">
                ✓
              </div>
              <span className="text-[var(--color-text)]">Step 1: Account created</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[var(--color-success)]/20 flex items-center justify-center text-[var(--color-success)]">
                ✓
              </div>
              <span className="text-[var(--color-text)]">Step 2: Profile setup</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center text-[var(--color-primary)]">
                3
              </div>
              <span className="text-[var(--color-text)]">Step 3: Complete onboarding</span>
            </div>
          </div>
          <button
            type="button"
            onClick={handleComplete}
            className="w-full px-4 py-3 bg-[var(--color-primary)] text-white rounded-[var(--radius-lg)] font-medium"
          >
            Complete Setup
          </button>
        </div>
      ) : (
        <div className="text-center space-y-4">
          <div className="text-5xl">🎉</div>
          <h2 className="text-xl font-bold text-[var(--color-text)]">
            All Done!
          </h2>
          <p className="text-[var(--color-text-muted)]">
            Your account is ready to go.
          </p>
        </div>
      )}
      <ConfettiComponent />
    </div>
  )
}

export const SuccessCompletionContext: Story = {
  render: () => <SuccessCompletion />,
  parameters: {
    docs: {
      description: {
        story: "Confetti on completing an onboarding flow.",
      },
    },
  },
}

// Game winner celebration
function GameWinner() {
  const [winner, setWinner] = React.useState<string | null>(null)
  const { fire, ConfettiComponent } = useConfetti()

  const announceWinner = (name: string) => {
    setWinner(name)
    fire({
      particleCount: 200,
      spread: 90,
      colors: ["#ffd700", "#ff6b6b", "#48dbfb"],
    })
  }

  return (
    <div className="w-[300px] p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-xl)]">
      {!winner ? (
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-[var(--color-text)] text-center">
            Pick a Winner
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {["Alice", "Bob", "Carol", "Dave"].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => announceWinner(name)}
                className="px-4 py-2 bg-[var(--color-surface-muted)] rounded-[var(--radius-md)] hover:bg-[var(--color-surface-hover)]"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center space-y-2">
          <div className="text-4xl">🏆</div>
          <h3 className="text-xl font-bold text-[var(--color-text)]">
            {winner} Wins!
          </h3>
          <button
            type="button"
            onClick={() => setWinner(null)}
            className="text-sm text-[var(--color-primary)]"
          >
            Play Again
          </button>
        </div>
      )}
      <ConfettiComponent />
    </div>
  )
}

export const GameWinnerContext: Story = {
  render: () => <GameWinner />,
  parameters: {
    docs: {
      description: {
        story: "Confetti for game or contest winner announcements.",
      },
    },
  },
}
