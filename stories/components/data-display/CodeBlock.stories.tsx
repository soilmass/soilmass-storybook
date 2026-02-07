"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  CodeBlock,
  InlineCode,
  Terminal,
  DiffView,
} from "@/components/ui/code-block"

const meta = {
  title: "Components/Data Display/CodeBlock",
  component: CodeBlock,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display code snippets with line numbers, copy button, language labels, and line highlighting.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showLineNumbers: {
      control: "boolean",
      description: "Show line numbers",
    },
    showCopy: {
      control: "boolean",
      description: "Show copy button",
    },
    wrap: {
      control: "boolean",
      description: "Word wrap",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "600px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeBlock>

export default meta
type Story = StoryObj<typeof meta>

// Sample code snippets
const jsCode = `function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return name.toUpperCase();
}

greet("World");`

const reactCode = `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Count: {count}
    </button>
  );
}`

const cssCode = `:root {
  --color-primary: #2563eb;
  --color-secondary: #64748b;
  --radius-md: 0.5rem;
}

.button {
  background: var(--color-primary);
  border-radius: var(--radius-md);
  padding: 0.5rem 1rem;
}`

// Default
export const Default: Story = {
  render: () => (
    <CodeBlock
      code={jsCode}
      language="javascript"
    />
  ),
}

// With title
export const WithTitle: Story = {
  render: () => (
    <CodeBlock
      code={reactCode}
      language="tsx"
      title="Counter.tsx"
    />
  ),
}

// With line highlighting
export const LineHighlighting: Story = {
  render: () => (
    <CodeBlock
      code={reactCode}
      language="tsx"
      title="Counter.tsx"
      highlightLines={[4, 7, 8]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Highlight specific lines to draw attention to important code.",
      },
    },
  },
}

// Without line numbers
export const WithoutLineNumbers: Story = {
  render: () => (
    <CodeBlock
      code={jsCode}
      language="javascript"
      showLineNumbers={false}
    />
  ),
}

// Without copy button
export const WithoutCopyButton: Story = {
  render: () => (
    <CodeBlock
      code={jsCode}
      language="javascript"
      showCopy={false}
    />
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <CodeBlock
          code="const x = 1;"
          language="js"
          size="sm"
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium (default)</p>
        <CodeBlock
          code="const x = 1;"
          language="js"
          size="md"
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <CodeBlock
          code="const x = 1;"
          language="js"
          size="lg"
        />
      </div>
    </div>
  ),
}

// With max height (scrollable)
export const Scrollable: Story = {
  render: () => (
    <CodeBlock
      code={`// A longer code example
function processItems(items) {
  const results = [];

  for (const item of items) {
    if (item.active) {
      results.push({
        id: item.id,
        name: item.name.toUpperCase(),
        processed: true,
        timestamp: Date.now()
      });
    }
  }

  return results.sort((a, b) => a.name.localeCompare(b.name));
}

// Usage
const items = [
  { id: 1, name: "Alpha", active: true },
  { id: 2, name: "Beta", active: false },
  { id: 3, name: "Gamma", active: true }
];

const processed = processItems(items);
console.log(processed);`}
      language="javascript"
      title="process.js"
      maxHeight={200}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Long code blocks can be scrollable with a max height.",
      },
    },
  },
}

// CSS example
export const CSSCode: Story = {
  render: () => (
    <CodeBlock
      code={cssCode}
      language="css"
      title="tokens.css"
    />
  ),
}

// Word wrap
export const WordWrap: Story = {
  render: () => (
    <CodeBlock
      code={`const longString = "This is a very long string that would normally overflow the container but with word wrap enabled it will break to the next line instead of requiring horizontal scrolling";`}
      language="javascript"
      wrap
    />
  ),
}

// Inline code
export const Inline: Story = {
  render: () => (
    <p className="text-[var(--color-text)]">
      Use the <InlineCode>useState</InlineCode> hook to manage state in
      functional components. Import it from <InlineCode>react</InlineCode>.
    </p>
  ),
  parameters: {
    docs: {
      description: {
        story: "Inline code for mentioning code within paragraphs.",
      },
    },
  },
}

// Terminal
export const TerminalOutput: Story = {
  render: () => (
    <Terminal
      title="Terminal"
      lines={[
        "npm install @soilmass/ui",
        "added 125 packages in 8s",
        "npm run dev",
        "ready - started server on 0.0.0.0:3000",
        "event - compiled successfully",
      ]}
    />
  ),
}

// Terminal without prompt
export const TerminalOutputOnly: Story = {
  render: () => (
    <Terminal
      title="Build Output"
      lines={[
        "Building for production...",
        "✓ Compiled 245 modules",
        "✓ Generated static pages",
        "✓ Collected build traces",
        "Build completed in 12.5s",
      ]}
      showPrompt={false}
    />
  ),
}

// Diff view
export const Diff: Story = {
  render: () => (
    <DiffView
      title="config.js"
      lines={[
        { type: "unchanged", content: "module.exports = {" },
        { type: "removed", content: '  theme: "light",' },
        { type: "added", content: '  theme: "dark",' },
        { type: "unchanged", content: "  debug: false," },
        { type: "removed", content: "  port: 3000," },
        { type: "added", content: "  port: 8080," },
        { type: "unchanged", content: "};" },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: "Diff view for showing code changes with added/removed lines.",
      },
    },
  },
}

// Multiple code blocks (tutorial context)
export const TutorialContext: Story = {
  render: () => (
    <div className="space-y-4">
      <p className="text-[var(--color-text)]">
        First, install the dependencies:
      </p>
      <Terminal
        lines={["npm install react react-dom"]}
      />
      <p className="text-[var(--color-text)]">
        Then, create your component:
      </p>
      <CodeBlock
        code={reactCode}
        language="tsx"
        title="Counter.tsx"
        highlightLines={[4]}
      />
      <p className="text-[var(--color-text)]">
        The <InlineCode>useState</InlineCode> hook on line 4 initializes the count state.
      </p>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "650px" }}>
        <Story />
      </div>
    ),
  ],
}
