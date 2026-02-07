"use client"

/**
 * Wave Animation Component
 *
 * Animated wave and water effects.
 * Features:
 * - SVG-based waves
 * - Multiple wave layers
 * - Water ripple effects
 * - Customizable colors and speeds
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Basic wave
export interface WaveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wave color
   */
  color?: string
  /**
   * Wave height
   */
  height?: number
  /**
   * Animation speed (seconds for one cycle)
   */
  speed?: number
  /**
   * Wave amplitude
   */
  amplitude?: number
  /**
   * Position at bottom
   */
  position?: "top" | "bottom"
  /**
   * Flip wave direction
   */
  flip?: boolean
}

export function Wave({
  color = "var(--color-primary)",
  height = 100,
  speed = 10,
  amplitude = 20,
  position = "bottom",
  flip = false,
  className,
  ...props
}: WaveProps) {
  const viewBoxHeight = height + amplitude

  return (
    <div
      className={cn(
        "absolute left-0 right-0 overflow-hidden pointer-events-none",
        position === "bottom" ? "bottom-0" : "top-0",
        className
      )}
      style={{ height: viewBoxHeight }}
      {...props}
    >
      <svg
        className="w-[200%] h-full animate-wave"
        viewBox={`0 0 1440 ${viewBoxHeight}`}
        preserveAspectRatio="none"
        style={{
          transform: flip ? "scaleY(-1)" : undefined,
          animationDuration: `${speed}s`,
        }}
      >
        <path
          d={`
            M0,${amplitude}
            C360,${amplitude * 2} 720,0 1080,${amplitude}
            C1260,${amplitude * 1.5} 1440,${amplitude * 0.5} 1440,${amplitude}
            L1440,${viewBoxHeight}
            L0,${viewBoxHeight}
            Z
          `}
          fill={color}
        />
      </svg>

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0) ${flip ? "scaleY(-1)" : ""};
          }
          100% {
            transform: translateX(-50%) ${flip ? "scaleY(-1)" : ""};
          }
        }
        .animate-wave {
          animation: wave linear infinite;
        }
      `}</style>
    </div>
  )
}

// Multiple layered waves
export interface MultiWaveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wave colors (from back to front)
   */
  colors?: string[]
  /**
   * Base height
   */
  height?: number
  /**
   * Speed multipliers for each wave
   */
  speeds?: number[]
  /**
   * Position
   */
  position?: "top" | "bottom"
}

export function MultiWave({
  colors = [
    "color-mix(in srgb, var(--color-primary) 30%, transparent)",
    "color-mix(in srgb, var(--color-primary) 50%, transparent)",
    "color-mix(in srgb, var(--color-primary) 70%, transparent)",
  ],
  height = 80,
  speeds = [15, 12, 10],
  position = "bottom",
  className,
  ...props
}: MultiWaveProps) {
  return (
    <div
      className={cn(
        "absolute left-0 right-0 overflow-hidden pointer-events-none",
        position === "bottom" ? "bottom-0" : "top-0",
        className
      )}
      style={{ height: height * 1.5 }}
      {...props}
    >
      {colors.map((color, index) => (
        <svg
          key={index}
          className="absolute bottom-0 w-[200%] h-full animate-wave"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          style={{
            animationDuration: `${speeds[index] || 10}s`,
            animationDirection: index % 2 === 0 ? "normal" : "reverse",
            zIndex: index,
          }}
        >
          <path
            d={`
              M0,${30 + index * 10}
              Q360,${60 - index * 5} 720,${30 + index * 10}
              T1440,${30 + index * 10}
              L1440,100
              L0,100
              Z
            `}
            fill={color}
          />
        </svg>
      ))}

      <style jsx>{`
        @keyframes wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-wave {
          animation: wave linear infinite;
        }
      `}</style>
    </div>
  )
}

// Water ripple effect
export interface WaterRippleProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Ripple color
   */
  color?: string
  /**
   * Number of ripples
   */
  count?: number
  /**
   * Animation duration (seconds)
   */
  duration?: number
  /**
   * Enable mouse interaction
   */
  interactive?: boolean
}

export function WaterRipple({
  color = "var(--color-primary)",
  count = 3,
  duration = 2,
  interactive = true,
  className,
  children,
  ...props
}: WaterRippleProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [ripples, setRipples] = React.useState<Array<{
    id: number
    x: number
    y: number
  }>>([])

  const addRipple = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const id = Date.now()
    setRipples((prev) => [...prev, { id, x, y }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, duration * 1000)
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      onClick={addRipple}
      {...props}
    >
      {/* Automatic ripples */}
      {!interactive && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: count }).map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ripple"
              style={{
                border: `2px solid ${color}`,
                animationDuration: `${duration}s`,
                animationDelay: `${(index / count) * duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Interactive ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="absolute pointer-events-none animate-ripple-interactive"
          style={{
            left: ripple.x,
            top: ripple.y,
            border: `2px solid ${color}`,
            animationDuration: `${duration}s`,
          }}
        />
      ))}

      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes ripple {
          0% {
            width: 0;
            height: 0;
            opacity: 0.8;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
        @keyframes ripple-interactive {
          0% {
            width: 0;
            height: 0;
            opacity: 0.6;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
            border-radius: 50%;
            transform: translate(-50%, -50%);
          }
        }
        .animate-ripple {
          animation: ripple ease-out infinite;
        }
        .animate-ripple-interactive {
          animation: ripple-interactive ease-out forwards;
        }
      `}</style>
    </div>
  )
}

// Sine wave (mathematical)
export interface SineWaveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wave color
   */
  color?: string
  /**
   * Stroke width
   */
  strokeWidth?: number
  /**
   * Animation speed
   */
  speed?: number
  /**
   * Number of waves
   */
  frequency?: number
  /**
   * Wave amplitude
   */
  amplitude?: number
  /**
   * Fill below wave
   */
  fill?: boolean
  /**
   * Height of component
   */
  height?: number
}

export function SineWave({
  color = "var(--color-primary)",
  strokeWidth = 2,
  speed = 3,
  frequency = 2,
  amplitude = 30,
  fill = false,
  height = 100,
  className,
  ...props
}: SineWaveProps) {
  const width = 1000
  const points = []

  for (let x = 0; x <= width * 2; x += 5) {
    const y = height / 2 + Math.sin((x / width) * Math.PI * frequency * 2) * amplitude
    points.push(`${x},${y}`)
  }

  const pathD = fill
    ? `M0,${height} L${points.join(" L")} L${width * 2},${height} Z`
    : `M${points.join(" L")}`

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ height }}
      {...props}
    >
      <svg
        className="w-[200%] h-full animate-sine-wave"
        viewBox={`0 0 ${width * 2} ${height}`}
        preserveAspectRatio="none"
        style={{ animationDuration: `${speed}s` }}
      >
        <path
          d={pathD}
          stroke={fill ? "none" : color}
          strokeWidth={strokeWidth}
          fill={fill ? color : "none"}
        />
      </svg>

      <style jsx>{`
        @keyframes sine-wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-sine-wave {
          animation: sine-wave linear infinite;
        }
      `}</style>
    </div>
  )
}

// Liquid blob animation
export interface LiquidBlobProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Blob color
   */
  color?: string
  /**
   * Blob size
   */
  size?: number
  /**
   * Animation speed
   */
  speed?: number
}

export function LiquidBlob({
  color = "var(--color-primary)",
  size = 200,
  speed = 5,
  className,
  ...props
}: LiquidBlobProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg
        className="w-full h-full animate-blob"
        viewBox="0 0 200 200"
        style={{ animationDuration: `${speed}s` }}
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.6 }} />
          </linearGradient>
        </defs>
        <path
          className="animate-morph"
          fill="url(#blobGradient)"
          style={{ animationDuration: `${speed}s` }}
        />
      </svg>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(180deg);
          }
        }
        @keyframes morph {
          0%, 100% {
            d: path("M100,20 C140,20 180,60 180,100 C180,140 140,180 100,180 C60,180 20,140 20,100 C20,60 60,20 100,20");
          }
          25% {
            d: path("M100,30 C150,30 170,70 170,100 C170,130 150,170 100,170 C50,170 30,130 30,100 C30,70 50,30 100,30");
          }
          50% {
            d: path("M100,25 C145,35 175,65 175,100 C175,135 145,165 100,175 C55,165 25,135 25,100 C25,65 55,35 100,25");
          }
          75% {
            d: path("M100,35 C135,25 165,55 165,100 C165,145 135,175 100,165 C65,175 35,145 35,100 C35,55 65,25 100,35");
          }
        }
        .animate-blob {
          animation: blob ease-in-out infinite;
        }
        .animate-morph {
          animation: morph ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Wave divider (section separator)
export interface WaveDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Divider color
   */
  color?: string
  /**
   * Divider height
   */
  height?: number
  /**
   * Wave style
   */
  variant?: "smooth" | "sharp" | "layered"
  /**
   * Flip vertically
   */
  flip?: boolean
}

export function WaveDivider({
  color = "var(--color-surface-muted)",
  height = 80,
  variant = "smooth",
  flip = false,
  className,
  ...props
}: WaveDividerProps) {
  const paths = {
    smooth: "M0,0 C300,100 900,0 1440,100 L1440,100 L0,100 Z",
    sharp: "M0,0 L720,100 L1440,0 L1440,100 L0,100 Z",
    layered: "M0,0 C480,60 960,60 1440,0 L1440,100 L0,100 Z",
  }

  return (
    <div
      className={cn("w-full pointer-events-none", className)}
      style={{
        height,
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      {...props}
    >
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
      >
        <path d={paths[variant]} fill={color} />
      </svg>
    </div>
  )
}

// Animated ocean waves
export interface OceanWavesProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Water color
   */
  color?: string
  /**
   * Wave count
   */
  waveCount?: number
  /**
   * Container height
   */
  height?: number
}

export function OceanWaves({
  color = "var(--color-primary)",
  waveCount = 4,
  height = 150,
  className,
  children,
  ...props
}: OceanWavesProps) {
  const waves = Array.from({ length: waveCount }, (_, i) => ({
    opacity: 0.3 + (i / waveCount) * 0.4,
    speed: 12 - i * 2,
    delay: i * -2,
    amplitude: 15 - i * 2,
    offset: i * 10,
  }))

  return (
    <div className={cn("relative overflow-hidden", className)} {...props}>
      <div className="relative z-10">{children}</div>

      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height }}
      >
        {waves.map((wave, index) => (
          <svg
            key={index}
            className="absolute bottom-0 w-[200%] animate-ocean-wave"
            viewBox="0 0 1440 100"
            preserveAspectRatio="none"
            style={{
              height: height - wave.offset,
              opacity: wave.opacity,
              animationDuration: `${wave.speed}s`,
              animationDelay: `${wave.delay}s`,
            }}
          >
            <path
              d={`
                M0,${50 - wave.amplitude}
                Q360,${50 + wave.amplitude} 720,${50 - wave.amplitude}
                T1440,${50 - wave.amplitude}
                L1440,100
                L0,100
                Z
              `}
              fill={color}
            />
          </svg>
        ))}
      </div>

      <style jsx>{`
        @keyframes ocean-wave {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-ocean-wave {
          animation: ocean-wave linear infinite;
        }
      `}</style>
    </div>
  )
}

// Pulse wave (expanding circles)
export interface PulseWaveProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Wave color
   */
  color?: string
  /**
   * Number of waves
   */
  count?: number
  /**
   * Animation duration
   */
  duration?: number
  /**
   * Max size
   */
  maxSize?: number
}

export function PulseWave({
  color = "var(--color-primary)",
  count = 3,
  duration = 3,
  maxSize = 200,
  className,
  ...props
}: PulseWaveProps) {
  return (
    <div
      className={cn("relative", className)}
      style={{ width: maxSize, height: maxSize }}
      {...props}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="absolute inset-0 rounded-full animate-pulse-wave"
          style={{
            border: `2px solid ${color}`,
            animationDuration: `${duration}s`,
            animationDelay: `${(index / count) * duration}s`,
          }}
        />
      ))}

      <style jsx>{`
        @keyframes pulse-wave {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
        .animate-pulse-wave {
          animation: pulse-wave ease-out infinite;
        }
      `}</style>
    </div>
  )
}
