"use client"

/**
 * Slider/Range Component
 *
 * Numeric range input with drag interaction.
 * Features:
 * - Single value mode
 * - Range mode (two thumbs)
 * - Step increments
 * - Marks/ticks
 * - Keyboard accessible
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Current value(s)
   */
  value?: number[]
  /**
   * Default value(s)
   */
  defaultValue?: number[]
  /**
   * Callback when value changes
   */
  onValueChange?: (value: number[]) => void
  /**
   * Minimum value
   */
  min?: number
  /**
   * Maximum value
   */
  max?: number
  /**
   * Step increment
   */
  step?: number
  /**
   * Disabled state
   */
  disabled?: boolean
  /**
   * Show marks at step intervals
   */
  showMarks?: boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
}

const sizeClasses = {
  sm: {
    track: "h-1",
    thumb: "h-4 w-4",
  },
  md: {
    track: "h-2",
    thumb: "h-5 w-5",
  },
  lg: {
    track: "h-3",
    thumb: "h-6 w-6",
  },
}

export function Slider({
  value,
  defaultValue = [50],
  onValueChange,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  showMarks = false,
  size = "md",
  className,
  ...props
}: SliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const currentValue = value !== undefined ? value : internalValue

  const trackRef = React.useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = React.useState<number | null>(null)

  const updateValue = React.useCallback(
    (index: number, newVal: number) => {
      // Clamp value
      const clampedVal = Math.min(Math.max(newVal, min), max)
      // Round to step
      const steppedVal = Math.round(clampedVal / step) * step

      const newValues = [...currentValue]
      newValues[index] = steppedVal

      // For range slider, ensure values don't cross
      if (currentValue.length === 2) {
        if (index === 0 && steppedVal > currentValue[1]) {
          newValues[0] = currentValue[1]
        } else if (index === 1 && steppedVal < currentValue[0]) {
          newValues[1] = currentValue[0]
        }
      }

      if (value === undefined) {
        setInternalValue(newValues)
      }
      onValueChange?.(newValues)
    },
    [currentValue, min, max, step, value, onValueChange]
  )

  const getValueFromPosition = React.useCallback(
    (clientX: number) => {
      if (!trackRef.current) return 0

      const rect = trackRef.current.getBoundingClientRect()
      const percent = (clientX - rect.left) / rect.width
      return min + percent * (max - min)
    },
    [min, max]
  )

  // Mouse/touch handlers
  const handlePointerDown = React.useCallback(
    (index: number) => (e: React.PointerEvent) => {
      if (disabled) return
      e.preventDefault()
      setIsDragging(index)
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [disabled]
  )

  const handlePointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (isDragging === null || disabled) return
      const newVal = getValueFromPosition(e.clientX)
      updateValue(isDragging, newVal)
    },
    [isDragging, disabled, getValueFromPosition, updateValue]
  )

  const handlePointerUp = React.useCallback(() => {
    setIsDragging(null)
  }, [])

  // Click on track
  const handleTrackClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return
      const newVal = getValueFromPosition(e.clientX)

      // For range slider, move closest thumb
      if (currentValue.length === 2) {
        const dist0 = Math.abs(currentValue[0] - newVal)
        const dist1 = Math.abs(currentValue[1] - newVal)
        updateValue(dist0 < dist1 ? 0 : 1, newVal)
      } else {
        updateValue(0, newVal)
      }
    },
    [disabled, currentValue, getValueFromPosition, updateValue]
  )

  // Keyboard handlers
  const handleKeyDown = React.useCallback(
    (index: number) => (e: React.KeyboardEvent) => {
      if (disabled) return

      let delta = 0
      switch (e.key) {
        case "ArrowRight":
        case "ArrowUp":
          delta = step
          break
        case "ArrowLeft":
        case "ArrowDown":
          delta = -step
          break
        case "PageUp":
          delta = step * 10
          break
        case "PageDown":
          delta = -step * 10
          break
        case "Home":
          updateValue(index, min)
          return
        case "End":
          updateValue(index, max)
          return
        default:
          return
      }

      e.preventDefault()
      updateValue(index, currentValue[index] + delta)
    },
    [disabled, step, min, max, currentValue, updateValue]
  )

  const getPercent = (val: number) => ((val - min) / (max - min)) * 100

  // Generate marks
  const marks = React.useMemo(() => {
    if (!showMarks) return []
    const numMarks = Math.floor((max - min) / step) + 1
    return Array.from({ length: numMarks }, (_, i) => min + i * step)
  }, [showMarks, min, max, step])

  const sizeConfig = sizeClasses[size]

  return (
    <div className={cn("relative w-full", className)} {...props}>
      {/* Track */}
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        className={cn(
          "relative w-full cursor-pointer rounded-full",
          "bg-[var(--color-surface-active)]",
          // Track shadow
          "shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]",
          sizeConfig.track,
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        {/* Filled range */}
        <div
          className={cn(
            "absolute h-full rounded-full",
            "bg-[var(--color-primary)]",
            // Subtle glow on the filled track
            "shadow-[var(--shadow-primary-sm)]"
          )}
          style={{
            left: currentValue.length === 2 ? `${getPercent(currentValue[0])}%` : 0,
            right:
              currentValue.length === 2
                ? `${100 - getPercent(currentValue[1])}%`
                : `${100 - getPercent(currentValue[0])}%`,
          }}
        />

        {/* Thumbs */}
        {currentValue.map((val, index) => (
          <div
            key={index}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            aria-disabled={disabled}
            onPointerDown={handlePointerDown(index)}
            onKeyDown={handleKeyDown(index)}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 -translate-x-1/2",
              "rounded-full bg-white border-2 border-[var(--color-primary)]",
              "cursor-grab active:cursor-grabbing",
              // Premium transitions
              "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
              // Rest shadow
              "shadow-[var(--shadow-sm)]",
              // Hover glow
              "hover:shadow-[var(--shadow-primary-md)] hover:scale-110",
              // Focus
              "focus:outline-none focus:ring-[3px] focus:ring-[var(--color-focus-ring)]",
              "focus:shadow-[var(--shadow-primary-md)]",
              // Active/dragging glow
              "active:shadow-[var(--shadow-primary-lg)] active:scale-105",
              sizeConfig.thumb,
              disabled && "cursor-not-allowed hover:scale-100 hover:shadow-[var(--shadow-sm)]"
            )}
            style={{ left: `${getPercent(val)}%` }}
          />
        ))}
      </div>

      {/* Marks */}
      {showMarks && marks.length > 0 && marks.length <= 20 && (
        <div className="relative w-full mt-2">
          {marks.map((mark) => (
            <span
              key={mark}
              className={cn(
                "absolute -translate-x-1/2",
                "text-xs text-[var(--color-text-muted)]"
              )}
              style={{ left: `${getPercent(mark)}%` }}
            >
              {mark}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Convenience wrapper for labeled slider
export interface LabeledSliderProps extends SliderProps {
  label: string
  showValue?: boolean
  formatValue?: (value: number[]) => string
}

export function LabeledSlider({
  label,
  showValue = true,
  formatValue = (v) => (v.length === 2 ? `${v[0]} - ${v[1]}` : String(v[0])),
  value,
  defaultValue,
  onValueChange,
  ...props
}: LabeledSliderProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || [50])
  const currentValue = value !== undefined ? value : internalValue

  const handleChange = (newValue: number[]) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <label className="text-sm font-medium text-[var(--color-text)]">
          {label}
        </label>
        {showValue && (
          <span className="text-sm text-[var(--color-text-muted)]">
            {formatValue(currentValue)}
          </span>
        )}
      </div>
      <Slider
        value={currentValue}
        onValueChange={handleChange}
        {...props}
      />
    </div>
  )
}
