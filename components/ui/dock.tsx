"use client"

/**
 * Dock Component
 *
 * Premium macOS-style dock with magnification.
 * Features:
 * - Smooth magnification effect with spring physics
 * - Tooltip animations with slide-in
 * - Glow effects on hover
 * - Badge pulse animations
 * - Token-based styling
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DockItem {
  id: string
  icon: React.ReactNode
  label: string
  onClick?: () => void
  href?: string
  badge?: number
  active?: boolean
}

export interface DockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: (DockItem | "separator")[]
  position?: "bottom" | "left" | "right"
  iconSize?: number
  maxScale?: number
  magnificationRadius?: number
  showTooltips?: boolean
  variant?: "default" | "glass" | "solid"
}

const variantClasses = {
  default: "bg-[var(--color-surface-muted)]/80 backdrop-blur-xl border border-[var(--color-border)]/50 shadow-2xl",
  glass: "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl",
  solid: "bg-[var(--color-surface)] border border-[var(--color-border)] shadow-xl",
}

export function Dock({
  items,
  position = "bottom",
  iconSize = 48,
  maxScale = 1.8,
  magnificationRadius = 3,
  showTooltips = true,
  variant = "default",
  className,
  ...props
}: DockProps) {
  const dockRef = React.useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = React.useState<number | null>(null)
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null)

  const isHorizontal = position === "bottom"

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dockRef.current) return

    const rect = dockRef.current.getBoundingClientRect()
    const pos = isHorizontal
      ? e.clientX - rect.left
      : e.clientY - rect.top

    setMousePosition(pos)
  }

  const handleMouseLeave = () => {
    setMousePosition(null)
    setHoveredIndex(null)
  }

  // Smooth spring-like magnification calculation
  const calculateScale = (index: number): number => {
    if (mousePosition === null) return 1

    const itemElements = dockRef.current?.querySelectorAll("[data-dock-item]")
    if (!itemElements || !itemElements[index]) return 1

    const itemRect = (itemElements[index] as HTMLElement).getBoundingClientRect()
    const dockRect = dockRef.current!.getBoundingClientRect()

    const itemCenter = isHorizontal
      ? itemRect.left + itemRect.width / 2 - dockRect.left
      : itemRect.top + itemRect.height / 2 - dockRect.top

    const distance = Math.abs(mousePosition - itemCenter)
    const maxDistance = iconSize * magnificationRadius

    if (distance > maxDistance) return 1

    // Use cosine for smoother falloff (feels more natural/spring-like)
    const progress = 1 - distance / maxDistance
    const easedProgress = Math.cos((1 - progress) * Math.PI * 0.5)
    const scale = 1 + (maxScale - 1) * easedProgress

    return scale
  }

  return (
    <div
      ref={dockRef}
      className={cn(
        "flex items-end gap-1 p-2 rounded-2xl",
        variantClasses[variant],
        isHorizontal ? "flex-row" : "flex-col",
        // Subtle glow on hover
        "transition-shadow duration-300",
        mousePosition !== null && "shadow-[0_0_40px_rgba(var(--color-primary-rgb),0.1)]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {items.map((item, index) => {
        if (item === "separator") {
          return (
            <div
              key={`separator-${index}`}
              className={cn(
                "bg-[var(--color-border)]/50",
                "transition-opacity duration-200",
                isHorizontal ? "w-px h-8 mx-1" : "h-px w-8 my-1"
              )}
            />
          )
        }

        const scale = calculateScale(index)
        const isHovered = hoveredIndex === index

        return (
          <DockItemComponent
            key={item.id}
            item={item}
            scale={scale}
            iconSize={iconSize}
            isHovered={isHovered}
            showTooltip={showTooltips}
            position={position}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        )
      })}
    </div>
  )
}

interface DockItemComponentProps {
  item: DockItem
  scale: number
  iconSize: number
  isHovered: boolean
  showTooltip: boolean
  position: "bottom" | "left" | "right"
  onMouseEnter: () => void
  onMouseLeave: () => void
}

function DockItemComponent({
  item,
  scale,
  iconSize,
  isHovered,
  showTooltip,
  position,
  onMouseEnter,
  onMouseLeave,
}: DockItemComponentProps) {
  const scaledSize = iconSize * scale
  const Component = item.href ? "a" : "button"
  const isScaled = scale > 1.1

  return (
    <div
      className="relative flex items-center justify-center"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Tooltip with spring animation */}
      {showTooltip && isHovered && (
        <div
          className={cn(
            "absolute whitespace-nowrap z-50",
            "px-3 py-1.5 rounded-lg",
            "bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)] text-xs font-medium",
            "shadow-lg",
            // Spring animation
            "animate-in fade-in-0 zoom-in-95 duration-200 ease-[var(--ease-spring)]",
            position === "bottom" && "bottom-full mb-3 slide-in-from-bottom-2",
            position === "left" && "left-full ml-3 slide-in-from-left-2",
            position === "right" && "right-full mr-3 slide-in-from-right-2"
          )}
        >
          {item.label}
          {/* Tooltip arrow */}
          <div
            className={cn(
              "absolute border-4 border-transparent",
              position === "bottom" && "top-full left-1/2 -translate-x-1/2 border-t-[var(--color-surface-inverse)]",
              position === "left" && "right-full top-1/2 -translate-y-1/2 border-l-[var(--color-surface-inverse)]",
              position === "right" && "left-full top-1/2 -translate-y-1/2 border-r-[var(--color-surface-inverse)]"
            )}
          />
        </div>
      )}

      <Component
        data-dock-item
        {...(item.href ? { href: item.href } : { type: "button", onClick: item.onClick })}
        className={cn(
          "relative flex items-center justify-center",
          "rounded-xl",
          // Smooth spring transition
          "transition-all duration-150 ease-[var(--ease-spring)]",
          // Background and glow on hover
          isScaled && "bg-white/10",
          isHovered && [
            "shadow-[0_0_20px_rgba(var(--color-primary-rgb),0.2)]",
          ],
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
          item.active && "bg-white/20"
        )}
        style={{
          width: scaledSize,
          height: scaledSize,
          transformOrigin: position === "bottom" ? "bottom" : position === "left" ? "left" : "right",
        }}
      >
        {/* Icon with smooth scaling */}
        <div
          className="flex items-center justify-center transition-transform duration-150 ease-[var(--ease-spring)]"
          style={{
            width: iconSize * 0.7,
            height: iconSize * 0.7,
            transform: `scale(${scale})`,
          }}
        >
          {item.icon}
        </div>

        {/* Badge with pulse animation */}
        {item.badge !== undefined && item.badge > 0 && (
          <span
            className={cn(
              "absolute -top-1 -right-1",
              "min-w-[16px] h-4 px-1 rounded-full",
              "bg-[var(--color-error)] text-white",
              "text-[10px] font-semibold",
              "flex items-center justify-center",
              // Pulse glow
              "shadow-[0_0_8px_rgba(var(--color-error-rgb),0.5)]",
              "animate-in zoom-in-50 duration-200"
            )}
          >
            {item.badge > 99 ? "99+" : item.badge}
          </span>
        )}

        {/* Active indicator with glow */}
        {item.active && (
          <span
            className={cn(
              "absolute bg-[var(--color-primary)] rounded-full",
              "shadow-[0_0_6px_rgba(var(--color-primary-rgb),0.5)]",
              position === "bottom" && "bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5",
              position === "left" && "left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5",
              position === "right" && "right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5"
            )}
          />
        )}
      </Component>
    </div>
  )
}

// Simple dock (non-magnifying) with hover effects
export interface SimpleDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[]
  iconSize?: number
  position?: "bottom" | "left" | "right"
  variant?: "default" | "glass" | "solid"
}

export function SimpleDock({
  items,
  iconSize = 40,
  position = "bottom",
  variant = "default",
  className,
  ...props
}: SimpleDockProps) {
  const isHorizontal = position === "bottom"

  return (
    <div
      className={cn(
        "flex gap-2 p-2 rounded-xl",
        variantClasses[variant],
        isHorizontal ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {items.map((item) => {
        const Component = item.href ? "a" : "button"

        return (
          <Component
            key={item.id}
            {...(item.href ? { href: item.href } : { type: "button", onClick: item.onClick })}
            className={cn(
              "relative flex items-center justify-center",
              "rounded-lg",
              "transition-all duration-200 ease-[var(--ease-spring)]",
              // Hover scale and glow
              "hover:bg-white/10 hover:scale-110",
              "hover:shadow-[0_0_16px_rgba(var(--color-primary-rgb),0.2)]",
              "active:scale-95",
              "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]",
              item.active && "bg-white/20"
            )}
            style={{ width: iconSize, height: iconSize }}
            title={item.label}
          >
            {item.icon}

            {item.badge !== undefined && item.badge > 0 && (
              <span
                className={cn(
                  "absolute -top-1 -right-1",
                  "min-w-[14px] h-3.5 px-1 rounded-full",
                  "bg-[var(--color-error)] text-white",
                  "text-[9px] font-semibold",
                  "flex items-center justify-center",
                  "shadow-[0_0_6px_rgba(var(--color-error-rgb),0.4)]"
                )}
              >
                {item.badge > 99 ? "99+" : item.badge}
              </span>
            )}
          </Component>
        )
      })}
    </div>
  )
}

// Floating dock (fixed position)
export interface FloatingDockProps extends DockProps {
  offset?: number
}

export function FloatingDock({
  position = "bottom",
  offset = 16,
  className,
  ...props
}: FloatingDockProps) {
  const positionClasses = {
    bottom: "fixed bottom-0 left-1/2 -translate-x-1/2",
    left: "fixed left-0 top-1/2 -translate-y-1/2",
    right: "fixed right-0 top-1/2 -translate-y-1/2",
  }

  return (
    <Dock
      position={position}
      className={cn(
        "z-50",
        positionClasses[position],
        className
      )}
      style={{
        [position === "bottom" ? "bottom" : position]: offset,
      }}
      {...props}
    />
  )
}

// App dock (macOS-style with labels)
export interface AppDockProps extends React.HTMLAttributes<HTMLDivElement> {
  apps: Array<{
    id: string
    icon: React.ReactNode
    name: string
    running?: boolean
    onClick?: () => void
  }>
  iconSize?: number
}

export function AppDock({
  apps,
  iconSize = 56,
  className,
  ...props
}: AppDockProps) {
  const dockItems: (DockItem | "separator")[] = apps.map((app) => ({
    id: app.id,
    icon: app.icon,
    label: app.name,
    onClick: app.onClick,
    active: app.running,
  }))

  return (
    <Dock
      items={dockItems}
      iconSize={iconSize}
      variant="glass"
      maxScale={2}
      className={className}
      {...props}
    />
  )
}

// Navigation dock (horizontal navigation)
export interface NavDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: Array<{
    id: string
    icon: React.ReactNode
    label: string
    href: string
    active?: boolean
  }>
  iconSize?: number
  showLabels?: boolean
}

export function NavDock({
  items,
  iconSize = 32,
  showLabels = false,
  className,
  ...props
}: NavDockProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-1 p-1 rounded-full",
        "bg-[var(--color-surface-muted)] border border-[var(--color-border)]",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-full",
            "text-sm font-medium",
            "transition-all duration-200 ease-[var(--ease-spring)]",
            "hover:bg-[var(--color-surface-hover)] hover:scale-[1.02]",
            item.active
              ? "bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm"
              : "text-[var(--color-text-muted)]"
          )}
        >
          <span style={{ width: iconSize, height: iconSize }} className="flex items-center justify-center">
            {item.icon}
          </span>
          {showLabels && <span>{item.label}</span>}
        </a>
      ))}
    </nav>
  )
}
