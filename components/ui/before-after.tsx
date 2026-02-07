"use client"

/**
 * Before/After Slider Component
 *
 * Image comparison with draggable divider.
 * Features:
 * - Draggable slider with glowing handle
 * - Touch/mouse support
 * - Keyboard navigation
 * - Labels for before/after
 * - Multiple orientations
 * - Glowing comparison line
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Slider handle icon
const SliderHandleIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l-4-4m8-10v14l4-4" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
)

export interface BeforeAfterProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Before image URL
   */
  beforeImage: string
  /**
   * After image URL
   */
  afterImage: string
  /**
   * Before image alt text
   */
  beforeAlt?: string
  /**
   * After image alt text
   */
  afterAlt?: string
  /**
   * Before label text
   */
  beforeLabel?: string
  /**
   * After label text
   */
  afterLabel?: string
  /**
   * Initial slider position (0-100)
   */
  initialPosition?: number
  /**
   * Slider orientation
   */
  orientation?: "horizontal" | "vertical"
  /**
   * Show labels
   */
  showLabels?: boolean
  /**
   * Rounded corners
   */
  rounded?: boolean
  /**
   * Aspect ratio
   */
  aspectRatio?: "16:9" | "4:3" | "1:1" | "auto"
  /**
   * Handle style
   */
  handleStyle?: "default" | "minimal" | "circle"
}

const aspectRatioClasses = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  auto: "",
}

export function BeforeAfter({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  initialPosition = 50,
  orientation = "horizontal",
  showLabels = true,
  rounded = true,
  aspectRatio = "16:9",
  handleStyle = "default",
  className,
  ...props
}: BeforeAfterProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [position, setPosition] = React.useState(initialPosition)
  const [isDragging, setIsDragging] = React.useState(false)

  const isHorizontal = orientation === "horizontal"

  const updatePosition = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      let newPosition: number

      if (isHorizontal) {
        newPosition = ((clientX - rect.left) / rect.width) * 100
      } else {
        newPosition = ((clientY - rect.top) / rect.height) * 100
      }

      setPosition(Math.max(0, Math.min(100, newPosition)))
    },
    [isHorizontal]
  )

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    updatePosition(e.clientX, e.clientY)
  }

  React.useEffect(() => {
    if (!isDragging) return

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY)
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, updatePosition])

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    setIsDragging(true)
    updatePosition(touch.clientX, touch.clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    const touch = e.touches[0]
    updatePosition(touch.clientX, touch.clientY)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  // Keyboard handlers
  const handleKeyDown = (e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 1
    switch (e.key) {
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault()
        setPosition((prev) => Math.max(0, prev - step))
        break
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault()
        setPosition((prev) => Math.min(100, prev + step))
        break
      case "Home":
        e.preventDefault()
        setPosition(0)
        break
      case "End":
        e.preventDefault()
        setPosition(100)
        break
    }
  }

  // Handle styles with glow effects
  const handleClasses = {
    default: cn(
      "flex items-center justify-center",
      isHorizontal ? "h-14 w-10" : "w-14 h-10",
      "rounded-[var(--radius-lg)]",
      "bg-white",
      "shadow-[0_4px_20px_rgba(0,0,0,0.2),0_0_30px_rgba(255,255,255,0.4)]",
      "hover:shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_40px_rgba(255,255,255,0.6)]",
      "text-[var(--color-text-muted)]",
      "border border-white/50",
      isDragging && "scale-110 shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_50px_rgba(255,255,255,0.8)]"
    ),
    minimal: cn(
      isHorizontal ? "h-10 w-1.5" : "w-10 h-1.5",
      "rounded-full",
      "bg-white",
      "shadow-[0_2px_10px_rgba(0,0,0,0.2),0_0_20px_rgba(255,255,255,0.5)]",
      "hover:shadow-[0_4px_15px_rgba(0,0,0,0.3),0_0_30px_rgba(255,255,255,0.7)]",
      isDragging && "scale-110"
    ),
    circle: cn(
      "flex items-center justify-center",
      "h-12 w-12 rounded-full",
      "bg-white",
      "shadow-[0_4px_20px_rgba(0,0,0,0.2),0_0_30px_rgba(255,255,255,0.4)]",
      "hover:shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_40px_rgba(255,255,255,0.6)]",
      "text-[var(--color-text-muted)]",
      "border border-white/50",
      isDragging && "scale-110 shadow-[0_8px_30px_rgba(0,0,0,0.3),0_0_50px_rgba(255,255,255,0.8)]"
    ),
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative select-none overflow-hidden",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)]",
        "transition-shadow duration-500 ease-out",
        aspectRatio !== "auto" && aspectRatioClasses[aspectRatio],
        rounded && "rounded-[var(--radius-xl)]",
        isDragging && "cursor-grabbing",
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      {...props}
    >
      {/* After image (background) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={
          isHorizontal
            ? { width: `${position}%` }
            : { height: `${position}%` }
        }
      >
        <img
          src={beforeImage}
          alt={beforeAlt}
          className={cn(
            "absolute inset-0 object-cover",
            isHorizontal ? "w-[100vw] max-w-none h-full" : "w-full h-[100vh] max-h-none"
          )}
          style={
            isHorizontal
              ? { width: containerRef.current?.offsetWidth || "100%" }
              : { height: containerRef.current?.offsetHeight || "100%" }
          }
          draggable={false}
        />
      </div>

      {/* Glowing slider line */}
      <div
        className={cn(
          "absolute",
          isHorizontal
            ? "w-0.5 h-full top-0 -translate-x-1/2"
            : "h-0.5 w-full left-0 -translate-y-1/2",
          "bg-white",
          "shadow-[0_0_15px_rgba(255,255,255,0.6),0_0_30px_rgba(255,255,255,0.3)]",
          isDragging && "shadow-[0_0_25px_rgba(255,255,255,0.8),0_0_50px_rgba(255,255,255,0.4)]"
        )}
        style={{
          ...(isHorizontal
            ? { left: `${position}%` }
            : { top: `${position}%` }),
          transition: isDragging ? "none" : "box-shadow 0.3s ease-out"
        }}
      />

      {/* Slider handle with glow */}
      <div
        className={cn(
          "absolute z-10",
          isHorizontal
            ? "top-1/2 -translate-x-1/2 -translate-y-1/2"
            : "left-1/2 -translate-x-1/2 -translate-y-1/2",
          !isDragging && "cursor-grab"
        )}
        style={{
          ...(isHorizontal
            ? { left: `${position}%` }
            : { top: `${position}%` }),
          transition: isDragging ? "none" : "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
        }}
      >
        <div
          className={handleClasses[handleStyle]}
          style={{
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          {handleStyle !== "minimal" && (
            <SliderHandleIcon />
          )}
        </div>
      </div>

      {/* Labels with glass effect */}
      {showLabels && (
        <>
          <div
            className={cn(
              "absolute px-3 py-1.5 rounded-full",
              "bg-black/40 backdrop-blur-md",
              "text-white text-xs font-medium",
              "pointer-events-none",
              "shadow-[0_2px_10px_rgba(0,0,0,0.2)]",
              isHorizontal ? "top-4 left-4" : "top-4 left-1/2 -translate-x-1/2"
            )}
          >
            {beforeLabel}
          </div>
          <div
            className={cn(
              "absolute px-3 py-1.5 rounded-full",
              "bg-black/40 backdrop-blur-md",
              "text-white text-xs font-medium",
              "pointer-events-none",
              "shadow-[0_2px_10px_rgba(0,0,0,0.2)]",
              isHorizontal ? "top-4 right-4" : "bottom-4 left-1/2 -translate-x-1/2"
            )}
          >
            {afterLabel}
          </div>
        </>
      )}
    </div>
  )
}

// Simple before/after with hover effect (no slider)
export interface BeforeAfterHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Before image URL
   */
  beforeImage: string
  /**
   * After image URL
   */
  afterImage: string
  /**
   * Before image alt text
   */
  beforeAlt?: string
  /**
   * After image alt text
   */
  afterAlt?: string
  /**
   * Before label
   */
  beforeLabel?: string
  /**
   * After label
   */
  afterLabel?: string
  /**
   * Rounded corners
   */
  rounded?: boolean
}

export function BeforeAfterHover({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  rounded = true,
  className,
  ...props
}: BeforeAfterHoverProps) {
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden group",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)]",
        "transition-all duration-500 ease-out",
        rounded && "rounded-[var(--radius-xl)]",
        className
      )}
      {...props}
    >
      {/* Before image (visible by default) */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        className={cn(
          "absolute inset-0 w-full h-full object-cover",
          "transition-opacity duration-500 ease-out",
          "group-hover:opacity-0"
        )}
      />

      {/* After image (visible on hover) */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Labels with glass effect */}
      <div
        className={cn(
          "absolute top-4 left-4 px-3 py-1.5 rounded-full",
          "bg-black/40 backdrop-blur-md",
          "text-white text-xs font-medium",
          "transition-all duration-500 ease-out",
          "shadow-[0_2px_10px_rgba(0,0,0,0.2)]",
          "group-hover:opacity-0 group-hover:translate-x-2"
        )}
      >
        {beforeLabel}
      </div>
      <div
        className={cn(
          "absolute top-4 right-4 px-3 py-1.5 rounded-full",
          "bg-black/40 backdrop-blur-md",
          "text-white text-xs font-medium",
          "transition-all duration-500 ease-out",
          "shadow-[0_2px_10px_rgba(0,0,0,0.2)]",
          "opacity-0 -translate-x-2",
          "group-hover:opacity-100 group-hover:translate-x-0"
        )}
      >
        {afterLabel}
      </div>

      {/* Hover hint with glass effect */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 py-3 text-center",
          "bg-gradient-to-t from-black/60 via-black/30 to-transparent",
          "backdrop-blur-[2px]",
          "text-white text-xs font-medium",
          "transition-all duration-500 ease-out",
          "group-hover:opacity-0 group-hover:translate-y-2"
        )}
      >
        Hover to compare
      </div>
    </div>
  )
}

// Before/after with tabs
export interface BeforeAfterTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Before image URL
   */
  beforeImage: string
  /**
   * After image URL
   */
  afterImage: string
  /**
   * Before image alt text
   */
  beforeAlt?: string
  /**
   * After image alt text
   */
  afterAlt?: string
  /**
   * Before label
   */
  beforeLabel?: string
  /**
   * After label
   */
  afterLabel?: string
  /**
   * Default tab
   */
  defaultTab?: "before" | "after"
  /**
   * Rounded corners
   */
  rounded?: boolean
}

export function BeforeAfterTabs({
  beforeImage,
  afterImage,
  beforeAlt = "Before",
  afterAlt = "After",
  beforeLabel = "Before",
  afterLabel = "After",
  defaultTab = "before",
  rounded = true,
  className,
  ...props
}: BeforeAfterTabsProps) {
  const [activeTab, setActiveTab] = React.useState<"before" | "after">(defaultTab)

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {/* Tabs with glass effect */}
      <div className="flex justify-center">
        <div className="inline-flex gap-1.5 p-1.5 rounded-full bg-[var(--color-surface-muted)]/80 backdrop-blur-sm shadow-[0_2px_10px_rgba(0,0,0,0.08)]">
          <button
            type="button"
            onClick={() => setActiveTab("before")}
            className={cn(
              "px-5 py-2 text-sm font-medium rounded-full",
              "transition-all duration-400",
              activeTab === "before"
                ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-[0_2px_10px_rgba(0,0,0,0.1)] scale-105"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:scale-102"
            )}
            style={{
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {beforeLabel}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("after")}
            className={cn(
              "px-5 py-2 text-sm font-medium rounded-full",
              "transition-all duration-400",
              activeTab === "after"
                ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-[0_2px_10px_rgba(0,0,0,0.1)] scale-105"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:scale-102"
            )}
            style={{
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {afterLabel}
          </button>
        </div>
      </div>

      {/* Image with shadow */}
      <div
        className={cn(
          "relative aspect-video overflow-hidden",
          "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
          "hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)]",
          "transition-shadow duration-500 ease-out",
          rounded && "rounded-[var(--radius-xl)]"
        )}
      >
        <img
          src={activeTab === "before" ? beforeImage : afterImage}
          alt={activeTab === "before" ? beforeAlt : afterAlt}
          className="w-full h-full object-cover"
          style={{
            transition: "opacity 0.5s ease-out"
          }}
        />
      </div>
    </div>
  )
}

// Comparison grid (multiple before/after pairs)
export interface ComparisonGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Comparison items
   */
  items: Array<{
    beforeImage: string
    afterImage: string
    beforeAlt?: string
    afterAlt?: string
    title?: string
    description?: string
  }>
  /**
   * Number of columns
   */
  columns?: 1 | 2 | 3
  /**
   * Comparison style
   */
  style?: "slider" | "hover" | "tabs"
}

const gridColumnsClasses = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
}

export function ComparisonGrid({
  items,
  columns = 2,
  style = "slider",
  className,
  ...props
}: ComparisonGridProps) {
  const Component = style === "hover" ? BeforeAfterHover : style === "tabs" ? BeforeAfterTabs : BeforeAfter

  return (
    <div
      className={cn("grid gap-8", gridColumnsClasses[columns], className)}
      {...props}
    >
      {items.map((item, index) => (
        <div key={index} className="space-y-4">
          <Component
            beforeImage={item.beforeImage}
            afterImage={item.afterImage}
            beforeAlt={item.beforeAlt}
            afterAlt={item.afterAlt}
          />
          {(item.title || item.description) && (
            <div>
              {item.title && (
                <h3 className="font-semibold text-[var(--color-text)]">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {item.description}
                </p>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
