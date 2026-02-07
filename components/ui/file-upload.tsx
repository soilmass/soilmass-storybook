"use client"

/**
 * File Upload Component
 *
 * File input with drag-and-drop support.
 * Features:
 * - Drag and drop zone
 * - File type validation
 * - Multiple file support
 * - File list with remove
 * - Size limits
 */

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "./button"

// Icons
const UploadIcon = () => (
  <svg
    className="h-10 w-10 text-[var(--color-text-muted)]"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const FileIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
)

const CloseIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
)

// Format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B"
  const k = 1024
  const sizes = ["B", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`
}

export interface FileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value" | "type"> {
  /**
   * Selected files
   */
  value?: File[]
  /**
   * Callback when files change
   */
  onChange?: (files: File[]) => void
  /**
   * Accepted file types (MIME types or extensions)
   */
  accept?: string
  /**
   * Allow multiple files
   */
  multiple?: boolean
  /**
   * Maximum file size in bytes
   */
  maxSize?: number
  /**
   * Maximum number of files
   */
  maxFiles?: number
  /**
   * Label text
   */
  label?: string
  /**
   * Description text
   */
  description?: string
  /**
   * Error state
   */
  error?: boolean
  /**
   * Error message
   */
  errorMessage?: string
  /**
   * Compact mode (button only)
   */
  compact?: boolean
}

export function FileUpload({
  value = [],
  onChange,
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  label,
  description,
  error,
  errorMessage,
  compact = false,
  disabled,
  className,
  id,
  ...props
}: FileUploadProps) {
  const [isDragOver, setIsDragOver] = React.useState(false)
  const [internalError, setInternalError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const generatedId = React.useId()
  const inputId = id || generatedId

  const displayError = errorMessage || internalError

  const validateFile = React.useCallback(
    (file: File): string | null => {
      // Check size
      if (maxSize && file.size > maxSize) {
        return `File "${file.name}" exceeds maximum size of ${formatFileSize(maxSize)}`
      }

      // Check type if accept is specified
      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim().toLowerCase())
        const fileType = file.type.toLowerCase()
        const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return fileExtension === type
          }
          if (type.endsWith("/*")) {
            return fileType.startsWith(type.replace("/*", "/"))
          }
          return fileType === type
        })

        if (!isAccepted) {
          return `File "${file.name}" is not an accepted file type`
        }
      }

      return null
    },
    [accept, maxSize]
  )

  const handleFiles = React.useCallback(
    (newFiles: FileList | File[]) => {
      const filesArray = Array.from(newFiles)
      setInternalError(null)

      // Check max files
      if (maxFiles && value.length + filesArray.length > maxFiles) {
        setInternalError(`Maximum ${maxFiles} files allowed`)
        return
      }

      // Validate each file
      const validFiles: File[] = []
      for (const file of filesArray) {
        const error = validateFile(file)
        if (error) {
          setInternalError(error)
          return
        }
        validFiles.push(file)
      }

      // If not multiple, replace existing
      const updatedFiles = multiple ? [...value, ...validFiles] : validFiles
      onChange?.(updatedFiles)
    },
    [value, multiple, maxFiles, validateFile, onChange]
  )

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (!disabled && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
      // Reset input to allow selecting same file again
      e.target.value = ""
    }
  }

  const removeFile = (index: number) => {
    const updated = value.filter((_, i) => i !== index)
    onChange?.(updated)
  }

  const openFilePicker = () => {
    inputRef.current?.click()
  }

  // Hidden input
  const hiddenInput = (
    <input
      ref={inputRef}
      type="file"
      id={inputId}
      accept={accept}
      multiple={multiple}
      disabled={disabled}
      onChange={handleInputChange}
      className="sr-only"
      {...props}
    />
  )

  // Compact mode - button only
  if (compact) {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
          >
            {label}
          </label>
        )}
        {hiddenInput}
        <Button
          type="button"
          variant="outline"
          onClick={openFilePicker}
          disabled={disabled}
        >
          Choose file{multiple ? "s" : ""}
        </Button>
        {value.length > 0 && (
          <span className="ml-2 text-sm text-[var(--color-text-muted)]">
            {value.length} file{value.length > 1 ? "s" : ""} selected
          </span>
        )}
        {displayError && (
          <p className="mt-1.5 text-sm text-[var(--color-error)]" role="alert">
            {displayError}
          </p>
        )}
      </div>
    )
  }

  // Full drop zone
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-[var(--color-text)] mb-1.5"
        >
          {label}
        </label>
      )}

      {hiddenInput}

      {/* Drop zone */}
      <div
        onClick={openFilePicker}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "relative flex flex-col items-center justify-center",
          "border-2 border-dashed rounded-[var(--radius-lg)]",
          "p-8 cursor-pointer",
          // Premium transitions
          "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
          // Dashed border animation on hover
          isDragOver
            ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5 shadow-[var(--shadow-primary-md)] ring-[3px] ring-[var(--color-focus-ring)]"
            : "border-[var(--color-border)] hover:border-[var(--color-border-hover)] hover:shadow-[var(--shadow-sm)]",
          // Drop zone glow when active
          isDragOver && "scale-[1.01]",
          // Error
          error && "border-[var(--color-error)] shadow-[var(--shadow-error-sm)]",
          // Disabled
          disabled && "opacity-50 cursor-not-allowed hover:shadow-none"
        )}
      >
        <UploadIcon />
        <p className="mt-4 text-sm text-[var(--color-text)]">
          <span className="font-medium text-[var(--color-primary)]">
            Click to upload
          </span>{" "}
          or drag and drop
        </p>
        {description && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            {description}
          </p>
        )}
        {(accept || maxSize) && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            {accept && `Accepted: ${accept}`}
            {accept && maxSize && " • "}
            {maxSize && `Max size: ${formatFileSize(maxSize)}`}
          </p>
        )}
      </div>

      {/* Error message */}
      {displayError && (
        <p className="mt-2 text-sm text-[var(--color-error)]" role="alert">
          {displayError}
        </p>
      )}

      {/* File list */}
      {value.length > 0 && (
        <ul className="mt-4 space-y-2">
          {value.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className={cn(
                "flex items-center gap-3 p-3",
                "rounded-[var(--radius-md)] border border-[var(--color-border)]",
                "bg-[var(--color-surface)]",
                // Premium shadow and transitions
                "shadow-[var(--shadow-xs)]",
                "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
                "hover:shadow-[var(--shadow-sm)] hover:border-[var(--color-border-hover)]"
              )}
            >
              <span className="text-[var(--color-text-muted)]">
                <FileIcon />
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[var(--color-text)] truncate">
                  {file.name}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {formatFileSize(file.size)}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className={cn(
                  "p-1 rounded-[var(--radius-sm)]",
                  "text-[var(--color-text-muted)] hover:text-[var(--color-error)]",
                  "hover:bg-[var(--color-error)]/10",
                  // Premium transitions
                  "transition-all duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
                  "hover:scale-110 active:scale-95"
                )}
                aria-label={`Remove ${file.name}`}
              >
                <CloseIcon />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
