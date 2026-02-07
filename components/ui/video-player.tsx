"use client"

/**
 * Video Player Component
 *
 * Video playback with custom controls.
 * Features:
 * - Play/pause toggle
 * - Progress bar with seek
 * - Volume control
 * - Fullscreen support
 * - Poster image
 * - YouTube/Vimeo embeds
 * - Glass overlay controls
 * - Glowing play button
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const PlayIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
)

const PauseIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
)

const VolumeIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
)

const MuteIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
)

const FullscreenIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
  </svg>
)

const ExitFullscreenIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
  </svg>
)

// Format time helper
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export interface VideoPlayerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Video source URL
   */
  src: string
  /**
   * Poster image URL
   */
  poster?: string
  /**
   * Auto play (muted by browser policy)
   */
  autoPlay?: boolean
  /**
   * Loop video
   */
  loop?: boolean
  /**
   * Show controls
   */
  controls?: boolean
  /**
   * Start muted
   */
  muted?: boolean
  /**
   * Aspect ratio
   */
  aspectRatio?: "16:9" | "4:3" | "1:1" | "9:16"
  /**
   * Rounded corners
   */
  rounded?: boolean
}

const aspectRatioClasses = {
  "16:9": "aspect-video",
  "4:3": "aspect-[4/3]",
  "1:1": "aspect-square",
  "9:16": "aspect-[9/16]",
}

export function VideoPlayer({
  src,
  poster,
  autoPlay = false,
  loop = false,
  controls = true,
  muted = false,
  aspectRatio = "16:9",
  rounded = true,
  className,
  ...props
}: VideoPlayerProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(autoPlay)
  const [isMuted, setIsMuted] = React.useState(muted)
  const [progress, setProgress] = React.useState(0)
  const [duration, setDuration] = React.useState(0)
  const [currentTime, setCurrentTime] = React.useState(0)
  const [isFullscreen, setIsFullscreen] = React.useState(false)
  const [showControls, setShowControls] = React.useState(true)
  const hideControlsTimeout = React.useRef<NodeJS.Timeout>()

  // Handle play/pause
  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Handle mute
  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Handle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return

    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }

  // Handle seek
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = (e.clientX - rect.left) / rect.width
    videoRef.current.currentTime = percent * duration
  }

  // Time update handler
  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
      setProgress((videoRef.current.currentTime / duration) * 100)
    }
  }

  // Loaded metadata handler
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  // Fullscreen change listener
  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Auto-hide controls
  const handleMouseMove = () => {
    setShowControls(true)
    if (hideControlsTimeout.current) {
      clearTimeout(hideControlsTimeout.current)
    }
    if (isPlaying) {
      hideControlsTimeout.current = setTimeout(() => {
        setShowControls(false)
      }, 3000)
    }
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative bg-black overflow-hidden group",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)]",
        "transition-shadow duration-500 ease-out",
        aspectRatioClasses[aspectRatio],
        rounded && "rounded-[var(--radius-lg)]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      {...props}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onClick={togglePlay}
        className="w-full h-full object-cover cursor-pointer"
      />

      {/* Big play button overlay with glow effect */}
      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          className={cn(
            "absolute inset-0 flex items-center justify-center",
            "bg-black/30 backdrop-blur-[2px]",
            "transition-all duration-300 ease-out"
          )}
        >
          <div
            className={cn(
              "h-20 w-20 rounded-full",
              "bg-white/95 backdrop-blur-sm",
              "flex items-center justify-center",
              "text-[var(--color-text)]",
              "shadow-[0_0_40px_rgba(255,255,255,0.4)]",
              "hover:shadow-[0_0_60px_rgba(255,255,255,0.6)]",
              "hover:scale-110",
              "transition-all duration-300",
              "active:scale-95"
            )}
            style={{
              transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease-out"
            }}
          >
            <PlayIcon />
          </div>
        </button>
      )}

      {/* Glass overlay controls */}
      {controls && (
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0",
            "bg-gradient-to-t from-black/70 via-black/40 to-transparent",
            "backdrop-blur-md",
            "px-4 pb-4 pt-12",
            "transition-all duration-500",
            showControls || !isPlaying ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
          style={{
            transition: "opacity 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          {/* Progress bar */}
          <div
            className="h-1.5 bg-white/20 rounded-full mb-4 cursor-pointer group/progress overflow-hidden"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-white rounded-full relative transition-all duration-150"
              style={{ width: `${progress}%` }}
            >
              <div
                className={cn(
                  "absolute right-0 top-1/2 -translate-y-1/2",
                  "h-4 w-4 bg-white rounded-full",
                  "shadow-[0_0_12px_rgba(255,255,255,0.6)]",
                  "opacity-0 group-hover/progress:opacity-100 scale-0 group-hover/progress:scale-100",
                  "transition-all duration-300"
                )}
                style={{
                  transition: "opacity 0.3s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
              />
            </div>
          </div>

          {/* Controls row */}
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-4">
              {/* Play/Pause */}
              <button
                type="button"
                onClick={togglePlay}
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 backdrop-blur-sm",
                  "hover:bg-white/20 hover:scale-110",
                  "active:scale-95",
                  "transition-all duration-300"
                )}
                style={{
                  transition: "background 0.2s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              {/* Volume */}
              <button
                type="button"
                onClick={toggleMute}
                className={cn(
                  "p-2 rounded-full",
                  "bg-white/10 backdrop-blur-sm",
                  "hover:bg-white/20 hover:scale-110",
                  "active:scale-95",
                  "transition-all duration-300"
                )}
                style={{
                  transition: "background 0.2s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? <MuteIcon /> : <VolumeIcon />}
              </button>

              {/* Time */}
              <span className="text-sm font-mono text-white/90">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              className={cn(
                "p-2 rounded-full",
                "bg-white/10 backdrop-blur-sm",
                "hover:bg-white/20 hover:scale-110",
                "active:scale-95",
                "transition-all duration-300"
              )}
              style={{
                transition: "background 0.2s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
              aria-label={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
            >
              {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// YouTube embed
export interface YouTubeEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * YouTube video ID
   */
  videoId: string
  /**
   * Aspect ratio
   */
  aspectRatio?: "16:9" | "4:3"
  /**
   * Auto play
   */
  autoPlay?: boolean
  /**
   * Rounded corners
   */
  rounded?: boolean
  /**
   * Title for iframe
   */
  title?: string
}

export function YouTubeEmbed({
  videoId,
  aspectRatio = "16:9",
  autoPlay = false,
  rounded = true,
  title = "YouTube video",
  className,
  ...props
}: YouTubeEmbedProps) {
  const src = `https://www.youtube.com/embed/${videoId}?${autoPlay ? "autoplay=1&" : ""}rel=0`

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-black",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)]",
        "transition-shadow duration-500 ease-out",
        aspectRatioClasses[aspectRatio],
        rounded && "rounded-[var(--radius-lg)]",
        className
      )}
      {...props}
    >
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}

// Vimeo embed
export interface VimeoEmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Vimeo video ID
   */
  videoId: string
  /**
   * Aspect ratio
   */
  aspectRatio?: "16:9" | "4:3"
  /**
   * Rounded corners
   */
  rounded?: boolean
  /**
   * Title for iframe
   */
  title?: string
}

export function VimeoEmbed({
  videoId,
  aspectRatio = "16:9",
  rounded = true,
  title = "Vimeo video",
  className,
  ...props
}: VimeoEmbedProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-black",
        "shadow-[0_8px_30px_rgb(0,0,0,0.12)]",
        "hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)]",
        "transition-shadow duration-500 ease-out",
        aspectRatioClasses[aspectRatio],
        rounded && "rounded-[var(--radius-lg)]",
        className
      )}
      {...props}
    >
      <iframe
        src={`https://player.vimeo.com/video/${videoId}`}
        title={title}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full"
      />
    </div>
  )
}
