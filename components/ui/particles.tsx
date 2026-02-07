"use client"

/**
 * Particles Component
 *
 * Canvas-based particle background.
 * Features:
 * - Floating particles
 * - Connecting lines
 * - Mouse interaction
 * - Customizable appearance
 * - Performance optimized
 */

import * as React from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export interface ParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of particles
   */
  count?: number
  /**
   * Particle color
   */
  color?: string
  /**
   * Enable connecting lines
   */
  connectLines?: boolean
  /**
   * Max distance for connecting lines
   */
  connectDistance?: number
  /**
   * Particle speed multiplier
   */
  speed?: number
  /**
   * Min particle size
   */
  minSize?: number
  /**
   * Max particle size
   */
  maxSize?: number
  /**
   * Enable mouse interaction
   */
  mouseInteraction?: boolean
  /**
   * Mouse repulsion radius
   */
  mouseRadius?: number
  /**
   * Enable parallax on mouse move
   */
  parallax?: boolean
  /**
   * Parallax intensity
   */
  parallaxIntensity?: number
}

export function Particles({
  count = 50,
  color = "var(--color-primary)",
  connectLines = true,
  connectDistance = 150,
  speed = 1,
  minSize = 1,
  maxSize = 3,
  mouseInteraction = true,
  mouseRadius = 100,
  parallax = false,
  parallaxIntensity = 0.02,
  className,
  children,
  ...props
}: ParticlesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const particlesRef = React.useRef<Particle[]>([])
  const mouseRef = React.useRef({ x: 0, y: 0, active: false })
  const animationRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Get computed color
    const computedColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim() || "#3b82f6"

    const particleColor = color.startsWith("var(")
      ? computedColor
      : color

    // Resize canvas
    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          size: Math.random() * (maxSize - minSize) + minSize,
          opacity: Math.random() * 0.5 + 0.5,
        })
      }
    }
    initParticles()

    // Mouse handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    if (mouseInteraction || parallax) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Mouse interaction
        if (mouseInteraction && mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseRadius) {
            const force = (mouseRadius - dist) / mouseRadius
            p.vx -= (dx / dist) * force * 0.5
            p.vy -= (dy / dist) * force * 0.5
          }
        }

        // Parallax effect
        if (parallax && mouse.active) {
          const centerX = canvas.width / 2
          const centerY = canvas.height / 2
          const offsetX = (mouse.x - centerX) * parallaxIntensity * (p.size / maxSize)
          const offsetY = (mouse.y - centerY) * parallaxIntensity * (p.size / maxSize)
          p.x += offsetX * 0.01
          p.y += offsetY * 0.01
        }

        // Update position
        p.x += p.vx
        p.y += p.vy

        // Apply friction
        p.vx *= 0.99
        p.vy *= 0.99

        // Add base velocity to keep particles moving
        if (Math.abs(p.vx) < 0.1) p.vx = (Math.random() - 0.5) * speed
        if (Math.abs(p.vy) < 0.1) p.vy = (Math.random() - 0.5) * speed

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = p.opacity
        ctx.fill()

        // Draw connecting lines
        if (connectLines) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const dx = p.x - p2.x
            const dy = p.y - p2.y
            const dist = Math.sqrt(dx * dx + dy * dy)

            if (dist < connectDistance) {
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = particleColor
              ctx.globalAlpha = (1 - dist / connectDistance) * 0.3
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Resize handler
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      resizeObserver.disconnect()
      if (mouseInteraction || parallax) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [count, color, connectLines, connectDistance, speed, minSize, maxSize, mouseInteraction, mouseRadius, parallax, parallaxIntensity])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Simple floating particles (no connections)
export interface FloatingParticlesProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of particles
   */
  count?: number
  /**
   * Particle color
   */
  color?: string
  /**
   * Speed
   */
  speed?: number
  /**
   * Direction
   */
  direction?: "up" | "down" | "left" | "right" | "random"
}

export function FloatingParticles({
  count = 30,
  color = "var(--color-primary)",
  speed = 1,
  direction = "up",
  className,
  children,
  ...props
}: FloatingParticlesProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const animationRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const computedColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim() || "#3b82f6"

    const particleColor = color.startsWith("var(")
      ? computedColor
      : color

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()

    interface FloatingParticle {
      x: number
      y: number
      size: number
      opacity: number
      speed: number
    }

    const particles: FloatingParticle[] = []
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.2,
        speed: (Math.random() * 0.5 + 0.5) * speed,
      })
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        switch (direction) {
          case "up":
            p.y -= p.speed
            if (p.y < -10) {
              p.y = canvas.height + 10
              p.x = Math.random() * canvas.width
            }
            break
          case "down":
            p.y += p.speed
            if (p.y > canvas.height + 10) {
              p.y = -10
              p.x = Math.random() * canvas.width
            }
            break
          case "left":
            p.x -= p.speed
            if (p.x < -10) {
              p.x = canvas.width + 10
              p.y = Math.random() * canvas.height
            }
            break
          case "right":
            p.x += p.speed
            if (p.x > canvas.width + 10) {
              p.x = -10
              p.y = Math.random() * canvas.height
            }
            break
          case "random":
            p.x += (Math.random() - 0.5) * p.speed * 2
            p.y += (Math.random() - 0.5) * p.speed * 2
            if (p.x < 0) p.x = canvas.width
            if (p.x > canvas.width) p.x = 0
            if (p.y < 0) p.y = canvas.height
            if (p.y > canvas.height) p.y = 0
            break
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = p.opacity
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      resizeObserver.disconnect()
    }
  }, [count, color, speed, direction])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Sparkles effect
export interface SparklesProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of sparkles
   */
  count?: number
  /**
   * Sparkle color
   */
  color?: string
  /**
   * Min sparkle size
   */
  minSize?: number
  /**
   * Max sparkle size
   */
  maxSize?: number
}

export function Sparkles({
  count = 20,
  color = "var(--color-warning)",
  minSize = 2,
  maxSize = 6,
  className,
  children,
  ...props
}: SparklesProps) {
  const [sparkles, setSparkles] = React.useState<Array<{
    id: number
    x: number
    y: number
    size: number
    delay: number
    duration: number
  }>>([])

  React.useEffect(() => {
    const newSparkles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      delay: Math.random() * 2,
      duration: Math.random() * 1 + 1,
    }))
    setSparkles(newSparkles)
  }, [count, minSize, maxSize])

  const computedColor = color.startsWith("var(")
    ? `var(--color-warning, #f59e0b)`
    : color

  return (
    <div className={cn("relative", className)} {...props}>
      {sparkles.map((sparkle) => (
        <span
          key={sparkle.id}
          className="absolute animate-sparkle pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: sparkle.size,
            height: sparkle.size,
            backgroundColor: computedColor,
            borderRadius: "50%",
            boxShadow: `0 0 ${sparkle.size * 2}px ${computedColor}`,
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-sparkle {
          animation: sparkle ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Particle field with gravity
export interface ParticleFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of particles
   */
  count?: number
  /**
   * Gravity strength
   */
  gravity?: number
  /**
   * Particle color
   */
  color?: string
  /**
   * Enable mouse attraction
   */
  mouseAttraction?: boolean
}

export function ParticleField({
  count = 100,
  gravity = 0.02,
  color = "var(--color-primary)",
  mouseAttraction = true,
  className,
  children,
  ...props
}: ParticleFieldProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mouseRef = React.useRef({ x: 0, y: 0, active: false })
  const animationRef = React.useRef<number | null>(null)

  React.useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const computedColor = getComputedStyle(document.documentElement)
      .getPropertyValue("--color-primary")
      .trim() || "#3b82f6"

    const particleColor = color.startsWith("var(")
      ? computedColor
      : color

    const resize = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }
    resize()

    interface FieldParticle {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      life: number
      maxLife: number
    }

    const particles: FieldParticle[] = []

    const createParticle = (): FieldParticle => ({
      x: Math.random() * canvas.width,
      y: 0,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2,
      size: Math.random() * 2 + 1,
      life: 0,
      maxLife: Math.random() * 100 + 100,
    })

    for (let i = 0; i < count; i++) {
      const p = createParticle()
      p.y = Math.random() * canvas.height
      p.life = Math.random() * p.maxLife
      particles.push(p)
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    if (mouseAttraction) {
      container.addEventListener("mousemove", handleMouseMove)
      container.addEventListener("mouseleave", handleMouseLeave)
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Apply gravity
        p.vy += gravity

        // Mouse attraction
        if (mouseAttraction && mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < 200) {
            const force = (200 - dist) / 200 * 0.1
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        p.x += p.vx
        p.y += p.vy
        p.life++

        // Apply friction
        p.vx *= 0.99
        p.vy *= 0.99

        // Reset if out of bounds or too old
        if (p.y > canvas.height || p.life > p.maxLife) {
          const newP = createParticle()
          particles[i] = newP
          continue
        }

        // Wrap horizontally
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0

        const lifeProgress = p.life / p.maxLife
        const opacity = 1 - lifeProgress

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = opacity * 0.7
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      resizeObserver.disconnect()
      if (mouseAttraction) {
        container.removeEventListener("mousemove", handleMouseMove)
        container.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [count, gravity, color, mouseAttraction])

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

// Stars background
export interface StarsBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of stars
   */
  count?: number
  /**
   * Star color
   */
  color?: string
  /**
   * Enable twinkling
   */
  twinkle?: boolean
  /**
   * Background color
   */
  background?: string
}

export function StarsBackground({
  count = 100,
  color = "white",
  twinkle = true,
  background = "var(--color-surface)",
  className,
  children,
  ...props
}: StarsBackgroundProps) {
  const [stars, setStars] = React.useState<Array<{
    id: number
    x: number
    y: number
    size: number
    opacity: number
    twinkleDelay: number
    twinkleDuration: number
  }>>([])

  React.useEffect(() => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleDelay: Math.random() * 5,
      twinkleDuration: Math.random() * 2 + 2,
    }))
    setStars(newStars)
  }, [count])

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ backgroundColor: background }}
      {...props}
    >
      {stars.map((star) => (
        <span
          key={star.id}
          className={cn(
            "absolute rounded-full pointer-events-none",
            twinkle && "animate-twinkle"
          )}
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: color,
            opacity: star.opacity,
            boxShadow: `0 0 ${star.size * 2}px ${color}`,
            animationDelay: twinkle ? `${star.twinkleDelay}s` : undefined,
            animationDuration: twinkle ? `${star.twinkleDuration}s` : undefined,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>

      {twinkle && (
        <style jsx>{`
          @keyframes twinkle {
            0%, 100% {
              opacity: 0.3;
            }
            50% {
              opacity: 1;
            }
          }
          .animate-twinkle {
            animation: twinkle ease-in-out infinite;
          }
        `}</style>
      )}
    </div>
  )
}
