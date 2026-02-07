"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  Dock,
  SimpleDock,
  FloatingDock,
  AppDock,
  NavDock,
  type DockItem,
} from "@/components/ui/dock"

const meta = {
  title: "Components/Navigation/Dock",
  component: Dock,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "macOS-style dock with magnification. Features smooth animations, tooltips, multiple positions, and separator support.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["bottom", "left", "right"],
      description: "Dock position",
    },
    variant: {
      control: "radio",
      options: ["default", "glass", "solid"],
      description: "Background variant",
    },
    showTooltips: {
      control: "boolean",
      description: "Show tooltips on hover",
    },
    iconSize: {
      control: { type: "number", min: 32, max: 72 },
      description: "Icon size in pixels",
    },
    maxScale: {
      control: { type: "number", min: 1, max: 2, step: 0.1 },
      description: "Maximum scale on hover",
    },
  },
} satisfies Meta<typeof Dock>

export default meta
type Story = StoryObj<typeof meta>

// Sample icons
const HomeIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const MailIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const FolderIcon = () => (
  <svg className="w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
)

const dockItems: (DockItem | "separator")[] = [
  { id: "home", icon: <HomeIcon />, label: "Home", onClick: () => console.log("Home") },
  { id: "search", icon: <SearchIcon />, label: "Search", onClick: () => console.log("Search") },
  { id: "mail", icon: <MailIcon />, label: "Mail", onClick: () => console.log("Mail"), badge: 3 },
  "separator",
  { id: "calendar", icon: <CalendarIcon />, label: "Calendar", onClick: () => console.log("Calendar") },
  { id: "files", icon: <FolderIcon />, label: "Files", onClick: () => console.log("Files"), active: true },
  { id: "settings", icon: <SettingsIcon />, label: "Settings", onClick: () => console.log("Settings") },
]

// Default dock
export const Default: Story = {
  render: () => (
    <div className="p-20 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 rounded-[var(--radius-xl)]">
      <Dock items={dockItems} />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="p-10 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-[var(--radius-xl)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">Default</p>
        <Dock items={dockItems.slice(0, 5)} variant="default" />
      </div>
      <div className="p-10 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[var(--radius-xl)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">Glass</p>
        <Dock items={dockItems.slice(0, 5)} variant="glass" />
      </div>
      <div className="p-10 bg-[var(--color-surface-muted)] rounded-[var(--radius-xl)]">
        <p className="text-sm text-[var(--color-text-muted)] mb-4 text-center">Solid</p>
        <Dock items={dockItems.slice(0, 5)} variant="solid" />
      </div>
    </div>
  ),
}

// Icon sizes
export const IconSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="flex flex-col items-center">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Small (40px)</p>
        <Dock items={dockItems.slice(0, 5)} iconSize={40} />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Medium (48px)</p>
        <Dock items={dockItems.slice(0, 5)} iconSize={48} />
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-[var(--color-text-muted)] mb-4">Large (56px)</p>
        <Dock items={dockItems.slice(0, 5)} iconSize={56} />
      </div>
    </div>
  ),
}

// Simple dock (no magnification)
export const Simple: Story = {
  render: () => (
    <SimpleDock
      items={dockItems.filter((item): item is DockItem => item !== "separator")}
      iconSize={40}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Simple dock without magnification effect.",
      },
    },
  },
}

// With badges
export const WithBadges: Story = {
  render: () => (
    <Dock
      items={[
        { id: "mail", icon: <MailIcon />, label: "Mail", badge: 5, onClick: () => {} },
        { id: "calendar", icon: <CalendarIcon />, label: "Calendar", badge: 2, onClick: () => {} },
        { id: "settings", icon: <SettingsIcon />, label: "Settings", badge: 99, onClick: () => {} },
      ]}
    />
  ),
}

// App dock (macOS style)
export const AppStyle: Story = {
  render: () => (
    <div className="p-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-[var(--radius-xl)]">
      <AppDock
        apps={[
          { id: "finder", icon: <FolderIcon />, name: "Finder", running: true },
          { id: "mail", icon: <MailIcon />, name: "Mail", running: true },
          { id: "calendar", icon: <CalendarIcon />, name: "Calendar" },
          { id: "settings", icon: <SettingsIcon />, name: "Settings" },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "macOS-style app dock with running indicators.",
      },
    },
  },
}

// Navigation dock
export const Navigation: Story = {
  render: () => (
    <NavDock
      items={[
        { id: "home", icon: <HomeIcon />, label: "Home", href: "#", active: true },
        { id: "search", icon: <SearchIcon />, label: "Search", href: "#" },
        { id: "mail", icon: <MailIcon />, label: "Mail", href: "#" },
        { id: "settings", icon: <SettingsIcon />, label: "Settings", href: "#" },
      ]}
      showLabels
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Navigation dock with labels, suitable for main navigation.",
      },
    },
  },
}

// Navigation without labels
export const NavigationIconOnly: Story = {
  render: () => (
    <NavDock
      items={[
        { id: "home", icon: <HomeIcon />, label: "Home", href: "#", active: true },
        { id: "search", icon: <SearchIcon />, label: "Search", href: "#" },
        { id: "mail", icon: <MailIcon />, label: "Mail", href: "#" },
        { id: "settings", icon: <SettingsIcon />, label: "Settings", href: "#" },
      ]}
    />
  ),
}

// Desktop context
export const DesktopContext: Story = {
  render: () => (
    <div className="w-[800px] h-[500px] relative bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-[var(--radius-xl)] overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-[var(--color-text-muted)]">Desktop content</p>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
        <Dock items={dockItems} variant="glass" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dock positioned at the bottom of a desktop-like interface.",
      },
    },
  },
}
