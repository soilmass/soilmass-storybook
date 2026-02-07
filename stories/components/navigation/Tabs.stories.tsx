"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { Tabs, TabList, Tab, TabPanel } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const meta = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tab navigation for switching between related content panels. Supports arrow key navigation and ARIA roles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["underline", "pills"],
      description: "Visual variant",
    },
    orientation: {
      control: "radio",
      options: ["horizontal", "vertical"],
      description: "Tab orientation",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

// Default (Underline)
export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account">
      <TabList aria-label="Account settings">
        <Tab value="account">Account</Tab>
        <Tab value="password">Password</Tab>
        <Tab value="notifications">Notifications</Tab>
      </TabList>
      <TabPanel value="account">
        <h3 className="font-medium mb-2">Account Settings</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Manage your account settings and preferences.
        </p>
      </TabPanel>
      <TabPanel value="password">
        <h3 className="font-medium mb-2">Password</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Change your password and security settings.
        </p>
      </TabPanel>
      <TabPanel value="notifications">
        <h3 className="font-medium mb-2">Notifications</h3>
        <p className="text-sm text-[var(--color-text-muted)]">
          Configure how you receive notifications.
        </p>
      </TabPanel>
    </Tabs>
  ),
}

// Pills variant
export const Pills: Story = {
  render: () => (
    <Tabs defaultValue="all" variant="pills">
      <TabList aria-label="Filter items">
        <Tab value="all">All</Tab>
        <Tab value="active">Active</Tab>
        <Tab value="completed">Completed</Tab>
        <Tab value="archived">Archived</Tab>
      </TabList>
      <TabPanel value="all">
        <p className="text-sm text-[var(--color-text-muted)]">
          Showing all items
        </p>
      </TabPanel>
      <TabPanel value="active">
        <p className="text-sm text-[var(--color-text-muted)]">
          Showing active items only
        </p>
      </TabPanel>
      <TabPanel value="completed">
        <p className="text-sm text-[var(--color-text-muted)]">
          Showing completed items only
        </p>
      </TabPanel>
      <TabPanel value="archived">
        <p className="text-sm text-[var(--color-text-muted)]">
          Showing archived items only
        </p>
      </TabPanel>
    </Tabs>
  ),
}

// With icons
export const WithIcons: Story = {
  render: () => (
    <Tabs defaultValue="overview">
      <TabList aria-label="Dashboard sections">
        <Tab
          value="overview"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
          }
        >
          Overview
        </Tab>
        <Tab
          value="analytics"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          }
        >
          Analytics
        </Tab>
        <Tab
          value="settings"
          icon={
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        >
          Settings
        </Tab>
      </TabList>
      <TabPanel value="overview">
        <p className="text-sm text-[var(--color-text-muted)]">Overview content</p>
      </TabPanel>
      <TabPanel value="analytics">
        <p className="text-sm text-[var(--color-text-muted)]">Analytics content</p>
      </TabPanel>
      <TabPanel value="settings">
        <p className="text-sm text-[var(--color-text-muted)]">Settings content</p>
      </TabPanel>
    </Tabs>
  ),
}

// With badges
export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox">
      <TabList aria-label="Messages">
        <Tab
          value="inbox"
          badge={<Badge size="sm" variant="error">5</Badge>}
        >
          Inbox
        </Tab>
        <Tab
          value="sent"
          badge={<Badge size="sm" variant="secondary">12</Badge>}
        >
          Sent
        </Tab>
        <Tab value="drafts">Drafts</Tab>
        <Tab value="spam">Spam</Tab>
      </TabList>
      <TabPanel value="inbox">
        <p className="text-sm text-[var(--color-text-muted)]">5 unread messages</p>
      </TabPanel>
      <TabPanel value="sent">
        <p className="text-sm text-[var(--color-text-muted)]">12 sent messages</p>
      </TabPanel>
      <TabPanel value="drafts">
        <p className="text-sm text-[var(--color-text-muted)]">No drafts</p>
      </TabPanel>
      <TabPanel value="spam">
        <p className="text-sm text-[var(--color-text-muted)]">No spam</p>
      </TabPanel>
    </Tabs>
  ),
}

// Vertical orientation
export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="profile" orientation="vertical">
      <TabList aria-label="Settings" className="min-w-[150px]">
        <Tab value="profile">Profile</Tab>
        <Tab value="account">Account</Tab>
        <Tab value="security">Security</Tab>
        <Tab value="billing">Billing</Tab>
      </TabList>
      <div className="flex-1 pl-6">
        <TabPanel value="profile">
          <h3 className="font-medium mb-2">Profile Settings</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Update your profile information and public display name.
          </p>
        </TabPanel>
        <TabPanel value="account">
          <h3 className="font-medium mb-2">Account Settings</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Manage your account preferences and settings.
          </p>
        </TabPanel>
        <TabPanel value="security">
          <h3 className="font-medium mb-2">Security Settings</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Configure security options and two-factor authentication.
          </p>
        </TabPanel>
        <TabPanel value="billing">
          <h3 className="font-medium mb-2">Billing Settings</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Manage your subscription and payment methods.
          </p>
        </TabPanel>
      </div>
    </Tabs>
  ),
}

// Disabled tab
export const WithDisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="active">
      <TabList aria-label="Options">
        <Tab value="active">Active</Tab>
        <Tab value="pending">Pending</Tab>
        <Tab value="disabled" disabled>
          Disabled
        </Tab>
        <Tab value="archived">Archived</Tab>
      </TabList>
      <TabPanel value="active">Active content</TabPanel>
      <TabPanel value="pending">Pending content</TabPanel>
      <TabPanel value="disabled">Disabled content</TabPanel>
      <TabPanel value="archived">Archived content</TabPanel>
    </Tabs>
  ),
}
