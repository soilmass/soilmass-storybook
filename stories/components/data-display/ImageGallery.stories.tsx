"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  ImageGallery,
  SimpleImageGrid,
  ImageCarousel,
  type GalleryImage,
} from "@/components/ui/image-gallery"

const meta = {
  title: "Components/DataDisplay/ImageGallery",
  component: ImageGallery,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Image grid with lightbox and navigation. Features multiple layouts (grid, masonry, carousel), lightbox with zoom, keyboard navigation, and touch gesture support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    layout: {
      control: "radio",
      options: ["grid", "masonry", "carousel"],
      description: "Layout variant",
    },
    columns: {
      control: "radio",
      options: [2, 3, 4, 5, 6],
      description: "Number of columns (grid layout)",
    },
    gap: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Gap between images",
    },
    aspectRatio: {
      control: "radio",
      options: ["square", "4:3", "16:9", "auto"],
      description: "Aspect ratio for grid items",
    },
    lightbox: {
      control: "boolean",
      description: "Enable lightbox on click",
    },
    showCaptions: {
      control: "boolean",
      description: "Show captions below images",
    },
    rounded: {
      control: "boolean",
      description: "Rounded corners",
    },
  },
} satisfies Meta<typeof ImageGallery>

export default meta
type Story = StoryObj<typeof meta>

// Sample images
const sampleImages: GalleryImage[] = Array.from({ length: 9 }).map((_, i) => ({
  src: `https://placehold.co/800x${[600, 800, 500, 700, 600, 900, 550, 650, 750][i]}/e2e8f0/64748b?text=Image+${i + 1}`,
  alt: `Sample image ${i + 1}`,
  caption: `Beautiful scene ${i + 1}`,
}))

// Default grid
export const Default: Story = {
  render: () => (
    <ImageGallery images={sampleImages.slice(0, 6)} />
  ),
}

// Grid layouts
export const GridLayouts: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">2 Columns</p>
        <ImageGallery images={sampleImages.slice(0, 4)} columns={2} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">3 Columns (Default)</p>
        <ImageGallery images={sampleImages.slice(0, 6)} columns={3} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">4 Columns</p>
        <ImageGallery images={sampleImages.slice(0, 8)} columns={4} />
      </div>
    </div>
  ),
}

// Aspect ratios
export const AspectRatios: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Square</p>
        <ImageGallery images={sampleImages.slice(0, 6)} aspectRatio="square" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">4:3</p>
        <ImageGallery images={sampleImages.slice(0, 6)} aspectRatio="4:3" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">16:9</p>
        <ImageGallery images={sampleImages.slice(0, 6)} aspectRatio="16:9" />
      </div>
    </div>
  ),
}

// Masonry layout
export const MasonryLayout: Story = {
  render: () => (
    <ImageGallery
      images={sampleImages}
      layout="masonry"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Masonry layout for images with varying heights.",
      },
    },
  },
}

// Carousel layout
export const CarouselLayout: Story = {
  render: () => (
    <div className="w-[600px]">
      <ImageGallery
        images={sampleImages.slice(0, 5)}
        layout="carousel"
        showCaptions
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Carousel layout showing one image at a time with navigation.",
      },
    },
  },
}

// With captions
export const WithCaptions: Story = {
  render: () => (
    <ImageGallery
      images={sampleImages.slice(0, 6)}
      showCaptions
    />
  ),
}

// Gap sizes
export const GapSizes: Story = {
  render: () => (
    <div className="space-y-12">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Small gap</p>
        <ImageGallery images={sampleImages.slice(0, 6)} gap="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Medium gap (Default)</p>
        <ImageGallery images={sampleImages.slice(0, 6)} gap="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Large gap</p>
        <ImageGallery images={sampleImages.slice(0, 6)} gap="lg" />
      </div>
    </div>
  ),
}

// Without lightbox
export const WithoutLightbox: Story = {
  render: () => (
    <SimpleImageGrid images={sampleImages.slice(0, 6)} />
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple image grid without lightbox functionality.",
      },
    },
  },
}

// Image carousel (standalone)
export const ImageCarouselExample: Story = {
  render: () => (
    <div className="w-[600px]">
      <ImageCarousel
        images={sampleImages.slice(0, 5)}
        showCaptions
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Standalone image carousel with navigation.",
      },
    },
  },
}

// Auto-play carousel
export const AutoPlayCarousel: Story = {
  render: () => (
    <div className="w-[600px]">
      <ImageCarousel
        images={sampleImages.slice(0, 5)}
        autoPlay={3000}
        showCaptions
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Carousel with automatic image advancement (3 second interval).",
      },
    },
  },
}

// Product gallery
export const ProductGallery: Story = {
  render: () => {
    const productImages: GalleryImage[] = [
      { src: "https://placehold.co/800x800/1e293b/475569?text=Product+Main", alt: "Product main view" },
      { src: "https://placehold.co/800x800/334155/94a3b8?text=Product+Side", alt: "Product side view" },
      { src: "https://placehold.co/800x800/475569/cbd5e1?text=Product+Back", alt: "Product back view" },
      { src: "https://placehold.co/800x800/64748b/e2e8f0?text=Product+Detail", alt: "Product detail" },
    ]

    return (
      <div className="w-[500px]">
        <ImageGallery
          images={productImages}
          layout="carousel"
          aspectRatio="square"
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Product gallery for e-commerce.",
      },
    },
  },
}

// Portfolio gallery
export const PortfolioGallery: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">Our Work</h2>
        <p className="text-[var(--color-text-muted)]">
          A selection of our recent projects
        </p>
      </div>
      <ImageGallery
        images={sampleImages}
        layout="masonry"
        gap="lg"
        showCaptions
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Portfolio gallery with masonry layout.",
      },
    },
  },
}

// Photo album
export const PhotoAlbum: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[var(--color-text)]">Summer Vacation 2024</h2>
        <span className="text-sm text-[var(--color-text-muted)]">
          {sampleImages.length} photos
        </span>
      </div>
      <ImageGallery
        images={sampleImages}
        columns={4}
        gap="sm"
        aspectRatio="square"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Photo album grid with compact layout.",
      },
    },
  },
}

// Blog post images
export const BlogPostImages: Story = {
  render: () => (
    <article className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-[var(--color-text)]">
        Exploring the Mountains
      </h1>
      <p className="text-[var(--color-text-muted)]">
        Our journey through the stunning mountain landscapes revealed breathtaking views
        at every turn. Here are some highlights from the trip.
      </p>
      <ImageGallery
        images={sampleImages.slice(0, 4)}
        columns={2}
        gap="md"
        aspectRatio="4:3"
        showCaptions
      />
      <p className="text-[var(--color-text-muted)]">
        Each location offered unique perspectives and memorable moments that we'll
        treasure forever.
      </p>
    </article>
  ),
  parameters: {
    docs: {
      description: {
        story: "Image gallery within blog post content.",
      },
    },
  },
}
