"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CopyButton,
  CopyLinkButton,
  CopyCodeBlock,
  CopyInput,
  ShareUrl,
} from "@/components/ui/copy-button"

const meta = {
  title: "Components/Utils/CopyButton",
  component: CopyButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Copy-to-clipboard functionality with feedback. Features clipboard API integration, success/error feedback, tooltip display, and multiple variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "ghost", "outline", "minimal"],
      description: "Button variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    showTooltip: {
      control: "boolean",
      description: "Show tooltip on hover",
    },
    showLabel: {
      control: "boolean",
      description: "Show text label",
    },
  },
} satisfies Meta<typeof CopyButton>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => <CopyButton value="Hello, world!" />,
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <CopyButton value="text" variant="default" />
      <CopyButton value="text" variant="ghost" />
      <CopyButton value="text" variant="outline" />
      <CopyButton value="text" variant="minimal" />
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <CopyButton value="text" size="sm" />
      <CopyButton value="text" size="md" />
      <CopyButton value="text" size="lg" />
    </div>
  ),
}

// With label
export const WithLabel: Story = {
  render: () => (
    <div className="space-y-4">
      <CopyButton value="text" showLabel variant="default" />
      <CopyButton value="text" showLabel variant="outline" />
      <CopyButton value="text" showLabel variant="ghost" />
    </div>
  ),
}

// Custom text
export const CustomText: Story = {
  render: () => (
    <CopyButton
      value="npm install @acme/package"
      showLabel
      label="Copy command"
      copiedLabel="Command copied!"
      tooltipText="Copy to clipboard"
      copiedText="Copied to clipboard!"
    />
  ),
}

// Link icon
export const LinkVariant: Story = {
  render: () => (
    <CopyButton
      value="https://example.com/share/abc123"
      iconType="link"
      tooltipText="Copy link"
      copiedText="Link copied!"
    />
  ),
}

// Copy link button
export const CopyLink: Story = {
  render: () => (
    <div className="space-y-4">
      <CopyLinkButton url="https://example.com/page" />
      <CopyLinkButton url="https://example.com/page" showLabel />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Pre-configured copy button for URLs.",
      },
    },
  },
}

// Without tooltip
export const NoTooltip: Story = {
  render: () => <CopyButton value="text" showTooltip={false} showLabel />,
}

// With callback
export const WithCallback: Story = {
  render: () => (
    <CopyButton
      value="Copied value"
      showLabel
      onCopy={(value) => console.log("Copied:", value)}
      onError={(error) => console.error("Error:", error)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Copy button with onCopy and onError callbacks.",
      },
    },
  },
}

// Copy code block
export const CodeBlock: Story = {
  render: () => (
    <div className="w-[500px]">
      <CopyCodeBlock
        code={`function greet(name) {
  return \`Hello, \${name}!\`;
}

greet("World");`}
        language="javascript"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Code block with integrated copy button.",
      },
    },
  },
}

// Code block with line numbers
export const CodeBlockLineNumbers: Story = {
  render: () => (
    <div className="w-[500px]">
      <CopyCodeBlock
        code={`import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`}
        language="tsx"
        showLineNumbers
      />
    </div>
  ),
}

// Copy input
export const InputField: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <CopyInput
        label="API Key"
        value="sk_live_abc123xyz789"
      />
      <CopyInput
        label="Webhook URL"
        value="https://api.example.com/webhooks/123"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Read-only input field with copy button.",
      },
    },
  },
}

// Share URL component
export const ShareUrlComponent: Story = {
  render: () => (
    <div className="w-[400px]">
      <ShareUrl
        url="https://example.com/share/abc123"
        title="Share this article"
        description="Copy the link below to share with others"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete share URL component with title and description.",
      },
    },
  },
}

// Terminal command
export const TerminalCommand: Story = {
  render: () => (
    <div className="w-[500px]">
      <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-surface-inverse)] rounded-[var(--radius-lg)]">
        <span className="text-[var(--color-text-muted)]">$</span>
        <code className="flex-1 font-mono text-sm text-[var(--color-text-inverse)]">
          npm install @acme/package
        </code>
        <CopyButton
          value="npm install @acme/package"
          variant="ghost"
          size="sm"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-text-inverse)]"
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Copy button in terminal command context.",
      },
    },
  },
}

// Multiple copy items
export const MultipleItems: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      {[
        { label: "Production", value: "pk_prod_abc123" },
        { label: "Development", value: "pk_dev_xyz789" },
        { label: "Test", value: "pk_test_456def" },
      ].map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between p-3 border border-[var(--color-border)] rounded-[var(--radius-md)]"
        >
          <div>
            <p className="text-sm font-medium text-[var(--color-text)]">{item.label}</p>
            <p className="text-xs font-mono text-[var(--color-text-muted)]">{item.value}</p>
          </div>
          <CopyButton value={item.value} variant="ghost" size="sm" />
        </div>
      ))}
    </div>
  ),
}

// Inline context
export const InlineContext: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      <p className="text-[var(--color-text)]">
        Your referral code is{" "}
        <code className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-surface-muted)] rounded font-mono text-sm">
          REF2024XYZ
          <CopyButton value="REF2024XYZ" variant="minimal" size="sm" />
        </code>
      </p>
      <p className="text-[var(--color-text)]">
        Install with{" "}
        <code className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--color-surface-muted)] rounded font-mono text-sm">
          npm install acme
          <CopyButton value="npm install acme" variant="minimal" size="sm" />
        </code>
      </p>
    </div>
  ),
}
