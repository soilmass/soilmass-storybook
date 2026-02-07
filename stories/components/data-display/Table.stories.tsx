"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  TableEmpty,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const meta = {
  title: "Components/Data Display/Table",
  component: Table,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Semantic table for displaying tabular data. Supports sorting, selection, and responsive patterns.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: "700px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

// Sample data
const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Viewer", status: "Pending" },
]

// Default
export const Default: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge
                variant={
                  user.status === "Active"
                    ? "success"
                    : user.status === "Inactive"
                      ? "secondary"
                      : "warning"
                }
                size="sm"
              >
                {user.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}

// With caption
export const WithCaption: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent invoices</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV-001</TableCell>
          <TableCell>Jan 15, 2024</TableCell>
          <TableCell>$250.00</TableCell>
          <TableCell><Badge variant="success" size="sm">Paid</Badge></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV-002</TableCell>
          <TableCell>Jan 20, 2024</TableCell>
          <TableCell>$180.00</TableCell>
          <TableCell><Badge variant="warning" size="sm">Pending</Badge></TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">INV-003</TableCell>
          <TableCell>Jan 25, 2024</TableCell>
          <TableCell>$320.00</TableCell>
          <TableCell><Badge variant="success" size="sm">Paid</Badge></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}

// Sortable columns
function SortableTable() {
  const [sortField, setSortField] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<"asc" | "desc" | null>(null)

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc")
      if (sortDir === "desc") setSortField(null)
    } else {
      setSortField(field)
      setSortDir("asc")
    }
  }

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortField || !sortDir) return 0
    const aVal = a[sortField as keyof typeof a]
    const bVal = b[sortField as keyof typeof b]
    if (sortDir === "asc") return aVal < bVal ? -1 : 1
    return aVal > bVal ? -1 : 1
  })

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead
            sortable
            sortDirection={sortField === "name" ? sortDir : null}
            onSort={() => handleSort("name")}
          >
            Name
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortField === "email" ? sortDir : null}
            onSort={() => handleSort("email")}
          >
            Email
          </TableHead>
          <TableHead
            sortable
            sortDirection={sortField === "role" ? sortDir : null}
            onSort={() => handleSort("role")}
          >
            Role
          </TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === "Active" ? "success" : "secondary"} size="sm">
                {user.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const Sortable: Story = {
  render: () => <SortableTable />,
}

// With selection
function SelectableTable() {
  const [selected, setSelected] = useState<number[]>([])

  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleAll = () => {
    setSelected((prev) =>
      prev.length === users.length ? [] : users.map((u) => u.id)
    )
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12">
            <Checkbox
              checked={selected.length === users.length}
              indeterminate={selected.length > 0 && selected.length < users.length}
              onChange={toggleAll}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id} selected={selected.includes(user.id)}>
            <TableCell>
              <Checkbox
                checked={selected.includes(user.id)}
                onChange={() => toggleSelect(user.id)}
              />
            </TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export const WithSelection: Story = {
  render: () => <SelectableTable />,
}

// Empty state
export const Empty: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableEmpty colSpan={4} message="No users found" />
      </TableBody>
    </Table>
  ),
}

// With footer
export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">Widget Pro</TableCell>
          <TableCell className="text-right">2</TableCell>
          <TableCell className="text-right">$99.00</TableCell>
          <TableCell className="text-right">$198.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Gadget Plus</TableCell>
          <TableCell className="text-right">1</TableCell>
          <TableCell className="text-right">$149.00</TableCell>
          <TableCell className="text-right">$149.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">Accessory Kit</TableCell>
          <TableCell className="text-right">3</TableCell>
          <TableCell className="text-right">$29.00</TableCell>
          <TableCell className="text-right">$87.00</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right font-bold">$434.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

// Compact table
export const Compact: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="py-2">ID</TableHead>
          <TableHead className="py-2">Name</TableHead>
          <TableHead className="py-2">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <TableRow key={i}>
            <TableCell className="py-2">{i}</TableCell>
            <TableCell className="py-2">Item {i}</TableCell>
            <TableCell className="py-2">${(i * 10).toFixed(2)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
}
