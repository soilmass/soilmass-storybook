"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Rating, RatingDisplay, RatingBreakdown } from "@/components/ui/rating"

const meta = {
  title: "Components/Forms/Rating",
  component: Rating,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Star rating display and input. Features read-only display, interactive selection, half-star precision, size variants, and custom colors.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    value: {
      control: { type: "range", min: 0, max: 5, step: 0.5 },
      description: "Current rating value",
    },
    max: {
      control: { type: "number", min: 1, max: 10 },
      description: "Maximum rating",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg", "xl"],
      description: "Size variant",
    },
    color: {
      control: "radio",
      options: ["default", "primary", "warning"],
      description: "Color for filled stars",
    },
    allowHalf: {
      control: "boolean",
      description: "Allow half-star ratings",
    },
    readOnly: {
      control: "boolean",
      description: "Read-only mode",
    },
    showValue: {
      control: "boolean",
      description: "Show numeric value",
    },
  },
} satisfies Meta<typeof Rating>

export default meta
type Story = StoryObj<typeof meta>

// Default (read-only display)
export const Default: Story = {
  render: () => <Rating value={3.5} readOnly />,
}

// Interactive rating
function InteractiveRating() {
  const [value, setValue] = useState(0)

  return (
    <div className="space-y-4">
      <Rating value={value} onChange={setValue} />
      <p className="text-sm text-[var(--color-text-muted)]">
        Selected: {value} star{value !== 1 ? "s" : ""}
      </p>
    </div>
  )
}

export const Interactive: Story = {
  render: () => <InteractiveRating />,
  parameters: {
    docs: {
      description: {
        story: "Interactive rating that allows users to select a value by clicking or using keyboard.",
      },
    },
  },
}

// With half stars
function HalfStarRating() {
  const [value, setValue] = useState(2.5)

  return (
    <div className="space-y-4">
      <Rating value={value} onChange={setValue} allowHalf />
      <p className="text-sm text-[var(--color-text-muted)]">
        Rating: {value}
      </p>
    </div>
  )
}

export const HalfStars: Story = {
  render: () => <HalfStarRating />,
  parameters: {
    docs: {
      description: {
        story: "Rating with half-star precision. Hover over the left or right side of a star to select half values.",
      },
    },
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-12">Small</span>
        <Rating value={4} size="sm" readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-12">Medium</span>
        <Rating value={4} size="md" readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-12">Large</span>
        <Rating value={4} size="lg" readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-12">XL</span>
        <Rating value={4} size="xl" readOnly />
      </div>
    </div>
  ),
}

// Colors
export const Colors: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Default</span>
        <Rating value={4} color="default" readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Primary</span>
        <Rating value={4} color="primary" readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">Warning</span>
        <Rating value={4} color="warning" readOnly />
      </div>
    </div>
  ),
}

// With value display
export const WithValue: Story = {
  render: () => (
    <div className="space-y-4">
      <Rating value={4.5} readOnly showValue />
      <Rating value={3.5} readOnly showValue allowHalf />
    </div>
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <Rating value={3} onChange={() => {}} disabled />
  ),
}

// Rating display with count
export const Display: Story = {
  render: () => (
    <div className="space-y-4">
      <RatingDisplay value={4.5} count={128} />
      <RatingDisplay value={3.8} count={1547} size="lg" />
      <RatingDisplay value={4.9} count={52} size="sm" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rating display with review count, commonly used for product ratings.",
      },
    },
  },
}

// Rating breakdown
export const Breakdown: Story = {
  render: () => (
    <div className="w-64">
      <RatingBreakdown
        breakdown={[85, 45, 12, 5, 3]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Rating breakdown showing distribution of ratings, useful for review summaries.",
      },
    },
  },
}

// Breakdown with counts
export const BreakdownWithCounts: Story = {
  render: () => (
    <div className="w-64">
      <RatingBreakdown
        breakdown={[85, 45, 12, 5, 3]}
        showPercentage={false}
      />
    </div>
  ),
}

// Product review summary
export const ProductReview: Story = {
  render: () => {
    const breakdown: [number, number, number, number, number] = [524, 186, 42, 15, 8]
    const total = breakdown.reduce((a, b) => a + b, 0)
    const average = (5 * breakdown[0] + 4 * breakdown[1] + 3 * breakdown[2] + 2 * breakdown[3] + 1 * breakdown[4]) / total

    return (
      <div className="w-80 p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
        <h3 className="font-medium text-[var(--color-text)] mb-4">
          Customer Reviews
        </h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[var(--color-text)]">
              {average.toFixed(1)}
            </div>
            <Rating value={average} size="sm" readOnly />
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              {total.toLocaleString()} reviews
            </div>
          </div>
          <div className="flex-1">
            <RatingBreakdown breakdown={breakdown} />
          </div>
        </div>
        <button className="w-full py-2 text-sm font-medium text-[var(--color-primary)] border border-[var(--color-primary)] rounded-[var(--radius-md)] hover:bg-[var(--color-primary)]/10">
          Write a review
        </button>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Complete product review summary with average rating and breakdown.",
      },
    },
  },
}

// Feedback form
function FeedbackForm() {
  const [ratings, setRatings] = useState({
    overall: 0,
    quality: 0,
    value: 0,
    delivery: 0,
  })

  return (
    <div className="w-72 p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <h3 className="font-medium text-[var(--color-text)] mb-4">
        Rate your experience
      </h3>
      <div className="space-y-4">
        {Object.entries(ratings).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="text-sm capitalize text-[var(--color-text)]">
              {key}
            </span>
            <Rating
              value={value}
              onChange={(v) => setRatings({ ...ratings, [key]: v })}
              size="sm"
            />
          </div>
        ))}
      </div>
      <button
        className="w-full mt-6 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-md)] hover:bg-[var(--color-primary-hover)]"
        disabled={Object.values(ratings).some((v) => v === 0)}
      >
        Submit Feedback
      </button>
    </div>
  )
}

export const FeedbackFormExample: Story = {
  render: () => <FeedbackForm />,
  parameters: {
    docs: {
      description: {
        story: "Multiple rating inputs for a detailed feedback form.",
      },
    },
  },
}

// Custom max
export const CustomMax: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">3 stars</span>
        <Rating value={2} max={3} readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">5 stars</span>
        <Rating value={4} max={5} readOnly />
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-[var(--color-text-muted)] w-20">10 stars</span>
        <Rating value={7} max={10} size="sm" readOnly />
      </div>
    </div>
  ),
}
