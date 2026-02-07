import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  StatCard,
  StatGroup,
  InlineStat,
  ComparisonStat,
} from "@/components/ui/stat-card"

const meta = {
  title: "Components/Data Display/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display KPIs and metrics with value, label, trend indicators, and comparison text.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    trend: {
      control: "radio",
      options: ["up", "down", "neutral"],
      description: "Trend direction",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    variant: {
      control: "radio",
      options: ["default", "filled", "outline"],
      description: "Visual variant",
    },
    loading: {
      control: "boolean",
      description: "Loading state",
    },
  },
} satisfies Meta<typeof StatCard>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => (
    <div className="w-64">
      <StatCard
        label="Total Revenue"
        value="$45,231"
      />
    </div>
  ),
}

// With trend up
export const TrendUp: Story = {
  render: () => (
    <div className="w-64">
      <StatCard
        label="Total Revenue"
        value="$45,231"
        trend="up"
        trendValue={12.5}
        comparison="vs last month"
      />
    </div>
  ),
}

// With trend down
export const TrendDown: Story = {
  render: () => (
    <div className="w-64">
      <StatCard
        label="Bounce Rate"
        value="42.8%"
        trend="down"
        trendValue={-5.2}
        comparison="vs last week"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Note: A downward trend can be positive (like for bounce rate) or negative depending on context.",
      },
    },
  },
}

// With icon
export const WithIcon: Story = {
  render: () => (
    <div className="w-64">
      <StatCard
        label="Active Users"
        value="2,453"
        trend="up"
        trendValue={8}
        comparison="vs last month"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
      />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <div className="w-48">
          <StatCard
            size="sm"
            label="Users"
            value="1,234"
            trend="up"
            trendValue={5}
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium (default)</p>
        <div className="w-56">
          <StatCard
            size="md"
            label="Users"
            value="1,234"
            trend="up"
            trendValue={5}
          />
        </div>
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <div className="w-72">
          <StatCard
            size="lg"
            label="Users"
            value="1,234"
            trend="up"
            trendValue={5}
          />
        </div>
      </div>
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="w-64">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Default</p>
        <StatCard
          variant="default"
          label="Revenue"
          value="$12,345"
        />
      </div>
      <div className="w-64">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Filled</p>
        <StatCard
          variant="filled"
          label="Revenue"
          value="$12,345"
        />
      </div>
      <div className="w-64">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Outline</p>
        <StatCard
          variant="outline"
          label="Revenue"
          value="$12,345"
        />
      </div>
    </div>
  ),
}

// Loading state
export const Loading: Story = {
  render: () => (
    <div className="w-64">
      <StatCard
        label="Loading..."
        value=""
        loading
      />
    </div>
  ),
}

// Stat group
export const Group: Story = {
  render: () => (
    <StatGroup columns={4}>
      <StatCard
        label="Total Revenue"
        value="$45,231"
        trend="up"
        trendValue={12.5}
        comparison="vs last month"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <StatCard
        label="Active Users"
        value="2,453"
        trend="up"
        trendValue={8}
        comparison="vs last month"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        }
      />
      <StatCard
        label="Conversion Rate"
        value="3.2%"
        trend="down"
        trendValue={-0.4}
        comparison="vs last month"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
        }
      />
      <StatCard
        label="Avg. Order Value"
        value="$127"
        trend="up"
        trendValue={4.1}
        comparison="vs last month"
        icon={
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        }
      />
    </StatGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "900px" }}>
        <Story />
      </div>
    ),
  ],
}

// 3 column layout
export const ThreeColumns: Story = {
  render: () => (
    <StatGroup columns={3}>
      <StatCard
        label="Page Views"
        value="142,543"
        trend="up"
        trendValue={15}
      />
      <StatCard
        label="Unique Visitors"
        value="45,231"
        trend="up"
        trendValue={8}
      />
      <StatCard
        label="Bounce Rate"
        value="34.2%"
        trend="down"
        trendValue={-2.1}
      />
    </StatGroup>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "700px" }}>
        <Story />
      </div>
    ),
  ],
}

// Inline stat
export const Inline: Story = {
  render: () => (
    <div className="flex gap-8">
      <InlineStat label="users" value="1,234" />
      <InlineStat label="orders" value="856" />
      <InlineStat label="revenue" value="$12,345" />
    </div>
  ),
}

// Inline stat with suffix
export const InlineWithSuffix: Story = {
  render: () => (
    <div className="flex gap-8">
      <InlineStat label="uptime" value="99.9" suffix="%" />
      <InlineStat label="response time" value="45" suffix="ms" />
      <InlineStat label="requests" value="1.2" suffix="M" />
    </div>
  ),
}

// Comparison stat
export const Comparison: Story = {
  render: () => (
    <div className="w-80">
      <ComparisonStat
        label="Conversion Rate"
        before="2.4%"
        after="3.8%"
        beforeLabel="Last month"
        afterLabel="This month"
      />
    </div>
  ),
}

// Comparison stat (negative)
export const ComparisonNegative: Story = {
  render: () => (
    <div className="w-80">
      <ComparisonStat
        label="Average Load Time"
        before="1.2s"
        after="0.8s"
        beforeLabel="Before"
        afterLabel="After"
      />
    </div>
  ),
}

// Dashboard context
export const DashboardContext: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-[var(--color-text)]">
          Dashboard Overview
        </h2>
        <select className="px-3 py-1.5 text-sm border rounded-md">
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <StatGroup columns={4}>
        <StatCard
          label="Total Revenue"
          value="$45,231"
          trend="up"
          trendValue={12.5}
          comparison="vs last period"
        />
        <StatCard
          label="Orders"
          value="1,234"
          trend="up"
          trendValue={8}
          comparison="vs last period"
        />
        <StatCard
          label="Customers"
          value="5,678"
          trend="up"
          trendValue={15}
          comparison="vs last period"
        />
        <StatCard
          label="Avg. Order"
          value="$36.67"
          trend="down"
          trendValue={-2.3}
          comparison="vs last period"
        />
      </StatGroup>
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
