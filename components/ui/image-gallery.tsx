"use client"

/**
 * Image Gallery Component
 *
 * Image grid with lightbox and navigation.
 * Features:
 * - Multiple layout options (grid, masonry, carousel)
 * - Lightbox with glass overlay and zoom
 * - Keyboard navigation
 * - Thumbnail strip with hover scale
 * - Touch gestures support
 * - Spring transitions
 */

import * as React from "react"
import { cn } from "@/lib/utils"

// Icons
const CloseIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
)

const ChevronLeftIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ChevronRightIcon = () => (
  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

const ZoomInIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
  </svg>
)

const ZoomOutIcon = () => (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
  </svg>
)

export interface GalleryImage {
  src: string
  alt: string
  thumbnail?: string
  caption?: string
  width?: number
  height?: number
}

export interface ImageGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of images to display
   */
  images: GalleryImage[]
  /**
   * Layout variant
   */
  layout?: "grid" | "masonry" | "carousel"
  /**
   * Number of columns (for grid layout)
   */
  columns?: 2 | 3 | 4 | 5 | 6
  /**
   * Gap between images
   */
  gap?: "sm" | "md" | "lg"
  /**
   * Enable lightbox on click
   */
  lightbox?: boolean
  /**
   * Show captions below images
   */
  showCaptions?: boolean
  /**
   * Aspect ratio for grid items
   */
  aspectRatio?: "square" | "4:3" | "16:9" | "auto"
  /**
   * Enable rounded corners
   */
  rounded?: boolean
}

const columnClasses = {
  2: "grid-cols-2",
  3: "grid-cols-2 md:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6",
}

const gapClasses = {
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
}

const aspectRatioClasses = {
  square: "aspect-square",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  auto: "",
}

export function ImageGallery({
  images,
  layout = "grid",
  columns = 3,
  gap = "md",
  lightbox = true,
  showCaptions = false,
  aspectRatio = "square",
  rounded = true,
  className,
  ...props
}: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [zoom, setZoom] = React.useState(1)

  const openLightbox = (index: number) => {
    if (!lightbox) return
    setCurrentIndex(index)
    setZoom(1)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    setZoom(1)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    setZoom(1)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    setZoom(1)
  }

  const toggleZoom = () => {
    setZoom((prev) => (prev === 1 ? 2 : 1))
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
    setZoom(1)
  }

  // Keyboard navigation
  React.useEffect(() => {
    if (!lightboxOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          closeLightbox()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
        case "+":
        case "=":
          setZoom((prev) => Math.min(prev + 0.5, 3))
          break
        case "-":
          setZoom((prev) => Math.max(prev - 0.5, 1))
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [lightboxOpen])

  // Grid layout
  if (layout === "grid") {
    return (
      <>
        <div
          className={cn(
            "grid",
            columnClasses[columns],
            gapClasses[gap],
            className
          )}
          {...props}
        >
          {images.map((image, index) => (
            <figure key={index} className="group">
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className={cn(
                  "relative w-full overflow-hidden",
                  "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
                  "hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]",
                  "transition-all duration-500 ease-out",
                  aspectRatioClasses[aspectRatio],
                  rounded && "rounded-[var(--radius-lg)]",
                  lightbox && "cursor-pointer",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2"
                )}
                style={{
                  transition: "box-shadow 0.5s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
                disabled={!lightbox}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className={cn(
                    "w-full h-full object-cover",
                    "transition-transform duration-500",
                    lightbox && "group-hover:scale-110"
                  )}
                  style={{
                    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                />
                {lightbox && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                )}
              </button>
              {showCaptions && image.caption && (
                <figcaption className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {lightbox && (
          <Lightbox
            images={images}
            currentIndex={currentIndex}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onGoToIndex={goToIndex}
            zoom={zoom}
            onZoomToggle={toggleZoom}
          />
        )}
      </>
    )
  }

  // Masonry layout
  if (layout === "masonry") {
    return (
      <>
        <div
          className={cn("columns-2 md:columns-3 lg:columns-4", gapClasses[gap], className)}
          {...props}
        >
          {images.map((image, index) => (
            <figure key={index} className="group break-inside-avoid mb-4">
              <button
                type="button"
                onClick={() => openLightbox(index)}
                className={cn(
                  "relative w-full overflow-hidden",
                  "shadow-[0_4px_20px_rgb(0,0,0,0.08)]",
                  "hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)]",
                  "transition-all duration-500 ease-out",
                  rounded && "rounded-[var(--radius-lg)]",
                  lightbox && "cursor-pointer",
                  "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)] focus:ring-offset-2"
                )}
                style={{
                  transition: "box-shadow 0.5s ease-out, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
                disabled={!lightbox}
              >
                <img
                  src={image.thumbnail || image.src}
                  alt={image.alt}
                  className={cn(
                    "w-full object-cover",
                    "transition-transform duration-500",
                    lightbox && "group-hover:scale-110"
                  )}
                  style={{
                    transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
                  }}
                />
                {lightbox && (
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                )}
              </button>
              {showCaptions && image.caption && (
                <figcaption className="mt-2 text-sm text-[var(--color-text-muted)]">
                  {image.caption}
                </figcaption>
              )}
            </figure>
          ))}
        </div>

        {lightbox && (
          <Lightbox
            images={images}
            currentIndex={currentIndex}
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            onPrevious={goToPrevious}
            onNext={goToNext}
            onGoToIndex={goToIndex}
            zoom={zoom}
            onZoomToggle={toggleZoom}
          />
        )}
      </>
    )
  }

  // Carousel layout
  return (
    <>
      <div className={cn("relative", className)} {...props}>
        <div className="overflow-hidden rounded-[var(--radius-lg)] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <div
            className="flex"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
              transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className={cn("flex-shrink-0 w-full", gapClasses[gap])}
              >
                <figure>
                  <button
                    type="button"
                    onClick={() => lightbox && openLightbox(index)}
                    className={cn(
                      "relative w-full overflow-hidden",
                      aspectRatioClasses[aspectRatio === "auto" ? "16:9" : aspectRatio],
                      rounded && "rounded-[var(--radius-lg)]",
                      lightbox && "cursor-pointer",
                      "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
                    )}
                    disabled={!lightbox}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                  {showCaptions && image.caption && (
                    <figcaption className="mt-3 text-center text-sm text-[var(--color-text-muted)]">
                      {image.caption}
                    </figcaption>
                  )}
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation arrows with glass effect */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className={cn(
                "absolute left-3 top-1/2 -translate-y-1/2",
                "h-12 w-12 rounded-full",
                "bg-white/80 backdrop-blur-md",
                "hover:bg-white hover:scale-110",
                "active:scale-95",
                "flex items-center justify-center",
                "text-[var(--color-text)]",
                "shadow-[0_4px_20px_rgb(0,0,0,0.15)]",
                "hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
              )}
              style={{
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
              aria-label="Previous image"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={goToNext}
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "h-12 w-12 rounded-full",
                "bg-white/80 backdrop-blur-md",
                "hover:bg-white hover:scale-110",
                "active:scale-95",
                "flex items-center justify-center",
                "text-[var(--color-text)]",
                "shadow-[0_4px_20px_rgb(0,0,0,0.15)]",
                "hover:shadow-[0_8px_30px_rgb(0,0,0,0.2)]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--color-focus)]"
              )}
              style={{
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
              aria-label="Next image"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}

        {/* Dots indicator */}
        {images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  "transition-all duration-300",
                  index === currentIndex
                    ? "bg-[var(--color-primary)] scale-110"
                    : "bg-[var(--color-border)] hover:bg-[var(--color-text-muted)] hover:scale-110"
                )}
                style={{
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {lightbox && (
        <Lightbox
          images={images}
          currentIndex={currentIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onGoToIndex={goToIndex}
          zoom={zoom}
          onZoomToggle={toggleZoom}
        />
      )}
    </>
  )
}

// Lightbox component with glass overlay
interface LightboxProps {
  images: GalleryImage[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  onGoToIndex: (index: number) => void
  zoom: number
  onZoomToggle: () => void
}

function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  onGoToIndex,
  zoom,
  onZoomToggle,
}: LightboxProps) {
  if (!isOpen) return null

  const currentImage = images[currentIndex]

  return (
    <div
      className={cn(
        "fixed inset-0 z-50",
        "bg-black/90 backdrop-blur-xl"
      )}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image lightbox"
    >
      {/* Glass header bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        {/* Zoom controls */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onZoomToggle()
          }}
          className={cn(
            "h-11 w-11 rounded-full",
            "bg-white/10 backdrop-blur-md",
            "hover:bg-white/20 hover:scale-110",
            "active:scale-95",
            "flex items-center justify-center",
            "text-white",
            "focus:outline-none focus:ring-2 focus:ring-white/50"
          )}
          style={{
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
          aria-label={zoom > 1 ? "Zoom out" : "Zoom in"}
        >
          {zoom > 1 ? <ZoomOutIcon /> : <ZoomInIcon />}
        </button>

        {/* Image counter */}
        <div className="text-white text-sm font-medium px-4 py-2 rounded-full bg-white/10 backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "h-11 w-11 rounded-full",
            "bg-white/10 backdrop-blur-md",
            "hover:bg-white/20 hover:scale-110",
            "active:scale-95",
            "flex items-center justify-center",
            "text-white",
            "focus:outline-none focus:ring-2 focus:ring-white/50"
          )}
          style={{
            transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
          aria-label="Close lightbox"
        >
          <CloseIcon />
        </button>
      </div>

      {/* Main image */}
      <div
        className="absolute inset-0 flex items-center justify-center p-16"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-full object-contain"
          style={{
            transform: `scale(${zoom})`,
            transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        />
      </div>

      {/* Caption */}
      {currentImage.caption && (
        <div className="absolute bottom-24 left-0 right-0 text-center">
          <p className="text-white text-sm px-4 py-2 inline-block rounded-full bg-white/10 backdrop-blur-md">
            {currentImage.caption}
          </p>
        </div>
      )}

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onPrevious()
            }}
            className={cn(
              "absolute left-4 top-1/2 -translate-y-1/2",
              "h-14 w-14 rounded-full",
              "bg-white/10 backdrop-blur-md",
              "hover:bg-white/20 hover:scale-110",
              "active:scale-95",
              "flex items-center justify-center",
              "text-white",
              "shadow-[0_4px_30px_rgb(0,0,0,0.3)]",
              "focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
            style={{
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className={cn(
              "absolute right-4 top-1/2 -translate-y-1/2",
              "h-14 w-14 rounded-full",
              "bg-white/10 backdrop-blur-md",
              "hover:bg-white/20 hover:scale-110",
              "active:scale-95",
              "flex items-center justify-center",
              "text-white",
              "shadow-[0_4px_30px_rgb(0,0,0,0.3)]",
              "focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
            style={{
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}

      {/* Thumbnail strip with glass effect and hover scale */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 max-w-[90vw] overflow-x-auto p-3 rounded-2xl bg-white/10 backdrop-blur-xl">
          {images.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                onGoToIndex(index)
              }}
              className={cn(
                "flex-shrink-0 h-16 w-16 rounded-lg overflow-hidden",
                "border-2 transition-all duration-300",
                "hover:scale-110",
                index === currentIndex
                  ? "border-white shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                  : "border-transparent opacity-60 hover:opacity-100"
              )}
              style={{
                transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
              }}
            >
              <img
                src={image.thumbnail || image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// Simple image grid without lightbox
export interface SimpleImageGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of images
   */
  images: GalleryImage[]
  /**
   * Number of columns
   */
  columns?: 2 | 3 | 4
  /**
   * Gap size
   */
  gap?: "sm" | "md" | "lg"
}

export function SimpleImageGrid({
  images,
  columns = 3,
  gap = "md",
  className,
  ...props
}: SimpleImageGridProps) {
  return (
    <ImageGallery
      images={images}
      columns={columns}
      gap={gap}
      lightbox={false}
      className={className}
      {...props}
    />
  )
}

// Image carousel (single image at a time)
export interface ImageCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of images
   */
  images: GalleryImage[]
  /**
   * Auto-advance interval in ms (0 to disable)
   */
  autoPlay?: number
  /**
   * Show captions
   */
  showCaptions?: boolean
}

export function ImageCarousel({
  images,
  autoPlay = 0,
  showCaptions = false,
  className,
  ...props
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)

  React.useEffect(() => {
    if (autoPlay <= 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }, autoPlay)

    return () => clearInterval(interval)
  }, [autoPlay, images.length])

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className={cn("relative", className)} {...props}>
      <div className="overflow-hidden rounded-[var(--radius-lg)] shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
        <div
          className="flex"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: "transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)"
          }}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full">
              <div className="aspect-video relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      {showCaptions && images[currentIndex]?.caption && (
        <p className="mt-3 text-center text-[var(--color-text-muted)]">
          {images[currentIndex].caption}
        </p>
      )}

      {/* Navigation with glass effect */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className={cn(
              "absolute left-3 top-1/2 -translate-y-1/2",
              "h-12 w-12 rounded-full",
              "bg-black/40 backdrop-blur-md",
              "hover:bg-black/60 hover:scale-110",
              "active:scale-95",
              "flex items-center justify-center",
              "text-white",
              "shadow-[0_4px_20px_rgb(0,0,0,0.3)]",
              "focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
            style={{
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            aria-label="Previous image"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2",
              "h-12 w-12 rounded-full",
              "bg-black/40 backdrop-blur-md",
              "hover:bg-black/60 hover:scale-110",
              "active:scale-95",
              "flex items-center justify-center",
              "text-white",
              "shadow-[0_4px_20px_rgb(0,0,0,0.3)]",
              "focus:outline-none focus:ring-2 focus:ring-white/50"
            )}
            style={{
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
            }}
            aria-label="Next image"
          >
            <ChevronRightIcon />
          </button>

          {/* Dots with glass background */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 px-3 py-2 rounded-full bg-black/30 backdrop-blur-md">
            {images.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "h-2.5 w-2.5 rounded-full",
                  "transition-all duration-300",
                  index === currentIndex
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/80 hover:scale-110"
                )}
                style={{
                  transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)"
                }}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
