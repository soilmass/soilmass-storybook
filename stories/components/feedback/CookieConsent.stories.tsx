"use client"

import type { Meta, StoryObj } from "@storybook/react-vite"
import { CookieConsent, SimpleCookieConsent } from "@/components/ui/cookie-consent"

const meta = {
  title: "Components/Feedback/CookieConsent",
  component: CookieConsent,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "GDPR-compliant cookie consent banner. Features accept/reject all options, granular preference management, persistent storage, customizable text, and multiple positions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["bottom", "bottom-left", "bottom-right", "top"],
      description: "Banner position",
    },
    variant: {
      control: "radio",
      options: ["banner", "modal", "floating"],
      description: "Display variant",
    },
    showCategories: {
      control: "boolean",
      description: "Show preference categories",
    },
  },
} satisfies Meta<typeof CookieConsent>

export default meta
type Story = StoryObj<typeof meta>

// Clear storage before each story
const clearStorage = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("cookie-consent")
    localStorage.removeItem("cookie-consent-simple")
  }
}

// Default banner
export const Default: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[400px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          onAccept={(prefs) => console.log("Accepted:", prefs)}
          onReject={() => console.log("Rejected")}
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
}

// With policy links
export const WithPolicyLinks: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[400px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          privacyPolicyUrl="#privacy"
          cookiePolicyUrl="#cookies"
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
}

// Floating variant
export const Floating: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[500px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          variant="floating"
          position="bottom-right"
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Floating card variant, typically positioned in a corner.",
      },
    },
  },
}

// Floating bottom-left
export const FloatingBottomLeft: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[500px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          variant="floating"
          position="bottom-left"
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
}

// Top position
export const TopPosition: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[400px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          position="top"
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
}

// Custom text
export const CustomText: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[400px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          heading="Your Privacy Matters"
          description="We value your privacy. Choose which cookies you'd like to allow. Essential cookies are required for the site to function properly."
          acceptAllText="Accept Cookies"
          rejectAllText="Only Essential"
          customizeText="Manage Preferences"
          saveText="Save My Choices"
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
}

// Without categories
export const WithoutCategories: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[400px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          showCategories={false}
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Simplified banner without category customization option.",
      },
    },
  },
}

// Custom category descriptions
export const CustomCategories: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[500px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          variant="floating"
          position="bottom-right"
          categoryDescriptions={{
            necessary: "Required for site functionality. Always enabled.",
            analytics: "Help us improve by collecting anonymous usage data.",
            marketing: "Allow personalized ads based on your interests.",
            preferences: "Remember your language and display settings.",
          }}
          storageKey={`demo-${Date.now()}`}
        />
      </div>
    )
  },
}

// Simple cookie consent
export const Simple: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[300px] bg-[var(--color-surface-muted)] relative">
        <SimpleCookieConsent
          message="We use cookies to improve your experience on our site."
          acceptText="Accept"
          learnMoreUrl="#"
          storageKey={`demo-simple-${Date.now()}`}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Simple cookie consent with just accept button, ideal for minimal compliance.",
      },
    },
  },
}

// Simple with custom message
export const SimpleCustom: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[300px] bg-[var(--color-surface-muted)] relative">
        <SimpleCookieConsent
          message="This website uses cookies to ensure you get the best experience. By continuing to browse, you agree to our use of cookies."
          acceptText="Got it!"
          learnMoreUrl="#"
          learnMoreText="Cookie Policy"
          storageKey={`demo-simple-${Date.now()}`}
        />
      </div>
    )
  },
}

// In page context
export const InPageContext: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="min-h-[600px] bg-[var(--color-surface)]">
        <header className="p-4 border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="font-bold text-lg text-[var(--color-text)]">Logo</div>
            <nav className="flex gap-6">
              {["Home", "Products", "About", "Contact"].map((item) => (
                <a key={item} href="#" className="text-sm text-[var(--color-text-muted)]">
                  {item}
                </a>
              ))}
            </nav>
          </div>
        </header>
        <main className="p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-[var(--color-text)]">Welcome</h1>
            <p className="mt-4 text-[var(--color-text-muted)]">
              This is a sample page showing the cookie consent banner in context.
            </p>
          </div>
        </main>
        <CookieConsent
          position="bottom"
          storageKey={`demo-context-${Date.now()}`}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Cookie consent banner shown in the context of a typical website layout.",
      },
    },
  },
}

// EU GDPR compliant
export const GDPRCompliant: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[500px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          heading="Cookie Preferences"
          description="We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking 'Accept All' you consent to this, as outlined in our Cookie Policy. To set your preferences or reject non-essential cookies, click 'Customize'."
          variant="floating"
          position="bottom-right"
          privacyPolicyUrl="#privacy"
          cookiePolicyUrl="#cookies"
          categoryDescriptions={{
            necessary: "Strictly necessary cookies are essential for the website to function. They enable basic functions like page navigation and access to secure areas. The website cannot function properly without these cookies.",
            analytics: "Analytics cookies help us understand how visitors interact with our website. They collect anonymous information that is used to improve our website and user experience.",
            marketing: "Marketing cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user.",
            preferences: "Preference cookies enable the website to remember information that changes the way the website behaves or looks, like your preferred language or region.",
          }}
          storageKey={`demo-gdpr-${Date.now()}`}
        />
      </div>
    )
  },
  parameters: {
    docs: {
      description: {
        story: "Comprehensive GDPR-compliant cookie consent with detailed category descriptions.",
      },
    },
  },
}

// Compact floating
export const CompactFloating: Story = {
  render: () => {
    clearStorage()
    return (
      <div className="h-[400px] bg-[var(--color-surface-muted)] relative">
        <CookieConsent
          variant="floating"
          position="bottom-left"
          heading="Cookies"
          description="We use cookies to improve your experience."
          showCategories={false}
          storageKey={`demo-compact-${Date.now()}`}
        />
      </div>
    )
  },
}
