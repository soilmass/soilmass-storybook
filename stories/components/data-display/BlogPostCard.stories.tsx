import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  BlogPostCard,
  BlogGrid,
  BlogList,
} from "@/components/ui/blog-post-card"

const meta = {
  title: "Components/DataDisplay/BlogPostCard",
  component: BlogPostCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display blog post previews. Features featured image, title/excerpt, author info, date/read time, and multiple layouts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["vertical", "horizontal", "featured", "minimal"],
      description: "Card variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
} satisfies Meta<typeof BlogPostCard>

export default meta
type Story = StoryObj<typeof meta>

const samplePost = {
  title: "Getting Started with Design Systems",
  excerpt: "Learn how to build and maintain a scalable design system that helps your team ship faster and more consistently.",
  image: "https://placehold.co/800x400/e2e8f0/64748b?text=Blog+Image",
  href: "#blog/design-systems",
  author: {
    name: "Jane Smith",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
  date: "Jan 15, 2024",
  readTime: "5 min read",
  category: "Design",
  categoryHref: "#category/design",
}

// Default vertical card
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <BlogPostCard {...samplePost} />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-80">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Vertical</p>
        <BlogPostCard {...samplePost} variant="vertical" />
      </div>
      <div className="w-[600px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Horizontal</p>
        <BlogPostCard {...samplePost} variant="horizontal" />
      </div>
      <div className="w-[600px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Featured</p>
        <BlogPostCard {...samplePost} variant="featured" />
      </div>
      <div className="w-96">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Minimal</p>
        <BlogPostCard {...samplePost} variant="minimal" />
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-64">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <BlogPostCard {...samplePost} size="sm" />
      </div>
      <div className="w-80">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium</p>
        <BlogPostCard {...samplePost} size="md" />
      </div>
      <div className="w-96">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <BlogPostCard {...samplePost} size="lg" />
      </div>
    </div>
  ),
}

// Without image
export const WithoutImage: Story = {
  render: () => (
    <div className="w-80">
      <BlogPostCard
        title={samplePost.title}
        excerpt={samplePost.excerpt}
        href={samplePost.href}
        author={samplePost.author}
        date={samplePost.date}
        readTime={samplePost.readTime}
        category={samplePost.category}
      />
    </div>
  ),
}

// With tags
export const WithTags: Story = {
  render: () => (
    <div className="w-80">
      <BlogPostCard
        {...samplePost}
        tags={["React", "TypeScript", "Design Systems"]}
      />
    </div>
  ),
}

// With initials (no avatar)
export const WithInitials: Story = {
  render: () => (
    <div className="w-80">
      <BlogPostCard
        {...samplePost}
        author={{ name: "John Doe" }}
      />
    </div>
  ),
}

// Blog grid
export const Grid: Story = {
  render: () => (
    <div className="w-[900px]">
      <BlogGrid columns={3}>
        {Array.from({ length: 6 }).map((_, i) => (
          <BlogPostCard
            key={i}
            title={`Blog Post Title ${i + 1}`}
            excerpt="A brief description of the blog post content goes here."
            image={`https://placehold.co/800x400/e2e8f0/64748b?text=Post+${i + 1}`}
            href={`#blog/post-${i + 1}`}
            author={{ name: "Author Name", avatar: `https://i.pravatar.cc/100?img=${i + 1}` }}
            date="Jan 15, 2024"
            readTime="5 min read"
            category={["Design", "Development", "Marketing"][i % 3]}
          />
        ))}
      </BlogGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid layout for blog post listings.",
      },
    },
  },
}

// Blog list (horizontal)
export const List: Story = {
  render: () => (
    <div className="w-[700px]">
      <BlogList>
        {Array.from({ length: 4 }).map((_, i) => (
          <BlogPostCard
            key={i}
            variant="horizontal"
            title={`How to Build Better Products ${i + 1}`}
            excerpt="Learn the fundamentals of product development and how to create products that users love."
            image={`https://placehold.co/400x300/e2e8f0/64748b?text=Post+${i + 1}`}
            href={`#blog/post-${i + 1}`}
            author={{ name: "Author Name" }}
            date="Jan 15, 2024"
            readTime="5 min read"
            category="Product"
          />
        ))}
      </BlogList>
    </div>
  ),
}

// Featured + grid layout
export const FeaturedLayout: Story = {
  render: () => (
    <div className="w-[900px] space-y-6">
      <BlogPostCard
        variant="featured"
        title="Building the Future of Web Development"
        excerpt="An in-depth look at the latest trends and technologies shaping the future of web development."
        image="https://placehold.co/1200x600/1e293b/3b82f6?text=Featured"
        href="#blog/featured"
        author={{ name: "Jane Smith", avatar: "https://i.pravatar.cc/100?img=5" }}
        date="Jan 15, 2024"
        readTime="10 min read"
        category="Technology"
      />
      <BlogGrid columns={3}>
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogPostCard
            key={i}
            title={`Related Post ${i + 1}`}
            excerpt="A brief description of the related blog post."
            image={`https://placehold.co/800x400/e2e8f0/64748b?text=Post+${i + 1}`}
            href={`#blog/post-${i + 1}`}
            date="Jan 15, 2024"
            readTime="5 min read"
            category="Design"
          />
        ))}
      </BlogGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Featured post with grid of related posts.",
      },
    },
  },
}

// Minimal list
export const MinimalList: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <BlogPostCard
          key={i}
          variant="minimal"
          title={`Understanding ${["React", "TypeScript", "Next.js", "Tailwind", "Design Systems"][i]}`}
          excerpt="A comprehensive guide to modern web development practices."
          href={`#blog/post-${i + 1}`}
          date="Jan 15, 2024"
          readTime="5 min read"
          category={["Development", "TypeScript", "Framework", "CSS", "Design"][i]}
        />
      ))}
    </div>
  ),
}

// Sidebar widget
export const SidebarWidget: Story = {
  render: () => (
    <div className="w-72 p-4 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <h3 className="font-semibold text-[var(--color-text)] mb-4">Recent Posts</h3>
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <BlogPostCard
            key={i}
            variant="minimal"
            size="sm"
            title={`Blog Post Title ${i + 1}`}
            href={`#blog/post-${i + 1}`}
            date="Jan 15"
          />
        ))}
      </div>
    </div>
  ),
}
