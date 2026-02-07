"use client"

/**
 * Meteors Component
 *
 * Animated meteor shower effect.
 * Features:
 * - Streak animations
 * - Customizable colors
 * - Random timing
 * - Multiple variants
 */

import * as React from "react"
import { cn } from "@/lib/utils"

export interface MeteorsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of meteors
   */
  count?: number
  /**
   * Meteor color
   */
  color?: string
  /**
   * Trail color
   */
  trailColor?: string
  /**
   * Speed range [min, max] in seconds
   */
  speed?: [number, number]
  /**
   * Meteor angle in degrees
   */
  angle?: number
  /**
   * Meteor length in pixels
   */
  length?: number
}

export function Meteors({
  count = 20,
  color = "white",
  trailColor,
  speed = [0.5, 2],
  angle = 215,
  length = 100,
  className,
  children,
  ...props
}: MeteorsProps) {
  const [meteors, setMeteors] = React.useState<Array<{
    id: number
    left: number
    delay: number
    duration: number
    size: number
  }>>([])

  React.useEffect(() => {
    const newMeteors = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 100),
      delay: Math.random() * (speed[1] * 2),
      duration: Math.random() * (speed[1] - speed[0]) + speed[0],
      size: Math.random() * 1 + 0.5,
    }))
    setMeteors(newMeteors)
  }, [count, speed])

  const trail = trailColor || `linear-gradient(to right, ${color}, transparent)`

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute animate-meteor pointer-events-none"
          style={{
            top: "-5%",
            left: `${meteor.left}%`,
            width: `${length}px`,
            height: `${meteor.size}px`,
            background: trail,
            borderRadius: "9999px",
            transform: `rotate(${angle}deg)`,
            animationDelay: `${meteor.delay}s`,
            animationDuration: `${meteor.duration}s`,
            boxShadow: `0 0 ${meteor.size * 4}px ${color}`,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes meteor {
          0% {
            transform: rotate(${angle}deg) translateX(0);
            opacity: 1;
          }
          100% {
            transform: rotate(${angle}deg) translateX(-500px);
            opacity: 0;
          }
        }
        .animate-meteor {
          animation: meteor linear infinite;
        }
      `}</style>
    </div>
  )
}

// Shooting stars variant
export interface ShootingStarsProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of shooting stars
   */
  count?: number
  /**
   * Star color
   */
  color?: string
  /**
   * Min delay between stars
   */
  minDelay?: number
  /**
   * Max delay between stars
   */
  maxDelay?: number
}

export function ShootingStars({
  count = 5,
  color = "white",
  minDelay = 3,
  maxDelay = 8,
  className,
  children,
  ...props
}: ShootingStarsProps) {
  const [stars, setStars] = React.useState<Array<{
    id: number
    top: number
    left: number
    delay: number
    duration: number
    angle: number
  }>>([])

  React.useEffect(() => {
    const newStars = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 50,
      left: Math.random() * 100,
      delay: Math.random() * (maxDelay - minDelay) + minDelay,
      duration: Math.random() * 0.5 + 0.5,
      angle: Math.random() * 20 + 200, // Between 200 and 220 degrees
    }))
    setStars(newStars)
  }, [count, minDelay, maxDelay])

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute animate-shooting-star pointer-events-none"
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            animationDelay: `${star.delay}s`,
            animationDuration: `${star.duration}s`,
            transform: `rotate(${star.angle}deg)`,
          }}
        >
          {/* Star head */}
          <div
            className="w-1 h-1 rounded-full"
            style={{
              backgroundColor: color,
              boxShadow: `0 0 8px 2px ${color}`,
            }}
          />
          {/* Star trail */}
          <div
            className="absolute top-0 left-0 w-32 h-px origin-left"
            style={{
              background: `linear-gradient(to left, ${color}, transparent)`,
            }}
          />
        </div>
      ))}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          100% {
            transform: translateX(-300px) translateY(150px);
            opacity: 0;
          }
        }
        .animate-shooting-star {
          animation: shooting-star linear infinite;
        }
      `}</style>
    </div>
  )
}

// Rain effect
export interface RainProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of raindrops
   */
  count?: number
  /**
   * Raindrop color
   */
  color?: string
  /**
   * Speed multiplier
   */
  speed?: number
  /**
   * Raindrop angle (0 = straight down)
   */
  angle?: number
}

export function Rain({
  count = 100,
  color = "var(--color-primary)",
  speed = 1,
  angle = 0,
  className,
  children,
  ...props
}: RainProps) {
  const [drops, setDrops] = React.useState<Array<{
    id: number
    left: number
    delay: number
    duration: number
    length: number
    opacity: number
  }>>([])

  React.useEffect(() => {
    const newDrops = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 120 - 10, // Allow some overflow
      delay: Math.random() * 2,
      duration: (Math.random() * 0.5 + 0.5) / speed,
      length: Math.random() * 15 + 10,
      opacity: Math.random() * 0.3 + 0.2,
    }))
    setDrops(newDrops)
  }, [count, speed])

  const computedColor = color.startsWith("var(")
    ? `var(--color-primary, #3b82f6)`
    : color

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {drops.map((drop) => (
        <span
          key={drop.id}
          className="absolute w-px animate-rain pointer-events-none"
          style={{
            left: `${drop.left}%`,
            top: "-10%",
            height: drop.length,
            background: `linear-gradient(to bottom, ${computedColor}, transparent)`,
            opacity: drop.opacity,
            transform: `rotate(${angle}deg)`,
            animationDelay: `${drop.delay}s`,
            animationDuration: `${drop.duration}s`,
          }}
        />
      ))}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes rain {
          0% {
            transform: translateY(0) rotate(${angle}deg);
          }
          100% {
            transform: translateY(120vh) rotate(${angle}deg);
          }
        }
        .animate-rain {
          animation: rain linear infinite;
        }
      `}</style>
    </div>
  )
}

// Snow effect
export interface SnowProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of snowflakes
   */
  count?: number
  /**
   * Snowflake color
   */
  color?: string
  /**
   * Speed multiplier
   */
  speed?: number
  /**
   * Enable wobble animation
   */
  wobble?: boolean
}

export function Snow({
  count = 50,
  color = "white",
  speed = 1,
  wobble = true,
  className,
  children,
  ...props
}: SnowProps) {
  const [flakes, setFlakes] = React.useState<Array<{
    id: number
    left: number
    delay: number
    duration: number
    size: number
    opacity: number
    wobbleOffset: number
  }>>([])

  React.useEffect(() => {
    const newFlakes = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: (Math.random() * 3 + 5) / speed,
      size: Math.random() * 4 + 2,
      opacity: Math.random() * 0.5 + 0.5,
      wobbleOffset: Math.random() * 2,
    }))
    setFlakes(newFlakes)
  }, [count, speed])

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className={cn(
            "absolute rounded-full animate-snow pointer-events-none",
            wobble && "animate-snow-wobble"
          )}
          style={{
            left: `${flake.left}%`,
            top: "-5%",
            width: flake.size,
            height: flake.size,
            backgroundColor: color,
            opacity: flake.opacity,
            boxShadow: `0 0 ${flake.size}px ${color}`,
            animationDelay: `${flake.delay}s`,
            animationDuration: `${flake.duration}s`,
            // For wobble
            "--wobble-offset": `${flake.wobbleOffset}s`,
          } as React.CSSProperties}
        />
      ))}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes snow {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(110vh);
          }
        }
        @keyframes snow-wobble {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(27.5vh) translateX(10px);
          }
          50% {
            transform: translateY(55vh) translateX(-10px);
          }
          75% {
            transform: translateY(82.5vh) translateX(10px);
          }
          100% {
            transform: translateY(110vh) translateX(0);
          }
        }
        .animate-snow {
          animation: snow linear infinite;
        }
        .animate-snow-wobble {
          animation: snow-wobble linear infinite;
        }
      `}</style>
    </div>
  )
}

// Fireflies effect
export interface FirefliesProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of fireflies
   */
  count?: number
  /**
   * Firefly color
   */
  color?: string
  /**
   * Glow intensity
   */
  glowIntensity?: number
}

export function Fireflies({
  count = 15,
  color = "var(--color-warning)",
  glowIntensity = 1,
  className,
  children,
  ...props
}: FirefliesProps) {
  const [fireflies, setFireflies] = React.useState<Array<{
    id: number
    x: number
    y: number
    size: number
    duration: number
    delay: number
    pathX: number
    pathY: number
  }>>([])

  React.useEffect(() => {
    const newFireflies = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 5 + 5,
      delay: Math.random() * 5,
      pathX: Math.random() * 100 - 50,
      pathY: Math.random() * 100 - 50,
    }))
    setFireflies(newFireflies)
  }, [count])

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {fireflies.map((fly) => (
        <span
          key={fly.id}
          className="absolute rounded-full animate-firefly pointer-events-none"
          style={{
            left: `${fly.x}%`,
            top: `${fly.y}%`,
            width: fly.size,
            height: fly.size,
            backgroundColor: color,
            boxShadow: `0 0 ${fly.size * 4 * glowIntensity}px ${fly.size * 2 * glowIntensity}px ${color}`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.duration}s`,
            "--path-x": `${fly.pathX}px`,
            "--path-y": `${fly.pathY}px`,
          } as React.CSSProperties}
        />
      ))}
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes firefly {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            transform: translate(var(--path-x), var(--path-y));
            opacity: 0.5;
          }
          75% {
            opacity: 1;
          }
        }
        .animate-firefly {
          animation: firefly ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

// Comet trail (single animated comet)
export interface CometProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Comet color
   */
  color?: string
  /**
   * Trail length
   */
  trailLength?: number
  /**
   * Animation duration in seconds
   */
  duration?: number
  /**
   * Comet direction
   */
  direction?: "left-to-right" | "right-to-left" | "top-to-bottom" | "diagonal"
}

export function Comet({
  color = "white",
  trailLength = 150,
  duration = 3,
  direction = "diagonal",
  className,
  children,
  ...props
}: CometProps) {
  const getAnimation = () => {
    switch (direction) {
      case "left-to-right":
        return {
          start: { left: "-20%", top: "30%" },
          end: { left: "120%", top: "30%" },
          rotate: 0,
        }
      case "right-to-left":
        return {
          start: { left: "120%", top: "40%" },
          end: { left: "-20%", top: "40%" },
          rotate: 180,
        }
      case "top-to-bottom":
        return {
          start: { left: "50%", top: "-10%" },
          end: { left: "50%", top: "110%" },
          rotate: 90,
        }
      case "diagonal":
      default:
        return {
          start: { left: "-10%", top: "-10%" },
          end: { left: "110%", top: "110%" },
          rotate: 45,
        }
    }
  }

  const animation = getAnimation()

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <div
        className="absolute animate-comet pointer-events-none"
        style={{
          left: animation.start.left,
          top: animation.start.top,
          animationDuration: `${duration}s`,
          transform: `rotate(${animation.rotate}deg)`,
          "--end-left": animation.end.left,
          "--end-top": animation.end.top,
        } as React.CSSProperties}
      >
        {/* Comet head */}
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: color,
            boxShadow: `0 0 20px 5px ${color}`,
          }}
        />
        {/* Comet trail */}
        <div
          className="absolute top-1/2 right-full -translate-y-1/2"
          style={{
            width: trailLength,
            height: 2,
            background: `linear-gradient(to left, ${color}, transparent)`,
          }}
        />
      </div>
      <div className="relative z-10">{children}</div>

      <style jsx>{`
        @keyframes comet {
          0% {
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            left: var(--end-left);
            top: var(--end-top);
            opacity: 0;
          }
        }
        .animate-comet {
          animation: comet linear infinite;
        }
      `}</style>
    </div>
  )
}
