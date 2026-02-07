"use client"

/**
 * Calendar Component
 *
 * Date display and selection.
 * Features:
 * - Single date selection
 * - Date range selection
 * - Disabled dates
 * - Month/year navigation
 * - Min/max dates
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const ChevronLeftIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

// Date helpers
const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

function isSameDay(a: Date | null, b: Date | null): boolean {
  if (!a || !b) return false
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

function isInRange(date: Date, start: Date | null, end: Date | null): boolean {
  if (!start || !end) return false
  return date >= start && date <= end
}

function formatDate(date: Date): string {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * Selected date (single selection)
   */
  value?: Date | null
  /**
   * Callback when date is selected
   */
  onChange?: (date: Date | null) => void
  /**
   * Range selection start date
   */
  rangeStart?: Date | null
  /**
   * Range selection end date
   */
  rangeEnd?: Date | null
  /**
   * Callback for range selection
   */
  onRangeChange?: (start: Date | null, end: Date | null) => void
  /**
   * Enable range selection mode
   */
  range?: boolean
  /**
   * Minimum selectable date
   */
  minDate?: Date
  /**
   * Maximum selectable date
   */
  maxDate?: Date
  /**
   * Dates to disable
   */
  disabledDates?: Date[]
  /**
   * Function to determine if a date is disabled
   */
  isDateDisabled?: (date: Date) => boolean
  /**
   * Size variant
   */
  size?: "sm" | "md" | "lg"
  /**
   * Show week numbers
   */
  showWeekNumbers?: boolean
}

const sizeClasses = {
  sm: {
    cell: "h-7 w-7 text-xs",
    header: "text-xs",
    nav: "h-6 w-6",
  },
  md: {
    cell: "h-9 w-9 text-sm",
    header: "text-sm",
    nav: "h-8 w-8",
  },
  lg: {
    cell: "h-11 w-11 text-base",
    header: "text-base",
    nav: "h-10 w-10",
  },
}

export function Calendar({
  value,
  onChange,
  rangeStart,
  rangeEnd,
  onRangeChange,
  range = false,
  minDate,
  maxDate,
  disabledDates = [],
  isDateDisabled,
  size = "md",
  showWeekNumbers = false,
  className,
  ...props
}: CalendarProps) {
  const today = new Date()
  const [viewDate, setViewDate] = React.useState(() => value || rangeStart || today)
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null)
  const [selecting, setSelecting] = React.useState<"start" | "end" | null>(
    range ? "start" : null
  )

  const sizeClass = sizeClasses[size]

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  // Generate calendar grid
  const days: (Date | null)[] = []
  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  // Days of month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i))
  }

  const isDisabled = (date: Date): boolean => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    if (disabledDates.some((d) => isSameDay(d, date))) return true
    if (isDateDisabled?.(date)) return true
    return false
  }

  const handleDateClick = (date: Date) => {
    if (isDisabled(date)) return

    if (range) {
      if (selecting === "start" || !rangeStart) {
        onRangeChange?.(date, null)
        setSelecting("end")
      } else {
        // Ensure start is before end
        if (date < rangeStart) {
          onRangeChange?.(date, rangeStart)
        } else {
          onRangeChange?.(rangeStart, date)
        }
        setSelecting("start")
      }
    } else {
      onChange?.(date)
    }
  }

  const goToPrevMonth = () => {
    setViewDate(new Date(year, month - 1, 1))
  }

  const goToNextMonth = () => {
    setViewDate(new Date(year, month + 1, 1))
  }

  const goToToday = () => {
    setViewDate(today)
    if (!range) {
      onChange?.(today)
    }
  }

  // Determine range highlight
  const getInRange = (date: Date): boolean => {
    if (!range) return false

    const start = rangeStart
    const end = rangeEnd || hoverDate

    if (!start || !end) return false

    const [rangeStartDate, rangeEndDate] = start < end ? [start, end] : [end, start]
    return isInRange(date, rangeStartDate, rangeEndDate)
  }

  return (
    <div
      className={cn(
        "p-3 bg-[var(--color-surface)]",
        "border border-[var(--color-border-subtle)]",
        "rounded-[var(--radius-lg)]",
        "shadow-[var(--shadow-card)]",
        "transition-shadow duration-300 ease-[var(--ease-spring)]",
        "hover:shadow-[var(--shadow-card-hover)]",
        className
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          type="button"
          onClick={goToPrevMonth}
          className={cn(
            "flex items-center justify-center rounded-[var(--radius-md)]",
            "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            "hover:bg-[var(--color-surface-hover)]",
            "transition-all duration-200 ease-[var(--ease-spring)]",
            "hover:-translate-x-0.5 active:scale-95",
            sizeClass.nav
          )}
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </button>

        <button
          type="button"
          onClick={goToToday}
          className={cn(
            "font-medium text-[var(--color-text)]",
            "hover:text-[var(--color-primary)]",
            "transition-colors",
            sizeClass.header
          )}
        >
          {MONTHS[month]} {year}
        </button>

        <button
          type="button"
          onClick={goToNextMonth}
          className={cn(
            "flex items-center justify-center rounded-[var(--radius-md)]",
            "text-[var(--color-text-muted)] hover:text-[var(--color-text)]",
            "hover:bg-[var(--color-surface-hover)]",
            "transition-all duration-200 ease-[var(--ease-spring)]",
            "hover:translate-x-0.5 active:scale-95",
            sizeClass.nav
          )}
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Day headers */}
      <div className={cn("grid gap-0.5", showWeekNumbers ? "grid-cols-8" : "grid-cols-7")}>
        {showWeekNumbers && (
          <div className={cn("flex items-center justify-center", sizeClass.cell)} />
        )}
        {DAYS.map((day) => (
          <div
            key={day}
            className={cn(
              "flex items-center justify-center",
              "font-medium text-[var(--color-text-muted)]",
              sizeClass.cell
            )}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div
        className={cn("grid gap-0.5 mt-1", showWeekNumbers ? "grid-cols-8" : "grid-cols-7")}
        role="grid"
      >
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className={sizeClass.cell} />
          }

          const isToday = isSameDay(date, today)
          const isSelected = !range && isSameDay(date, value)
          const isRangeStart = range && isSameDay(date, rangeStart)
          const isRangeEnd = range && isSameDay(date, rangeEnd)
          const inRange = getInRange(date)
          const disabled = isDisabled(date)

          // Add week number at start of each week
          const showWeekNum = showWeekNumbers && index % 7 === 0
          const weekNum = showWeekNum
            ? Math.ceil((index / 7) + 1)
            : null

          return (
            <React.Fragment key={date.toISOString()}>
              {showWeekNum && (
                <div
                  className={cn(
                    "flex items-center justify-center",
                    "text-xs text-[var(--color-text-muted)]",
                    sizeClass.cell
                  )}
                >
                  {weekNum}
                </div>
              )}
              <button
                type="button"
                onClick={() => handleDateClick(date)}
                onMouseEnter={() => range && setHoverDate(date)}
                onMouseLeave={() => range && setHoverDate(null)}
                disabled={disabled}
                className={cn(
                  "flex items-center justify-center rounded-[var(--radius-md)]",
                  "transition-all duration-200 ease-[var(--ease-spring)]",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-[var(--color-focus)]",
                  sizeClass.cell,
                  // Base states
                  !disabled && !isSelected && !isRangeStart && !isRangeEnd && [
                    "text-[var(--color-text)]",
                    "hover:bg-[var(--color-surface-hover)]",
                    "hover:-translate-y-0.5 hover:shadow-sm",
                  ],
                  // Today
                  isToday && !isSelected && !isRangeStart && !isRangeEnd && [
                    "border border-[var(--color-primary)]",
                    "shadow-[0_0_0_1px_var(--color-primary)/20]",
                  ],
                  // Selected or range endpoints
                  (isSelected || isRangeStart || isRangeEnd) && [
                    "bg-[var(--color-primary)] text-white",
                    "hover:bg-[var(--color-primary-hover)]",
                    "shadow-[0_0_8px_var(--color-primary)/50]",
                    "scale-105",
                  ],
                  // In range
                  inRange && !isRangeStart && !isRangeEnd && [
                    "bg-[var(--color-primary)]/10",
                    "text-[var(--color-primary)]",
                  ],
                  // Disabled
                  disabled && [
                    "text-[var(--color-text-muted)] opacity-50",
                    "cursor-not-allowed",
                  ]
                )}
                aria-label={formatDate(date)}
                aria-selected={isSelected || isRangeStart || isRangeEnd}
              >
                {date.getDate()}
              </button>
            </React.Fragment>
          )
        })}
      </div>

      {/* Range info */}
      {range && (rangeStart || rangeEnd) && (
        <div className="mt-3 pt-3 border-t border-[var(--color-border)] text-xs text-[var(--color-text-muted)]">
          {rangeStart && rangeEnd ? (
            <span>
              {formatDate(rangeStart)} — {formatDate(rangeEnd)}
            </span>
          ) : rangeStart ? (
            <span>From: {formatDate(rangeStart)}</span>
          ) : null}
        </div>
      )}
    </div>
  )
}

// Mini calendar for inline use
export interface MiniCalendarProps extends CalendarProps {}

export function MiniCalendar(props: MiniCalendarProps) {
  return <Calendar size="sm" {...props} />
}
