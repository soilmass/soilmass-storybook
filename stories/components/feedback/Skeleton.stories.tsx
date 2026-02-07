import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Skeleton,
  SkeletonText,
  SkeletonAvatar,
  SkeletonImage,
  SkeletonButton,
  SkeletonCard,
  SkeletonList,
  SkeletonTableRow,
} from "@/components/ui/skeleton"

const meta = {
  title: "Components/Feedback/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Placeholder content shown while real content loads. Respects reduced motion preferences.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["text", "circular", "rectangular"],
      description: "Shape variant",
    },
    animation: {
      control: "radio",
      options: ["pulse", "wave", "none"],
      description: "Animation type",
    },
  },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <Skeleton variant="text" width="100%" />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Skeleton variant="text" width={120} />
        <p className="text-xs text-[var(--color-text-muted)] mt-2">Text</p>
      </div>
      <div className="text-center">
        <Skeleton variant="circular" width={48} height={48} />
        <p className="text-xs text-[var(--color-text-muted)] mt-2">Circular</p>
      </div>
      <div className="text-center">
        <Skeleton variant="rectangular" width={120} height={80} />
        <p className="text-xs text-[var(--color-text-muted)] mt-2">Rectangular</p>
      </div>
    </div>
  ),
}

// Animation types
export const Animations: Story = {
  render: () => (
    <div className="space-y-4 w-[300px]">
      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">Wave (default)</p>
        <Skeleton animation="wave" />
      </div>
      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">Pulse</p>
        <Skeleton animation="pulse" />
      </div>
      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">None</p>
        <Skeleton animation="none" />
      </div>
    </div>
  ),
}

// SkeletonText
export const TextSkeleton: Story = {
  render: () => (
    <div className="w-[300px]">
      <SkeletonText lines={4} />
    </div>
  ),
}

// SkeletonAvatar
export const AvatarSkeleton: Story = {
  render: () => (
    <div className="flex items-end gap-4">
      <SkeletonAvatar size="xs" />
      <SkeletonAvatar size="sm" />
      <SkeletonAvatar size="md" />
      <SkeletonAvatar size="lg" />
      <SkeletonAvatar size="xl" />
    </div>
  ),
}

// SkeletonImage
export const ImageSkeleton: Story = {
  render: () => (
    <div className="w-[300px] space-y-4">
      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">Video (16:9)</p>
        <SkeletonImage aspectRatio="video" />
      </div>
      <div>
        <p className="text-xs text-[var(--color-text-muted)] mb-2">Square (1:1)</p>
        <SkeletonImage aspectRatio="square" />
      </div>
    </div>
  ),
}

// SkeletonButton
export const ButtonSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SkeletonButton size="sm" />
      <SkeletonButton size="md" />
      <SkeletonButton size="lg" />
    </div>
  ),
}

// SkeletonCard
export const CardSkeleton: Story = {
  render: () => (
    <div className="w-[320px]">
      <SkeletonCard />
    </div>
  ),
}

// Card variations
export const CardVariations: Story = {
  render: () => (
    <div className="flex gap-4">
      <div className="w-[280px]">
        <p className="text-xs text-[var(--color-text-muted)] mb-2">Full card</p>
        <SkeletonCard />
      </div>
      <div className="w-[280px]">
        <p className="text-xs text-[var(--color-text-muted)] mb-2">No image</p>
        <SkeletonCard showImage={false} />
      </div>
      <div className="w-[280px]">
        <p className="text-xs text-[var(--color-text-muted)] mb-2">No avatar</p>
        <SkeletonCard showAvatar={false} />
      </div>
    </div>
  ),
}

// SkeletonList
export const ListSkeleton: Story = {
  render: () => (
    <div className="w-[300px] border rounded-lg overflow-hidden">
      <SkeletonList items={5} />
    </div>
  ),
}

// Table skeleton
export const TableSkeleton: Story = {
  render: () => (
    <table className="w-full">
      <thead>
        <tr className="border-b">
          <th className="text-left px-4 py-3 text-sm font-medium">Name</th>
          <th className="text-left px-4 py-3 text-sm font-medium">Email</th>
          <th className="text-left px-4 py-3 text-sm font-medium">Status</th>
          <th className="text-left px-4 py-3 text-sm font-medium">Role</th>
        </tr>
      </thead>
      <tbody>
        <SkeletonTableRow columns={4} />
        <SkeletonTableRow columns={4} />
        <SkeletonTableRow columns={4} />
        <SkeletonTableRow columns={4} />
        <SkeletonTableRow columns={4} />
      </tbody>
    </table>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
}

// User profile skeleton
export const UserProfileSkeleton: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4 border rounded-lg w-[350px]">
      <SkeletonAvatar size="lg" />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" height="0.75em" />
      </div>
    </div>
  ),
}

// Comment skeleton
export const CommentSkeleton: Story = {
  render: () => (
    <div className="w-[400px] space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <SkeletonAvatar size="sm" />
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <Skeleton variant="text" width={100} />
              <Skeleton variant="text" width={60} height="0.75em" />
            </div>
            <SkeletonText lines={2} />
          </div>
        </div>
      ))}
    </div>
  ),
}

// Article skeleton
export const ArticleSkeleton: Story = {
  render: () => (
    <article className="w-[500px] space-y-4">
      <SkeletonImage aspectRatio="video" />
      <Skeleton variant="text" width="80%" height="1.5em" />
      <div className="flex items-center gap-3">
        <SkeletonAvatar size="sm" />
        <Skeleton variant="text" width={120} />
        <Skeleton variant="text" width={80} />
      </div>
      <SkeletonText lines={6} />
    </article>
  ),
}

// Grid of cards
export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <SkeletonCard lines={2} />
      <SkeletonCard lines={2} />
      <SkeletonCard lines={2} />
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "900px" }}>
        <Story />
      </div>
    ),
  ],
}
