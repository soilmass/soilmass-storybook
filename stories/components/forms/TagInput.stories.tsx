"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { TagInput, TagList } from "@/components/ui/tag-input"

const meta = {
  title: "Components/Forms/TagInput",
  component: TagInput,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Input for entering multiple tags/chips. Features Enter/comma to add, Backspace to remove, and optional suggestions dropdown.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    allowDuplicates: {
      control: "boolean",
      description: "Allow duplicate tags",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TagInput>

export default meta
type Story = StoryObj<typeof meta>

// Interactive Demo
function TagInputDemo(props: Partial<Parameters<typeof TagInput>[0]>) {
  const [tags, setTags] = useState<string[]>(["react", "typescript"])

  return (
    <TagInput
      value={tags}
      onChange={setTags}
      {...props}
    />
  )
}

// Default
export const Default: Story = {
  render: () => <TagInputDemo />,
}

// With label
export const WithLabel: Story = {
  render: () => <TagInputDemo label="Skills" placeholder="Add skill..." />,
}

// With max tags
export const WithMaxTags: Story = {
  render: () => (
    <TagInputDemo
      label="Tags"
      maxTags={5}
      placeholder="Add tag (max 5)..."
    />
  ),
}

// With suggestions
function TagInputWithSuggestions() {
  const [tags, setTags] = useState<string[]>([])

  const allSuggestions = [
    "React",
    "Vue",
    "Angular",
    "Svelte",
    "TypeScript",
    "JavaScript",
    "CSS",
    "HTML",
    "Node.js",
    "Python",
    "Go",
    "Rust",
  ]

  return (
    <TagInput
      label="Technologies"
      value={tags}
      onChange={setTags}
      suggestions={allSuggestions}
      placeholder="Type or select..."
    />
  )
}

export const WithSuggestions: Story = {
  render: () => <TagInputWithSuggestions />,
  parameters: {
    docs: {
      description: {
        story: "Tag input with autocomplete suggestions. Use arrow keys to navigate.",
      },
    },
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <TagInputDemo label="Small" size="sm" />
      <TagInputDemo label="Medium (default)" size="md" />
      <TagInputDemo label="Large" size="lg" />
    </div>
  ),
}

// Error state
export const WithError: Story = {
  render: () => (
    <TagInputDemo
      label="Categories"
      error
      errorMessage="At least 3 categories required"
    />
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <TagInputDemo
      label="Tags"
      disabled
    />
  ),
}

// Read-only tag list
export const ReadOnlyTagList: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Default</p>
        <TagList tags={["React", "TypeScript", "Node.js", "GraphQL"]} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Primary</p>
        <TagList tags={["Frontend", "Backend", "DevOps"]} variant="primary" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Outline</p>
        <TagList tags={["v1.0", "stable", "production"]} variant="outline" />
      </div>
    </div>
  ),
}

// Tag list sizes
export const TagListSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <TagList tags={["Small", "Tags"]} size="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium</p>
        <TagList tags={["Medium", "Tags"]} size="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <TagList tags={["Large", "Tags"]} size="lg" />
      </div>
    </div>
  ),
}

// Blog post form
function BlogPostFormDemo() {
  const [tags, setTags] = useState<string[]>(["tutorial"])
  const [categories, setCategories] = useState<string[]>([])

  const categoryOptions = [
    "Development",
    "Design",
    "DevOps",
    "Career",
    "Tools",
    "Tutorials",
  ]

  return (
    <div className="space-y-6 w-96">
      <h3 className="font-medium text-[var(--color-text)]">Blog Post Settings</h3>

      <TagInput
        label="Tags"
        value={tags}
        onChange={setTags}
        maxTags={10}
        placeholder="Add tags..."
      />

      <TagInput
        label="Categories"
        value={categories}
        onChange={setCategories}
        suggestions={categoryOptions}
        maxTags={3}
        placeholder="Select categories..."
      />

      <div className="pt-4 border-t">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Preview:</p>
        <div className="space-y-2">
          <div className="flex gap-2 items-center">
            <span className="text-xs text-[var(--color-text-muted)]">Tags:</span>
            <TagList tags={tags} size="sm" />
          </div>
          <div className="flex gap-2 items-center">
            <span className="text-xs text-[var(--color-text-muted)]">Categories:</span>
            <TagList tags={categories} size="sm" variant="primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

export const BlogPostForm: Story = {
  render: () => <BlogPostFormDemo />,
  decorators: [
    (Story) => (
      <div style={{ width: "auto" }}>
        <Story />
      </div>
    ),
  ],
}

// Email recipients
function EmailRecipientsDemo() {
  const [recipients, setRecipients] = useState<string[]>([
    "john@example.com",
    "jane@example.com",
  ])

  return (
    <TagInput
      label="Recipients"
      value={recipients}
      onChange={setRecipients}
      placeholder="Enter email addresses..."
    />
  )
}

export const EmailRecipients: Story = {
  render: () => <EmailRecipientsDemo />,
  parameters: {
    docs: {
      description: {
        story: "Tag input used for email recipient list.",
      },
    },
  },
}
