"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { useState } from "react"
import { Calendar, MiniCalendar } from "@/components/ui/calendar"

const meta = {
  title: "Components/Forms/Calendar",
  component: Calendar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Date display and selection component. Features single date selection, date range selection, disabled dates, month/year navigation, and min/max dates.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
    range: {
      control: "boolean",
      description: "Enable range selection mode",
    },
    showWeekNumbers: {
      control: "boolean",
      description: "Show week numbers",
    },
  },
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

// Default
export const Default: Story = {
  render: () => <Calendar />,
}

// With selected date
function SingleSelectDemo() {
  const [date, setDate] = useState<Date | null>(new Date())

  return (
    <div className="space-y-4">
      <Calendar value={date} onChange={setDate} />
      <p className="text-sm text-[var(--color-text-muted)]">
        Selected: {date?.toLocaleDateString() || "None"}
      </p>
    </div>
  )
}

export const SingleSelect: Story = {
  render: () => <SingleSelectDemo />,
  parameters: {
    docs: {
      description: {
        story: "Calendar with single date selection. Click a date to select it.",
      },
    },
  },
}

// Range selection
function RangeSelectDemo() {
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null)

  return (
    <div className="space-y-4">
      <Calendar
        range
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        onRangeChange={(start, end) => {
          setRangeStart(start)
          setRangeEnd(end)
        }}
      />
      <p className="text-sm text-[var(--color-text-muted)]">
        {rangeStart && rangeEnd
          ? `${rangeStart.toLocaleDateString()} - ${rangeEnd.toLocaleDateString()}`
          : rangeStart
          ? `From: ${rangeStart.toLocaleDateString()}`
          : "Select a date range"}
      </p>
    </div>
  )
}

export const RangeSelect: Story = {
  render: () => <RangeSelectDemo />,
  parameters: {
    docs: {
      description: {
        story: "Calendar with date range selection. Click to set start date, then click again to set end date.",
      },
    },
  },
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex gap-8 items-start">
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <Calendar size="sm" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium</p>
        <Calendar size="md" />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <Calendar size="lg" />
      </div>
    </div>
  ),
}

// With week numbers
export const WithWeekNumbers: Story = {
  render: () => <Calendar showWeekNumbers />,
}

// With min/max dates
function MinMaxDemo() {
  const today = new Date()
  const minDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7)
  const maxDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14)
  const [date, setDate] = useState<Date | null>(today)

  return (
    <div className="space-y-4">
      <Calendar
        value={date}
        onChange={setDate}
        minDate={minDate}
        maxDate={maxDate}
      />
      <p className="text-sm text-[var(--color-text-muted)]">
        Only dates from {minDate.toLocaleDateString()} to {maxDate.toLocaleDateString()} can be selected.
      </p>
    </div>
  )
}

export const WithMinMax: Story = {
  render: () => <MinMaxDemo />,
  parameters: {
    docs: {
      description: {
        story: "Calendar with minimum and maximum selectable dates.",
      },
    },
  },
}

// With disabled dates
function DisabledDatesDemo() {
  const today = new Date()
  const [date, setDate] = useState<Date | null>(null)

  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }

  // Disable specific dates
  const disabledDates = [
    new Date(today.getFullYear(), today.getMonth(), 15),
    new Date(today.getFullYear(), today.getMonth(), 20),
  ]

  return (
    <div className="space-y-4">
      <Calendar
        value={date}
        onChange={setDate}
        disabledDates={disabledDates}
        isDateDisabled={isWeekend}
      />
      <p className="text-sm text-[var(--color-text-muted)]">
        Weekends and specific dates (15th, 20th) are disabled.
      </p>
    </div>
  )
}

export const DisabledDates: Story = {
  render: () => <DisabledDatesDemo />,
  parameters: {
    docs: {
      description: {
        story: "Calendar with disabled dates using both a list and a function.",
      },
    },
  },
}

// Mini calendar
export const Mini: Story = {
  render: () => <MiniCalendar />,
  parameters: {
    docs: {
      description: {
        story: "Compact calendar for inline use.",
      },
    },
  },
}

// Booking calendar
function BookingDemo() {
  const today = new Date()
  const [rangeStart, setRangeStart] = useState<Date | null>(null)
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null)

  // Block past dates and specific "booked" dates
  const bookedDates = [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 4),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + 10),
  ]

  const nights = rangeStart && rangeEnd
    ? Math.ceil((rangeEnd.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24))
    : 0

  return (
    <div className="w-80 p-6 border border-[var(--color-border)] rounded-[var(--radius-lg)]">
      <h3 className="font-medium text-[var(--color-text)] mb-2">
        Select your dates
      </h3>
      <p className="text-sm text-[var(--color-text-muted)] mb-4">
        $150 per night
      </p>
      <Calendar
        range
        rangeStart={rangeStart}
        rangeEnd={rangeEnd}
        onRangeChange={(start, end) => {
          setRangeStart(start)
          setRangeEnd(end)
        }}
        minDate={today}
        disabledDates={bookedDates}
        size="sm"
      />
      {rangeStart && rangeEnd && (
        <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--color-text-muted)]">
              $150 x {nights} nights
            </span>
            <span className="text-[var(--color-text)]">
              ${150 * nights}
            </span>
          </div>
          <button className="w-full mt-4 py-2 text-sm font-medium text-white bg-[var(--color-primary)] rounded-[var(--radius-md)]">
            Reserve
          </button>
        </div>
      )}
    </div>
  )
}

export const BookingCalendar: Story = {
  render: () => <BookingDemo />,
  parameters: {
    docs: {
      description: {
        story: "Calendar used for booking with range selection and blocked dates.",
      },
    },
  },
}

// Event calendar
function EventCalendarDemo() {
  const today = new Date()
  const [date, setDate] = useState<Date | null>(today)

  // Sample events
  const events: Record<string, { title: string; time: string }[]> = {
    [new Date(today.getFullYear(), today.getMonth(), today.getDate()).toISOString().split("T")[0]]: [
      { title: "Team standup", time: "9:00 AM" },
      { title: "Product review", time: "2:00 PM" },
    ],
    [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2).toISOString().split("T")[0]]: [
      { title: "Client meeting", time: "11:00 AM" },
    ],
    [new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5).toISOString().split("T")[0]]: [
      { title: "Sprint planning", time: "10:00 AM" },
      { title: "Lunch with team", time: "12:30 PM" },
      { title: "Code review", time: "3:00 PM" },
    ],
  }

  const selectedDateStr = date?.toISOString().split("T")[0]
  const dayEvents = selectedDateStr ? events[selectedDateStr] : []

  return (
    <div className="flex gap-6">
      <Calendar value={date} onChange={setDate} />
      <div className="w-64">
        <h3 className="font-medium text-[var(--color-text)] mb-4">
          {date?.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric"
          })}
        </h3>
        {dayEvents && dayEvents.length > 0 ? (
          <div className="space-y-3">
            {dayEvents.map((event, index) => (
              <div
                key={index}
                className="p-3 border-l-2 border-[var(--color-primary)] bg-[var(--color-surface-muted)] rounded-r-[var(--radius-md)]"
              >
                <p className="font-medium text-sm text-[var(--color-text)]">
                  {event.title}
                </p>
                <p className="text-xs text-[var(--color-text-muted)]">
                  {event.time}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--color-text-muted)]">
            No events scheduled
          </p>
        )}
      </div>
    </div>
  )
}

export const EventCalendar: Story = {
  render: () => <EventCalendarDemo />,
  parameters: {
    docs: {
      description: {
        story: "Calendar with event display for the selected date.",
      },
    },
  },
}

// Date picker field
function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)

  return (
    <div className="relative w-64">
      <button
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full flex items-center justify-between px-3 py-2 border border-[var(--color-border)] rounded-[var(--radius-md)] text-left hover:border-[var(--color-text-muted)]"
      >
        <span className={date ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)]"}>
          {date ? date.toLocaleDateString() : "Select a date"}
        </span>
        <svg className="h-4 w-4 text-[var(--color-text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>
      {showCalendar && (
        <div className="absolute top-full left-0 mt-1 z-10">
          <Calendar
            value={date}
            onChange={(newDate) => {
              setDate(newDate)
              setShowCalendar(false)
            }}
            size="sm"
          />
        </div>
      )}
    </div>
  )
}

export const DatePicker: Story = {
  render: () => <DatePickerDemo />,
  parameters: {
    docs: {
      description: {
        story: "Calendar used as a dropdown date picker field.",
      },
    },
  },
}

// Multiple months
export const SideBySide: Story = {
  render: () => {
    function MultiMonthDemo() {
      const [rangeStart, setRangeStart] = useState<Date | null>(null)
      const [rangeEnd, setRangeEnd] = useState<Date | null>(null)
      const today = new Date()
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1)

      return (
        <div className="flex gap-4">
          <Calendar
            range
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onRangeChange={(start, end) => {
              setRangeStart(start)
              setRangeEnd(end)
            }}
          />
          <Calendar
            range
            rangeStart={rangeStart}
            rangeEnd={rangeEnd}
            onRangeChange={(start, end) => {
              setRangeStart(start)
              setRangeEnd(end)
            }}
          />
        </div>
      )
    }

    return <MultiMonthDemo />
  },
  parameters: {
    docs: {
      description: {
        story: "Two calendars displayed side by side for range selection across months.",
      },
    },
  },
}
