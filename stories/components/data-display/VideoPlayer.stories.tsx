"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  VideoPlayer,
  YouTubeEmbed,
  VimeoEmbed,
} from "@/components/ui/video-player"

const meta = {
  title: "Components/DataDisplay/VideoPlayer",
  component: VideoPlayer,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Video playback with custom controls. Features play/pause, progress bar with seek, volume control, fullscreen support, and poster image. Includes YouTube and Vimeo embed variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    aspectRatio: {
      control: "radio",
      options: ["16:9", "4:3", "1:1", "9:16"],
      description: "Aspect ratio",
    },
    controls: {
      control: "boolean",
      description: "Show controls",
    },
    autoPlay: {
      control: "boolean",
      description: "Auto play (muted by browser policy)",
    },
    loop: {
      control: "boolean",
      description: "Loop video",
    },
    muted: {
      control: "boolean",
      description: "Start muted",
    },
    rounded: {
      control: "boolean",
      description: "Rounded corners",
    },
  },
} satisfies Meta<typeof VideoPlayer>

export default meta
type Story = StoryObj<typeof meta>

// Sample video (using a placeholder - in real usage would be actual video URL)
const sampleVideo = "https://www.w3schools.com/html/mov_bbb.mp4"
const samplePoster = "https://placehold.co/1280x720/1e293b/475569?text=Video+Poster"

// Default player
export const Default: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer
        src={sampleVideo}
        poster={samplePoster}
      />
    </div>
  ),
}

// Aspect ratios
export const AspectRatios: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-[480px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">16:9 (Default)</p>
        <VideoPlayer src={sampleVideo} aspectRatio="16:9" poster={samplePoster} />
      </div>
      <div className="w-[480px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">4:3</p>
        <VideoPlayer src={sampleVideo} aspectRatio="4:3" poster={samplePoster} />
      </div>
      <div className="w-[300px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">1:1 (Square)</p>
        <VideoPlayer src={sampleVideo} aspectRatio="1:1" poster={samplePoster} />
      </div>
      <div className="w-[200px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">9:16 (Vertical)</p>
        <VideoPlayer src={sampleVideo} aspectRatio="9:16" poster={samplePoster} />
      </div>
    </div>
  ),
}

// Auto play (muted)
export const AutoPlay: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer
        src={sampleVideo}
        autoPlay
        muted
        loop
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Auto-playing video (muted due to browser policy). Also loops.",
      },
    },
  },
}

// Without controls
export const WithoutControls: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer
        src={sampleVideo}
        poster={samplePoster}
        controls={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Video without custom controls. Click to play/pause.",
      },
    },
  },
}

// No rounded corners
export const NoRounding: Story = {
  render: () => (
    <div className="w-[640px]">
      <VideoPlayer
        src={sampleVideo}
        poster={samplePoster}
        rounded={false}
      />
    </div>
  ),
}

// YouTube embed
export const YouTubeExample: Story = {
  render: () => (
    <div className="w-[640px]">
      <YouTubeEmbed
        videoId="dQw4w9WgXcQ"
        title="Sample YouTube Video"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "YouTube video embed with responsive aspect ratio.",
      },
    },
  },
}

// Vimeo embed
export const VimeoExample: Story = {
  render: () => (
    <div className="w-[640px]">
      <VimeoEmbed
        videoId="76979871"
        title="Sample Vimeo Video"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Vimeo video embed with responsive aspect ratio.",
      },
    },
  },
}

// Embed aspect ratios
export const EmbedAspectRatios: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-[480px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">16:9</p>
        <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="16:9" />
      </div>
      <div className="w-[480px]">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">4:3</p>
        <YouTubeEmbed videoId="dQw4w9WgXcQ" aspectRatio="4:3" />
      </div>
    </div>
  ),
}

// Video gallery
export const VideoGallery: Story = {
  render: () => (
    <div className="w-[900px]">
      <h2 className="text-xl font-bold text-[var(--color-text)] mb-6">Featured Videos</h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <VideoPlayer src={sampleVideo} poster={samplePoster} />
          <h3 className="font-medium text-[var(--color-text)]">Product Demo</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Watch our product in action
          </p>
        </div>
        <div className="space-y-2">
          <VideoPlayer src={sampleVideo} poster={samplePoster} />
          <h3 className="font-medium text-[var(--color-text)]">Tutorial</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Getting started guide
          </p>
        </div>
        <div className="space-y-2">
          <VideoPlayer src={sampleVideo} poster={samplePoster} />
          <h3 className="font-medium text-[var(--color-text)]">Testimonial</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Hear from our customers
          </p>
        </div>
        <div className="space-y-2">
          <VideoPlayer src={sampleVideo} poster={samplePoster} />
          <h3 className="font-medium text-[var(--color-text)]">Behind the Scenes</h3>
          <p className="text-sm text-[var(--color-text-muted)]">
            Meet our team
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Video gallery with multiple players.",
      },
    },
  },
}

// Hero video section
export const HeroVideoSection: Story = {
  render: () => (
    <section className="relative w-[900px]">
      <div className="relative rounded-[var(--radius-xl)] overflow-hidden">
        <VideoPlayer
          src={sampleVideo}
          poster={samplePoster}
          autoPlay
          muted
          loop
          controls={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Welcome to Our Platform
            </h1>
            <p className="text-lg text-white/80 mb-4">
              Experience the future of productivity
            </p>
            <button className="px-6 py-3 bg-white text-[var(--color-text)] rounded-[var(--radius-lg)] font-medium hover:bg-white/90 transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  ),
  parameters: {
    docs: {
      description: {
        story: "Hero section with background video.",
      },
    },
  },
}

// Multiple embed platforms
export const EmbedPlatforms: Story = {
  render: () => (
    <div className="w-[800px] space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">YouTube</h3>
        <YouTubeEmbed videoId="dQw4w9WgXcQ" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Vimeo</h3>
        <VimeoEmbed videoId="76979871" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text)] mb-4">Self-hosted</h3>
        <VideoPlayer src={sampleVideo} poster={samplePoster} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Comparison of different video embed platforms.",
      },
    },
  },
}
