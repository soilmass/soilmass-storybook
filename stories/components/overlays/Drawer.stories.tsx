"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import {
  Drawer,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const meta = {
  title: "Components/Overlays/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Slide-in panel from edge of screen. Supports left, right, and bottom positions with focus trapping.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["left", "right", "bottom"],
      description: "Drawer position",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Drawer size",
    },
  },
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

// Default (Right)
function DefaultDrawerDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Drawer Title</DrawerTitle>
          <DrawerDescription>
            This is a description of the drawer content.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-[var(--color-text-muted)]">
            Drawer content goes here. This drawer slides in from the right side.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Save</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export const Default: Story = {
  render: () => <DefaultDrawerDemo />,
}

// Positions
function PositionDrawerDemo({ position }: { position: "left" | "right" | "bottom" }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open {position}</Button>
      <Drawer open={open} onClose={() => setOpen(false)} position={position}>
        <DrawerHeader>
          <DrawerTitle>{position.charAt(0).toUpperCase() + position.slice(1)} Drawer</DrawerTitle>
          <DrawerDescription>This drawer slides in from the {position}.</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-[var(--color-text-muted)]">
            Content for the {position} drawer.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export const Positions: Story = {
  render: () => (
    <div className="flex gap-4">
      <PositionDrawerDemo position="left" />
      <PositionDrawerDemo position="right" />
      <PositionDrawerDemo position="bottom" />
    </div>
  ),
}

// Sizes
function SizeDrawerDemo({ size }: { size: "sm" | "md" | "lg" | "xl" }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>{size.toUpperCase()}</Button>
      <Drawer open={open} onClose={() => setOpen(false)} size={size}>
        <DrawerHeader>
          <DrawerTitle>Size: {size.toUpperCase()}</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <p className="text-sm text-[var(--color-text-muted)]">
            This drawer uses the {size} size variant.
          </p>
        </DrawerBody>
        <DrawerFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-4">
      <SizeDrawerDemo size="sm" />
      <SizeDrawerDemo size="md" />
      <SizeDrawerDemo size="lg" />
      <SizeDrawerDemo size="xl" />
    </div>
  ),
}

// Form Drawer
function FormDrawerDemo() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Add User</Button>
      <Drawer open={open} onClose={() => setOpen(false)} size="md">
        <DrawerHeader>
          <DrawerTitle>Add New User</DrawerTitle>
          <DrawerDescription>
            Fill in the details to create a new user account.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <form className="space-y-4">
            <Input label="Full Name" placeholder="John Doe" required />
            <Input label="Email" type="email" placeholder="john@example.com" required />
            <Input label="Role" placeholder="Developer" />
            <Input label="Department" placeholder="Engineering" />
          </form>
        </DrawerBody>
        <DrawerFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)}>Create User</Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export const FormDrawer: Story = {
  render: () => <FormDrawerDemo />,
}

// Navigation Drawer
function NavigationDrawerDemo() {
  const [open, setOpen] = useState(false)

  const navItems = [
    { label: "Dashboard", icon: "🏠" },
    { label: "Projects", icon: "📁" },
    { label: "Team", icon: "👥" },
    { label: "Calendar", icon: "📅" },
    { label: "Settings", icon: "⚙️" },
  ]

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} position="left" size="sm">
        <DrawerHeader>
          <DrawerTitle>Navigation</DrawerTitle>
        </DrawerHeader>
        <DrawerBody className="p-0">
          <nav className="flex flex-col">
            {navItems.map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-3 px-6 py-3 text-left hover:bg-[var(--color-surface-hover)] transition-colors"
                onClick={() => setOpen(false)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </DrawerBody>
      </Drawer>
    </>
  )
}

export const NavigationDrawer: Story = {
  render: () => <NavigationDrawerDemo />,
}

// Cart Drawer
function CartDrawerDemo() {
  const [open, setOpen] = useState(false)

  const cartItems = [
    { name: "Product 1", price: 29.99, quantity: 2 },
    { name: "Product 2", price: 49.99, quantity: 1 },
    { name: "Product 3", price: 19.99, quantity: 3 },
  ]

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        View Cart (3)
      </Button>
      <Drawer open={open} onClose={() => setOpen(false)} size="md">
        <DrawerHeader>
          <DrawerTitle>Shopping Cart</DrawerTitle>
          <DrawerDescription>3 items in your cart</DrawerDescription>
        </DrawerHeader>
        <DrawerBody>
          <div className="divide-y">
            {cartItems.map((item, i) => (
              <div key={i} className="flex justify-between py-4">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    Qty: {item.quantity}
                  </p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </DrawerBody>
        <DrawerFooter className="flex-col gap-2">
          <Button className="w-full">Checkout</Button>
          <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>
            Continue Shopping
          </Button>
        </DrawerFooter>
      </Drawer>
    </>
  )
}

export const CartDrawer: Story = {
  render: () => <CartDrawerDemo />,
}
