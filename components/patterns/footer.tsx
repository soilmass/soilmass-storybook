/**
 * Footer Component
 *
 * Spec: domains/components/070-footer.yaml
 *
 * Rules from spec:
 * - FTR1: Footer MUST use role='contentinfo'
 * - FTR2: Footer nav MUST have distinct aria-label
 * - FTR3: Social links MUST have accessible names
 *
 * Tokens consumed:
 * - --color-surface-muted, --color-border
 * - --color-foreground, --color-muted-foreground
 * - --space-3, --space-4, --space-6, --space-8, --space-12
 */

import NextLink from "next/link"

// Social Icons
function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      />
    </svg>
  )
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

interface FooterLink {
  label: string
  href: string
}

interface FooterColumn {
  title: string
  links: FooterLink[]
}

interface SocialLink {
  label: string
  href: string
  icon: "twitter" | "github" | "linkedin"
}

export interface FooterProps {
  /**
   * Brand description shown in footer
   */
  description?: string
  /**
   * Navigation columns
   */
  columns?: FooterColumn[]
  /**
   * Social media links
   */
  socialLinks?: SocialLink[]
  /**
   * Copyright text (year is auto-added)
   */
  companyName?: string
}

const defaultColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/docs" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
]

const defaultSocialLinks: SocialLink[] = [
  { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
  { label: "GitHub", href: "https://github.com", icon: "github" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
]

const SocialIcon = ({ icon }: { icon: SocialLink["icon"] }) => {
  switch (icon) {
    case "twitter":
      return <TwitterIcon />
    case "github":
      return <GitHubIcon />
    case "linkedin":
      return <LinkedInIcon />
  }
}

/**
 * Footer component following Domain 70 specification.
 * Features subtle gradient top border and animated link hover effects.
 *
 * @example
 * <Footer />
 *
 * @example
 * <Footer
 *   description="Building the future of design systems."
 *   companyName="Soilmass"
 * />
 */
export function Footer({
  description = "Reference implementation of the Soilmass Design System. Built with Next.js 15, React 19, and Tailwind CSS v4.",
  columns = defaultColumns,
  socialLinks = defaultSocialLinks,
  companyName = "Soilmass",
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="
        relative
        bg-[var(--color-surface-muted)]
        pt-[var(--space-12)] pb-[var(--space-8)]
      "
      role="contentinfo"
    >
      {/* Subtle gradient top border */}
      <div
        className="
          absolute top-0 left-0 right-0 h-px
          bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent
        "
      />

      <div className="max-w-[var(--container-xl)] mx-auto px-[var(--space-6)]">
        {/* Main Grid */}
        <div
          className="
            grid gap-[var(--space-8)]
            grid-cols-2 sm:grid-cols-2 lg:grid-cols-6
          "
        >
          {/* Brand Column */}
          <div className="col-span-2">
            <NextLink
              href="/"
              className="
                inline-block font-[var(--font-bold)] text-[var(--text-xl)] mb-[var(--space-4)]
                transition-opacity duration-200 hover:opacity-80
              "
            >
              {companyName}
            </NextLink>
            <p className="text-[var(--text-sm)] text-[var(--color-muted-foreground)] max-w-xs">
              {description}
            </p>
          </div>

          {/* Navigation Columns - Rule FTR2 */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="text-[var(--text-sm)] font-[var(--font-semibold)] text-[var(--color-foreground)] mb-[var(--space-4)]">
                {column.title}
              </h2>
              <ul className="flex flex-col gap-[var(--space-3)]">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <NextLink
                      href={link.href}
                      className="
                        group relative inline-block
                        text-[var(--text-sm)] text-[var(--color-muted-foreground)]
                        hover:text-[var(--color-foreground)]
                        transition-colors duration-[var(--duration-fast)]
                      "
                    >
                      {link.label}
                      {/* Animated underline on hover */}
                      <span
                        className="
                          absolute bottom-0 left-0 w-full h-px
                          bg-[var(--color-foreground)]
                          origin-left scale-x-0
                          transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                          group-hover:scale-x-100
                        "
                      />
                    </NextLink>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Bottom Bar */}
        <div
          className="
            relative
            flex flex-col sm:flex-row sm:justify-between sm:items-center gap-[var(--space-4)]
            mt-[var(--space-12)] pt-[var(--space-6)]
          "
        >
          {/* Gradient divider */}
          <div
            className="
              absolute top-0 left-0 right-0 h-px
              bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent
            "
          />

          {/* Copyright */}
          <p className="text-[var(--text-sm)] text-[var(--color-muted-foreground)]">
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>

          {/* Social Links - Rule FTR3 */}
          <div className="flex gap-[var(--space-4)]">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="
                  text-[var(--color-muted-foreground)]
                  hover:text-[var(--color-foreground)]
                  transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                  hover:scale-110 hover:-translate-y-0.5
                "
                aria-label={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
