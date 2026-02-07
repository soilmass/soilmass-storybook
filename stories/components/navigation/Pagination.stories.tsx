"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Pagination, PaginationInfo } from "@/components/ui/pagination"

const meta = {
  title: "Components/Navigation/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Navigation for paginated content. Supports page numbers, prev/next buttons, and ellipsis for large page counts.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    page: {
      control: { type: "number", min: 1 },
      description: "Current page",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    compact: {
      control: "boolean",
      description: "Compact mode (prev/next only)",
    },
    showFirstLast: {
      control: "boolean",
      description: "Show first/last buttons",
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// Interactive Demo
function PaginationDemo(props: Partial<Parameters<typeof Pagination>[0]>) {
  const [page, setPage] = useState(props.page || 1)
  const totalPages = props.totalPages || 10

  return (
    <Pagination
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      {...props}
    />
  )
}

// Default
export const Default: Story = {
  render: () => <PaginationDemo page={1} totalPages={10} />,
}

// Current page in middle
export const MiddlePage: Story = {
  render: () => <PaginationDemo page={5} totalPages={10} />,
}

// Many pages (with ellipsis)
export const ManyPages: Story = {
  render: () => <PaginationDemo page={10} totalPages={50} />,
}

// With first/last buttons
export const WithFirstLast: Story = {
  render: () => <PaginationDemo page={5} totalPages={20} showFirstLast />,
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <PaginationDemo page={3} totalPages={10} size="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium (default)</p>
        <PaginationDemo page={3} totalPages={10} size="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <PaginationDemo page={3} totalPages={10} size="lg" />
      </div>
    </div>
  ),
}

// Compact mode
export const Compact: Story = {
  render: () => <PaginationDemo page={3} totalPages={10} compact />,
}

// Few pages
export const FewPages: Story = {
  render: () => <PaginationDemo page={2} totalPages={3} />,
}

// Single page (disabled)
export const SinglePage: Story = {
  render: () => <PaginationDemo page={1} totalPages={1} />,
}

// With info
function PaginationWithInfo() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const totalItems = 97

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between w-full">
      <PaginationInfo page={page} pageSize={pageSize} totalItems={totalItems} />
      <Pagination
        page={page}
        totalPages={Math.ceil(totalItems / pageSize)}
        onPageChange={setPage}
      />
    </div>
  )
}

export const WithInfo: Story = {
  render: () => <PaginationWithInfo />,
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
}

// Table pagination context
function TablePagination() {
  const [page, setPage] = useState(1)
  const pageSize = 10
  const totalItems = 245

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-[var(--color-surface-alt)] border-b">
        <h3 className="font-medium">Users</h3>
      </div>
      <div className="p-4">
        <p className="text-sm text-[var(--color-text-muted)]">
          Table content would go here...
        </p>
      </div>
      <div className="flex flex-col gap-4 p-4 border-t sm:flex-row sm:items-center sm:justify-between">
        <PaginationInfo page={page} pageSize={pageSize} totalItems={totalItems} />
        <Pagination
          page={page}
          totalPages={Math.ceil(totalItems / pageSize)}
          onPageChange={setPage}
          size="sm"
        />
      </div>
    </div>
  )
}

export const TableContext: Story = {
  render: () => <TablePagination />,
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: "Pagination used in a table footer context.",
      },
    },
  },
}

// Sibling count
export const SiblingCount: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">siblingCount=1 (default)</p>
        <PaginationDemo page={10} totalPages={20} siblingCount={1} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">siblingCount=2</p>
        <PaginationDemo page={10} totalPages={20} siblingCount={2} />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">siblingCount=3</p>
        <PaginationDemo page={10} totalPages={20} siblingCount={3} />
      </div>
    </div>
  ),
}
