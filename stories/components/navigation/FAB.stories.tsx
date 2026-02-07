"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  FAB,
  SimpleFAB,
  SpeedDial,
  ChatFAB,
} from "@/components/ui/fab"

const meta = {
  title: "Components/Navigation/FAB",
  component: FAB,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Floating action button with expandable actions. Features primary action button, expandable menu, multiple positions, and animation effects.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["bottom-right", "bottom-left", "bottom-center", "top-right", "top-left"],
      description: "Position on screen",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    variant: {
      control: "radio",
      options: ["primary", "secondary", "dark"],
      description: "Button variant",
    },
    menuDirection: {
      control: "radio",
      options: ["up", "down", "left", "right"],
      description: "Action menu direction",
    },
    pulse: {
      control: "boolean",
      description: "Pulse animation",
    },
  },
} satisfies Meta<typeof FAB>

export default meta
type Story = StoryObj<typeof meta>

// Icons
const PlusIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const EditIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
  </svg>
)

const ImageIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const DocumentIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

const ShareIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
)

// Demo container
function DemoContainer({ children, height = "400px" }: { children: React.ReactNode; height?: string }) {
  return (
    <div className="relative bg-[var(--color-surface-muted)]" style={{ height }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Page content</p>
      </div>
      {children}
    </div>
  )
}

// Simple FAB
export const Default: Story = {
  render: () => (
    <DemoContainer>
      <SimpleFAB
        icon={<PlusIcon />}
        label="Add item"
        onClick={() => console.log("FAB clicked")}
      />
    </DemoContainer>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <DemoContainer height="500px">
      <SimpleFAB
        position="bottom-right"
        variant="primary"
        icon={<PlusIcon />}
        label="Primary"
        onClick={() => {}}
        offset={80}
      />
      <SimpleFAB
        position="bottom-right"
        variant="secondary"
        icon={<EditIcon />}
        label="Secondary"
        onClick={() => {}}
        offset={160}
      />
      <SimpleFAB
        position="bottom-right"
        variant="dark"
        icon={<ShareIcon />}
        label="Dark"
        onClick={() => {}}
        offset={240}
      />
    </DemoContainer>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <DemoContainer height="500px">
      <SimpleFAB
        position="bottom-right"
        size="sm"
        icon={<PlusIcon />}
        label="Small"
        onClick={() => {}}
        offset={80}
      />
      <SimpleFAB
        position="bottom-right"
        size="md"
        icon={<PlusIcon />}
        label="Medium"
        onClick={() => {}}
        offset={160}
      />
      <SimpleFAB
        position="bottom-right"
        size="lg"
        icon={<PlusIcon />}
        label="Large"
        onClick={() => {}}
        offset={240}
      />
    </DemoContainer>
  ),
}

// With actions (speed dial)
export const WithActions: Story = {
  render: () => (
    <DemoContainer>
      <FAB
        icon={<PlusIcon />}
        label="Create"
        actions={[
          { icon: <EditIcon />, label: "New post", onClick: () => console.log("New post") },
          { icon: <ImageIcon />, label: "Upload image", onClick: () => console.log("Upload image") },
          { icon: <DocumentIcon />, label: "New document", onClick: () => console.log("New document") },
        ]}
      />
    </DemoContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "FAB with expandable action menu.",
      },
    },
  },
}

// Speed dial
export const SpeedDialExample: Story = {
  render: () => (
    <DemoContainer>
      <SpeedDial
        actions={[
          { icon: <EditIcon />, label: "Edit", onClick: () => console.log("Edit"), variant: "default" },
          { icon: <ImageIcon />, label: "Image", onClick: () => console.log("Image"), variant: "primary" },
          { icon: <DocumentIcon />, label: "Document", onClick: () => console.log("Document"), variant: "success" },
          { icon: <ShareIcon />, label: "Share", onClick: () => console.log("Share"), variant: "warning" },
        ]}
      />
    </DemoContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Speed dial pattern with colored action buttons.",
      },
    },
  },
}

// Extended FAB
export const Extended: Story = {
  render: () => (
    <DemoContainer>
      <FAB
        icon={<PlusIcon />}
        label="Create"
        extended
        extendedLabel="New Post"
        onClick={() => console.log("Create clicked")}
      />
    </DemoContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Extended FAB with text label.",
      },
    },
  },
}

// Chat FAB
export const Chat: Story = {
  render: () => (
    <DemoContainer>
      <ChatFAB
        onClick={() => console.log("Open chat")}
        unreadCount={3}
      />
    </DemoContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "Chat FAB commonly used for support chat widgets.",
      },
    },
  },
}

// Chat without badge
export const ChatNoBadge: Story = {
  render: () => (
    <DemoContainer>
      <ChatFAB
        onClick={() => console.log("Open chat")}
      />
    </DemoContainer>
  ),
}

// Positions
export const Positions: Story = {
  render: () => (
    <DemoContainer height="500px">
      <SimpleFAB position="bottom-right" icon={<PlusIcon />} label="Bottom Right" onClick={() => {}} />
      <SimpleFAB position="bottom-left" icon={<PlusIcon />} label="Bottom Left" onClick={() => {}} />
      <SimpleFAB position="bottom-center" icon={<PlusIcon />} label="Bottom Center" onClick={() => {}} />
      <SimpleFAB position="top-right" icon={<PlusIcon />} label="Top Right" onClick={() => {}} />
      <SimpleFAB position="top-left" icon={<PlusIcon />} label="Top Left" onClick={() => {}} />
    </DemoContainer>
  ),
}

// With pulse animation
export const WithPulse: Story = {
  render: () => (
    <DemoContainer>
      <SimpleFAB
        icon={<PlusIcon />}
        label="Attention"
        onClick={() => {}}
        pulse
      />
    </DemoContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: "FAB with pulse animation to draw attention.",
      },
    },
  },
}

// Menu directions
export const MenuDirections: Story = {
  render: () => (
    <DemoContainer height="600px">
      <FAB
        position="bottom-right"
        icon={<PlusIcon />}
        label="Up (default)"
        menuDirection="up"
        actions={[
          { icon: <EditIcon />, label: "Edit", onClick: () => {} },
          { icon: <ShareIcon />, label: "Share", onClick: () => {} },
        ]}
      />
      <FAB
        position="bottom-left"
        icon={<PlusIcon />}
        label="Right"
        menuDirection="right"
        actions={[
          { icon: <EditIcon />, label: "Edit", onClick: () => {} },
          { icon: <ShareIcon />, label: "Share", onClick: () => {} },
        ]}
      />
    </DemoContainer>
  ),
}

// E-commerce context
export const EcommerceContext: Story = {
  render: () => (
    <div className="relative h-[500px] bg-[var(--color-surface)]">
      <header className="p-4 border-b border-[var(--color-border)]">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <span className="font-bold text-[var(--color-text)]">STORE</span>
          <nav className="flex gap-4">
            <a href="#" className="text-sm text-[var(--color-text-muted)]">Products</a>
            <a href="#" className="text-sm text-[var(--color-text-muted)]">Cart</a>
          </nav>
        </div>
      </header>
      <main className="p-8 text-center">
        <p className="text-[var(--color-text-muted)]">Product listing...</p>
      </main>
      <ChatFAB onClick={() => console.log("Open support")} label="Need help?" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Chat FAB in an e-commerce context.",
      },
    },
  },
}
