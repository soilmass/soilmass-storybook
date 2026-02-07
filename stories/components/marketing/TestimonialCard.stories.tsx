import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  TestimonialCard,
  TestimonialGrid,
  FeaturedTestimonial,
  SimpleQuote,
} from "@/components/ui/testimonial-card"

const meta = {
  title: "Components/Marketing/TestimonialCard",
  component: TestimonialCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display customer testimonials with quote, author info, avatar, and optional rating. Multiple variants and sizes available.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "bordered", "filled", "minimal"],
      description: "Card variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showQuoteIcon: {
      control: "boolean",
      description: "Show quote icon",
    },
  },
} satisfies Meta<typeof TestimonialCard>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <div className="w-96">
      <TestimonialCard
        quote="This product has completely transformed how our team works. The efficiency gains have been remarkable."
        author="Sarah Johnson"
        title="VP of Engineering"
        company="TechCorp"
      />
    </div>
  ),
}

// With avatar
export const WithAvatar: Story = {
  render: () => (
    <div className="w-96">
      <TestimonialCard
        quote="Incredible experience from start to finish. The support team went above and beyond."
        author="Michael Chen"
        title="Product Manager"
        company="StartupXYZ"
        avatar="https://i.pravatar.cc/150?u=michael"
      />
    </div>
  ),
}

// With rating
export const WithRating: Story = {
  render: () => (
    <div className="w-96">
      <TestimonialCard
        quote="Five stars isn't enough! This is exactly what we've been looking for."
        author="Emily Rodriguez"
        title="CEO"
        company="InnovateCo"
        rating={5}
      />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[800px]">
      <TestimonialCard
        quote="Default variant with border and shadow."
        author="John Doe"
        title="Designer"
        variant="default"
      />
      <TestimonialCard
        quote="Bordered variant with thicker border."
        author="Jane Smith"
        title="Developer"
        variant="bordered"
      />
      <TestimonialCard
        quote="Filled variant with muted background."
        author="Bob Wilson"
        title="Manager"
        variant="filled"
      />
      <TestimonialCard
        quote="Minimal variant without background."
        author="Alice Brown"
        title="Director"
        variant="minimal"
      />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-[500px]">
      <TestimonialCard
        quote="Small size testimonial card."
        author="Sarah J."
        title="Manager"
        size="sm"
      />
      <TestimonialCard
        quote="Medium size testimonial card (default)."
        author="Michael C."
        title="Director"
        size="md"
      />
      <TestimonialCard
        quote="Large size testimonial card for prominent displays."
        author="Emily R."
        title="CEO"
        size="lg"
      />
    </div>
  ),
}

// Without quote icon
export const WithoutQuoteIcon: Story = {
  render: () => (
    <div className="w-96">
      <TestimonialCard
        quote="Clean design without the decorative quote icon."
        author="David Kim"
        title="CTO"
        company="TechStart"
        showQuoteIcon={false}
      />
    </div>
  ),
}

// With company logo
export const WithCompanyLogo: Story = {
  render: () => (
    <div className="w-[400px]">
      <TestimonialCard
        quote="Working with this team has been a game-changer for our business."
        author="Jennifer Lee"
        title="Head of Growth"
        company="GrowthCo"
        companyLogo="https://placehold.co/80x32/000000/FFFFFF?text=Logo"
      />
    </div>
  ),
}

// Testimonial grid
export const Grid: Story = {
  render: () => {
    const testimonials = [
      {
        quote: "The best investment we've made this year. ROI was visible within the first month.",
        author: "Sarah Johnson",
        title: "CEO",
        company: "TechCorp",
        rating: 5,
      },
      {
        quote: "Incredible product and even better support. They really care about their customers.",
        author: "Michael Chen",
        title: "CTO",
        company: "StartupXYZ",
        rating: 5,
      },
      {
        quote: "Easy to use, powerful features, and the team is constantly improving it.",
        author: "Emily Rodriguez",
        title: "VP Engineering",
        company: "InnovateCo",
        rating: 5,
      },
    ]

    return (
      <div className="w-[900px]">
        <TestimonialGrid columns={3}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
              variant="filled"
            />
          ))}
        </TestimonialGrid>
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Responsive grid layout for multiple testimonials.",
      },
    },
  },
}

// Featured testimonial
export const Featured: Story = {
  render: () => (
    <div className="w-[700px]">
      <FeaturedTestimonial
        quote="This platform has revolutionized how we approach product development. The insights we've gained have been invaluable, and the support team is always there when we need them."
        author="Alexandra Thompson"
        title="Chief Product Officer"
        company="Enterprise Inc"
        avatar="https://i.pravatar.cc/150?u=alexandra"
        rating={5}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Large, centered testimonial for hero sections.",
      },
    },
  },
}

// Simple quote
export const SimpleQuoteVariant: Story = {
  render: () => (
    <div className="w-[500px] space-y-6">
      <SimpleQuote
        quote="The best tool we've ever used for project management."
        attribution="John Doe, TechCorp"
      />
      <SimpleQuote
        quote="Simple, elegant, and incredibly powerful."
        attribution="Jane Smith"
      />
      <SimpleQuote
        quote="Changed the way our team collaborates."
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Minimal quote variant with left border accent.",
      },
    },
  },
}

// Testimonial section
export const TestimonialSection: Story = {
  render: () => {
    const testimonials = [
      {
        quote: "Absolutely transformative for our workflow. We've cut our development time in half.",
        author: "Sarah Johnson",
        title: "VP Engineering",
        company: "TechCorp",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        rating: 5,
      },
      {
        quote: "The analytics features alone are worth the price. We've gained insights we never had before.",
        author: "Michael Chen",
        title: "Data Lead",
        company: "DataFlow",
        avatar: "https://i.pravatar.cc/150?u=michael2",
        rating: 5,
      },
      {
        quote: "Support is incredible. They helped us migrate our entire system in just two days.",
        author: "Emily Rodriguez",
        title: "CTO",
        company: "StartupCo",
        avatar: "https://i.pravatar.cc/150?u=emily",
        rating: 5,
      },
    ]

    return (
      <section className="py-16 w-[1000px]">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            Loved by teams worldwide
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            See what our customers have to say about their experience.
          </p>
        </div>
        <TestimonialGrid columns={3}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              {...testimonial}
            />
          ))}
        </TestimonialGrid>
      </section>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Complete testimonial section with heading and grid.",
      },
    },
  },
}

// Auto-generated avatar colors
export const GeneratedAvatars: Story = {
  render: () => {
    const testimonials = [
      { quote: "Amazing product!", author: "John Doe", title: "CEO" },
      { quote: "Highly recommended!", author: "Jane Smith", title: "CTO" },
      { quote: "Game changer!", author: "Bob Wilson", title: "VP" },
      { quote: "Best decision ever!", author: "Alice Brown", title: "Director" },
    ]

    return (
      <div className="grid grid-cols-2 gap-4 w-[600px]">
        {testimonials.map((t, i) => (
          <TestimonialCard
            key={i}
            quote={t.quote}
            author={t.author}
            title={t.title}
            size="sm"
            showQuoteIcon={false}
          />
        ))}
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Avatar fallback with auto-generated colors based on author name.",
      },
    },
  },
}

// Long testimonial
export const LongTestimonial: Story = {
  render: () => (
    <div className="w-[500px]">
      <TestimonialCard
        quote="We've been using this platform for over two years now, and it's become an essential part of our daily operations. The continuous improvements, the responsive support team, and the overall quality of the product make it stand out from everything else we've tried. I can't imagine going back to our old workflow."
        author="Jennifer Lee"
        title="Operations Director"
        company="Enterprise Solutions Inc"
        avatar="https://i.pravatar.cc/150?u=jennifer"
        rating={5}
      />
    </div>
  ),
}
