"use client"

/**
 * Confetti Component
 *
 * Celebration confetti animation.
 * Features:
 * - Customizable colors and shapes
 * - Multiple trigger modes
 * - Canvas-based performance
 * - Gravity and physics
 * - Burst and continuous modes
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  color: string
  size: number
  rotation: number
  rotationSpeed: number
  shape: "square" | "circle" | "triangle" | "line"
  opacity: number
}

export interface ConfettiProps {
  /**
   * Whether confetti is active
   */
  active?: boolean
  /**
   * Number of particles
   */
  particleCount?: number
  /**
   * Spread angle in degrees
   */
  spread?: number
  /**
   * Starting X position (0-1)
   */
  originX?: number
  /**
   * Starting Y position (0-1)
   */
  originY?: number
  /**
   * Initial velocity
   */
  velocity?: number
  /**
   * Gravity strength
   */
  gravity?: number
  /**
   * Colors for particles
   */
  colors?: string[]
  /**
   * Shapes to use
   */
  shapes?: Array<"square" | "circle" | "triangle" | "line">
  /**
   * Duration in ms (0 for infinite)
   */
  duration?: number
  /**
   * Callback when animation completes
   */
  onComplete?: () => void
  /**
   * Z-index
   */
  zIndex?: number
}

const defaultColors = [
  "#ff577f", // pink
  "#ff884b", // orange
  "#ffd384", // yellow
  "#fff9b0", // light yellow
  "#3498db", // blue
  "#2ecc71", // green
  "#9b59b6", // purple
]

export function Confetti({
  active = true,
  particleCount = 100,
  spread = 70,
  originX = 0.5,
  originY = 0.5,
  velocity = 30,
  gravity = 0.5,
  colors = defaultColors,
  shapes = ["square", "circle", "triangle"],
  duration = 3000,
  onComplete,
  zIndex = 9999,
}: ConfettiProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const particlesRef = React.useRef<Particle[]>([])
  const animationRef = React.useRef<number>()
  const startTimeRef = React.useRef<number>()

  const createParticle = React.useCallback(
    (canvasWidth: number, canvasHeight: number): Particle => {
      const angle = ((Math.random() * spread - spread / 2) * Math.PI) / 180
      const speed = velocity * (0.5 + Math.random() * 0.5)

      return {
        x: canvasWidth * originX,
        y: canvasHeight * originY,
        vx: Math.sin(angle) * speed,
        vy: -Math.cos(angle) * speed - Math.random() * velocity * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        opacity: 1,
      }
    },
    [colors, originX, originY, shapes, spread, velocity]
  )

  React.useEffect(() => {
    if (!active) {
      particlesRef.current = []
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const updateSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateSize()
    window.addEventListener("resize", updateSize)

    // Create initial particles
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(canvas.width, canvas.height)
    )

    startTimeRef.current = Date.now()

    const drawParticle = (p: Particle) => {
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.globalAlpha = p.opacity
      ctx.fillStyle = p.color

      const halfSize = p.size / 2

      switch (p.shape) {
        case "circle":
          ctx.beginPath()
          ctx.arc(0, 0, halfSize, 0, Math.PI * 2)
          ctx.fill()
          break
        case "triangle":
          ctx.beginPath()
          ctx.moveTo(0, -halfSize)
          ctx.lineTo(halfSize, halfSize)
          ctx.lineTo(-halfSize, halfSize)
          ctx.closePath()
          ctx.fill()
          break
        case "line":
          ctx.fillRect(-halfSize / 4, -halfSize, halfSize / 2, p.size)
          break
        default: // square
          ctx.fillRect(-halfSize, -halfSize, p.size, p.size)
      }

      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      let activeParticles = 0

      particlesRef.current.forEach((p) => {
        // Update physics
        p.vy += gravity
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        // Apply air resistance
        p.vx *= 0.99
        p.vy *= 0.99

        // Fade out as particles fall
        if (p.y > canvas.height * 0.5) {
          p.opacity -= 0.02
        }

        // Draw if visible
        if (p.opacity > 0 && p.y < canvas.height + 50) {
          drawParticle(p)
          activeParticles++
        }
      })

      // Check completion
      const elapsed = Date.now() - (startTimeRef.current || 0)
      if ((duration > 0 && elapsed >= duration) || activeParticles === 0) {
        onComplete?.()
        return
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", updateSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active, particleCount, gravity, duration, createParticle, onComplete])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
    />
  )
}

// Confetti burst on button click
export interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Confetti colors
   */
  confettiColors?: string[]
  /**
   * Number of particles
   */
  particleCount?: number
  /**
   * Spread angle
   */
  spread?: number
  /**
   * Button variant
   */
  variant?: "default" | "primary" | "outline"
}

export function ConfettiButton({
  children,
  confettiColors,
  particleCount = 50,
  spread = 60,
  variant = "primary",
  className,
  onClick,
  ...props
}: ConfettiButtonProps) {
  const [isActive, setIsActive] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [origin, setOrigin] = React.useState({ x: 0.5, y: 0.5 })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setOrigin({
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      })
    }
    setIsActive(true)
    onClick?.(e)
  }

  const variantClasses = {
    default: "bg-[var(--color-surface)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-surface-hover)]",
    primary: "bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)]",
    outline: "border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10",
  }

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        className={cn(
          "px-6 py-3 rounded-[var(--radius-lg)] font-medium",
          "transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2",
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
      <Confetti
        active={isActive}
        originX={origin.x}
        originY={origin.y}
        colors={confettiColors}
        particleCount={particleCount}
        spread={spread}
        duration={2000}
        onComplete={() => setIsActive(false)}
      />
    </>
  )
}

// Confetti trigger hook
export function useConfetti() {
  const [isActive, setIsActive] = React.useState(false)
  const [config, setConfig] = React.useState<Partial<ConfettiProps>>({})

  const fire = React.useCallback((options?: Partial<ConfettiProps>) => {
    setConfig(options || {})
    setIsActive(true)
  }, [])

  const stop = React.useCallback(() => {
    setIsActive(false)
  }, [])

  const ConfettiComponent = React.useCallback(
    () => (
      <Confetti
        {...config}
        active={isActive}
        onComplete={() => setIsActive(false)}
      />
    ),
    [isActive, config]
  )

  return { fire, stop, ConfettiComponent, isActive }
}

// Celebration overlay (confetti + message)
export interface CelebrationProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Show celebration
   */
  active?: boolean
  /**
   * Message to display
   */
  message?: string
  /**
   * Sub-message
   */
  subMessage?: string
  /**
   * Confetti colors
   */
  colors?: string[]
  /**
   * Duration before auto-close
   */
  duration?: number
  /**
   * Close callback
   */
  onClose?: () => void
}

export function Celebration({
  active = true,
  message = "Congratulations!",
  subMessage,
  colors,
  duration = 5000,
  onClose,
  className,
  ...props
}: CelebrationProps) {
  const [visible, setVisible] = React.useState(active)

  React.useEffect(() => {
    setVisible(active)
    if (active && duration > 0) {
      const timeout = setTimeout(() => {
        setVisible(false)
        onClose?.()
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [active, duration, onClose])

  if (!visible) return null

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center",
        className
      )}
      {...props}
    >
      <Confetti
        active={visible}
        particleCount={150}
        colors={colors}
        duration={duration}
      />
      <div
        className={cn(
          "relative z-10 text-center p-8",
          "bg-white/90 backdrop-blur-sm rounded-[var(--radius-xl)]",
          "shadow-2xl",
          "animate-in zoom-in-95 fade-in duration-300"
        )}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-[var(--color-text)]">
          {message}
        </h2>
        {subMessage && (
          <p className="mt-2 text-[var(--color-text-muted)]">{subMessage}</p>
        )}
        <button
          type="button"
          onClick={() => {
            setVisible(false)
            onClose?.()
          }}
          className={cn(
            "mt-6 px-6 py-2 rounded-[var(--radius-lg)]",
            "bg-[var(--color-primary)] text-white",
            "hover:bg-[var(--color-primary-hover)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
          )}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// Emoji rain (variation with emojis)
export interface EmojiRainProps {
  /**
   * Whether active
   */
  active?: boolean
  /**
   * Emojis to rain
   */
  emojis?: string[]
  /**
   * Number of emojis
   */
  count?: number
  /**
   * Duration in ms
   */
  duration?: number
  /**
   * Z-index
   */
  zIndex?: number
}

export function EmojiRain({
  active = true,
  emojis = ["🎉", "🎊", "✨", "⭐", "🌟", "💫"],
  count = 50,
  duration = 4000,
  zIndex = 9999,
}: EmojiRainProps) {
  const [particles, setParticles] = React.useState<
    Array<{
      id: number
      emoji: string
      x: number
      delay: number
      duration: number
      size: number
    }>
  >([])

  React.useEffect(() => {
    if (!active) {
      setParticles([])
      return
    }

    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      x: Math.random() * 100,
      delay: Math.random() * 1000,
      duration: 2000 + Math.random() * 2000,
      size: 16 + Math.random() * 24,
    }))

    setParticles(newParticles)

    if (duration > 0) {
      const timeout = setTimeout(() => {
        setParticles([])
      }, duration)
      return () => clearTimeout(timeout)
    }
  }, [active, count, emojis, duration])

  if (!active || particles.length === 0) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex }}
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute animate-fall"
          style={{
            left: `${p.x}%`,
            fontSize: p.size,
            animationDelay: `${p.delay}ms`,
            animationDuration: `${p.duration}ms`,
          }}
        >
          {p.emoji}
        </span>
      ))}
      <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-100%) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        .animate-fall {
          animation: fall linear forwards;
        }
      `}</style>
    </div>
  )
}
