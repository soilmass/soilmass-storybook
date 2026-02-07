"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Marquee,
  TextMarquee,
  LogoMarquee,
  CardMarquee,
  AnnouncementTicker,
} from "@/components/ui/marquee"

const meta = {
  title: "Components/Marketing/Marquee",
  component: Marquee,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Infinite scrolling content animation. Features horizontal/vertical scrolling, configurable speed, pause on hover, and gradient fade edges.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "radio",
      options: ["left", "right", "up", "down"],
      description: "Scroll direction",
    },
    speed: {
      control: { type: "range", min: 10, max: 100 },
      description: "Speed in pixels per second",
    },
    pauseOnHover: {
      control: "boolean",
      description: "Pause on hover",
    },
    fade: {
      control: "boolean",
      description: "Show gradient fade on edges",
    },
  },
} satisfies Meta<typeof Marquee>

export default meta
type Story = StoryObj<typeof meta>

// Sample logos
const sampleLogos = [
  { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+1", alt: "Company 1" },
  { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+2", alt: "Company 2" },
  { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+3", alt: "Company 3" },
  { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+4", alt: "Company 4" },
  { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+5", alt: "Company 5" },
  { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+6", alt: "Company 6" },
]

// Simple text items
const items = ["React", "TypeScript", "Next.js", "Tailwind", "Prisma", "PostgreSQL"]

// Default marquee
export const Default: Story = {
  render: () => (
    <Marquee>
      {items.map((item) => (
        <div
          key={item}
          className="flex items-center gap-4 px-8 py-4 mx-2 rounded-[var(--radius-lg)] bg-[var(--color-surface-muted)] text-[var(--color-text)]"
        >
          <span className="font-medium">{item}</span>
        </div>
      ))}
    </Marquee>
  ),
}

// Text marquee
export const TextMarqueeExample: Story = {
  render: () => (
    <div className="space-y-8">
      <TextMarquee
        text="Breaking news: New features released today"
        size="lg"
        weight="semibold"
      />
      <TextMarquee
        text="Limited time offer • Get 50% off your first order"
        color="primary"
        weight="medium"
      />
      <TextMarquee
        text="Trusted by 10,000+ developers worldwide"
        color="muted"
        size="sm"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple scrolling text with size and color options.",
      },
    },
  },
}

// Logo marquee
export const LogoMarqueeExample: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">
          Trusted by leading companies
        </p>
        <LogoMarquee logos={sampleLogos} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">
          Full color logos (grayscale off)
        </p>
        <LogoMarquee logos={sampleLogos} grayscale={false} opacity={1} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo marquee for partner/client showcase with grayscale option.",
      },
    },
  },
}

// Card marquee
export const CardMarqueeExample: Story = {
  render: () => (
    <CardMarquee cardWidth={280}>
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-4 rounded-[var(--radius-lg)] bg-[var(--color-surface)] border border-[var(--color-border)]"
        >
          <div className="flex items-start gap-3 mb-3">
            <div className="h-10 w-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
              {["JD", "AS", "MK", "EW", "TL", "RB"][i]}
            </div>
            <div>
              <p className="font-medium text-[var(--color-text)]">
                {["John Doe", "Alice Smith", "Mike King", "Emily West", "Tom Lee", "Rose Black"][i]}
              </p>
              <p className="text-xs text-[var(--color-text-muted)]">@username</p>
            </div>
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">
            This is an amazing product! Highly recommend to everyone looking for a great solution.
          </p>
        </div>
      ))}
    </CardMarquee>
  ),
  parameters: {
    docs: {
      description: {
        story: "Card marquee for testimonials and feature showcases.",
      },
    },
  },
}

// Directions
export const Directions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Left (default)</p>
        <TextMarquee text="Scrolling left" direction="left" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Right</p>
        <TextMarquee text="Scrolling right" direction="right" />
      </div>
      <div className="h-32">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Vertical (up)</p>
        <Marquee direction="up" className="h-24">
          {items.slice(0, 4).map((item) => (
            <div key={item} className="px-4 py-2 text-[var(--color-text)]">
              {item}
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  ),
}

// Speeds
export const Speeds: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Slow (25px/s)</p>
        <TextMarquee text="Slow and steady" speed={25} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Normal (50px/s)</p>
        <TextMarquee text="Normal speed scrolling" speed={50} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Fast (100px/s)</p>
        <TextMarquee text="Fast scrolling content" speed={100} />
      </div>
    </div>
  ),
}

// Announcement ticker
export const AnnouncementTickerExample: Story = {
  render: () => (
    <div className="space-y-4">
      <AnnouncementTicker
        announcements={[
          { text: "New feature: Dark mode is now available!", badge: "New" },
          { text: "Join our webinar this Friday at 2pm", href: "#" },
          { text: "Version 2.0 released with major improvements", badge: "Update" },
        ]}
      />
      <AnnouncementTicker
        variant="primary"
        announcements={[
          { text: "Limited time offer: Get 50% off all plans", badge: "Sale" },
          { text: "Free shipping on orders over $50" },
        ]}
      />
      <AnnouncementTicker
        variant="dark"
        announcements={[
          { text: "Black Friday deals start now!", badge: "Hot" },
          { text: "Save big on premium features" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "News ticker style announcements with badges and links.",
      },
    },
  },
}

// Without fade
export const WithoutFade: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">With fade (default)</p>
        <LogoMarquee logos={sampleLogos} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Without fade</p>
        <LogoMarquee logos={sampleLogos} fade={false} />
      </div>
    </div>
  ),
}

// Landing page section
export const LandingPageSection: Story = {
  render: () => (
    <section className="py-16 bg-[var(--color-surface)]">
      <div className="text-center mb-8">
        <p className="text-sm font-medium text-[var(--color-text-muted)] uppercase tracking-wide">
          Trusted by industry leaders
        </p>
      </div>
      <LogoMarquee
        logos={[
          ...sampleLogos,
          { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+7", alt: "Company 7" },
          { src: "https://placehold.co/120x40/e2e8f0/64748b?text=Company+8", alt: "Company 8" },
        ]}
        logoHeight={40}
        gap={64}
      />
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Logo marquee section for landing pages.",
      },
    },
  },
}

// Testimonials carousel
export const TestimonialsMarquee: Story = {
  render: () => (
    <section className="py-12">
      <h2 className="text-2xl font-bold text-[var(--color-text)] text-center mb-8">
        What our customers say
      </h2>
      <CardMarquee cardWidth={320} gap={24}>
        {[
          {
            quote: "This product has transformed how we work. Incredible results!",
            author: "Sarah Johnson",
            role: "CEO at TechCorp",
          },
          {
            quote: "Best investment we've made this year. Highly recommended.",
            author: "Mike Chen",
            role: "CTO at StartupXYZ",
          },
          {
            quote: "The team loves it. Productivity is through the roof!",
            author: "Emily Davis",
            role: "VP Engineering",
          },
          {
            quote: "Simple, powerful, and exactly what we needed.",
            author: "Alex Kim",
            role: "Product Manager",
          },
        ].map((testimonial) => (
          <div
            key={testimonial.author}
            className="p-6 rounded-[var(--radius-xl)] bg-[var(--color-surface)] border border-[var(--color-border)]"
          >
            <p className="text-[var(--color-text)] mb-4">"{testimonial.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)] font-medium">
                {testimonial.author.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="font-medium text-[var(--color-text)]">{testimonial.author}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{testimonial.role}</p>
              </div>
            </div>
          </div>
        ))}
      </CardMarquee>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Testimonials in a continuous marquee.",
      },
    },
  },
}
