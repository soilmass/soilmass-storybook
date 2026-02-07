"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { FileUpload } from "@/components/ui/file-upload"

const meta = {
  title: "Components/Forms/FileUpload",
  component: FileUpload,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "File input with drag-and-drop support. Features file type validation, size limits, multiple file support, and file list with remove.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    multiple: {
      control: "boolean",
      description: "Allow multiple files",
    },
    compact: {
      control: "boolean",
      description: "Compact mode (button only)",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

// Interactive Demo
function FileUploadDemo(props: Partial<Parameters<typeof FileUpload>[0]>) {
  const [files, setFiles] = useState<File[]>([])

  return (
    <FileUpload
      value={files}
      onChange={setFiles}
      {...props}
    />
  )
}

// Default
export const Default: Story = {
  render: () => <FileUploadDemo />,
}

// With label
export const WithLabel: Story = {
  render: () => (
    <FileUploadDemo
      label="Upload file"
      description="Drag and drop your file here"
    />
  ),
}

// Accept specific types
export const ImageOnly: Story = {
  render: () => (
    <FileUploadDemo
      label="Upload image"
      accept="image/*"
      description="PNG, JPG, GIF up to 5MB"
    />
  ),
}

// Multiple files
export const MultipleFiles: Story = {
  render: () => (
    <FileUploadDemo
      label="Upload files"
      multiple
      maxFiles={5}
      description="Upload up to 5 files"
    />
  ),
}

// With size limit
export const WithSizeLimit: Story = {
  render: () => (
    <FileUploadDemo
      label="Upload document"
      accept=".pdf,.doc,.docx"
      maxSize={5 * 1024 * 1024} // 5MB
    />
  ),
}

// Compact mode
export const Compact: Story = {
  render: () => (
    <FileUploadDemo
      label="Profile picture"
      accept="image/*"
      compact
    />
  ),
}

// Error state
export const WithError: Story = {
  render: () => (
    <FileUploadDemo
      label="Upload file"
      error
      errorMessage="File type not supported"
    />
  ),
}

// Disabled
export const Disabled: Story = {
  render: () => (
    <FileUploadDemo
      label="Upload file"
      disabled
    />
  ),
}

// Document upload
export const DocumentUpload: Story = {
  render: () => (
    <FileUploadDemo
      label="Legal documents"
      accept=".pdf,.doc,.docx"
      multiple
      maxFiles={10}
      maxSize={10 * 1024 * 1024}
      description="PDF or Word documents only"
    />
  ),
}

// Avatar upload
function AvatarUploadDemo() {
  const [files, setFiles] = useState<File[]>([])

  return (
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-full bg-[var(--color-surface-muted)] flex items-center justify-center">
        {files[0] ? (
          <img
            src={URL.createObjectURL(files[0])}
            alt="Avatar preview"
            className="h-full w-full rounded-full object-cover"
          />
        ) : (
          <svg className="h-8 w-8 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )}
      </div>
      <FileUpload
        value={files}
        onChange={setFiles}
        accept="image/*"
        maxSize={2 * 1024 * 1024}
        compact
      />
    </div>
  )
}

export const AvatarUpload: Story = {
  render: () => <AvatarUploadDemo />,
  parameters: {
    docs: {
      description: {
        story: "Compact file upload for avatar/profile picture.",
      },
    },
  },
}

// Form context
function FormContextDemo() {
  const [resume, setResume] = useState<File[]>([])
  const [cover, setCover] = useState<File[]>([])
  const [portfolio, setPortfolio] = useState<File[]>([])

  return (
    <div className="space-y-6">
      <h3 className="font-medium text-[var(--color-text)]">Job Application</h3>

      <FileUpload
        label="Resume"
        value={resume}
        onChange={setResume}
        accept=".pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024}
        description="PDF or Word document"
      />

      <FileUpload
        label="Cover Letter (Optional)"
        value={cover}
        onChange={setCover}
        accept=".pdf,.doc,.docx"
        maxSize={5 * 1024 * 1024}
        compact
      />

      <FileUpload
        label="Portfolio"
        value={portfolio}
        onChange={setPortfolio}
        accept="image/*,.pdf"
        multiple
        maxFiles={5}
        maxSize={10 * 1024 * 1024}
        description="Images or PDFs, up to 5 files"
      />
    </div>
  )
}

export const ApplicationForm: Story = {
  render: () => <FormContextDemo />,
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
}
