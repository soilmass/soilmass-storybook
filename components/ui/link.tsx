/**
 * Link Component
 *
 * Spec: domains/components/052-links.yaml
 *
 * Rules from spec:
 * - LNK1: Links MUST be distinguishable from surrounding text
 * - LNK2: Links MUST have visible focus indicator
 * - LNK3: External links SHOULD indicate they open in new tab
 * - LNK4: Links MUST have underline or 3:1 contrast with surrounding text
 *
 * Tokens consumed:
 * - --color-link, --color-link-hover
 * - --color-primary (focus ring)
 * - --duration-fast, --ease-spring
 *
 * Premium patterns:
 * - Animated underline with spring transition
 * - Color transitions with glow effect on hover
 * - Smooth external icon animation
 */

import NextLink from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const linkVariants = cva(
  // Base styles - matching Domain 52 spec with premium animations
  [
    "text-[var(--color-link)]",
    "relative inline-block",
    "transition-all duration-[var(--duration-normal)] ease-[var(--ease-spring)]",
    // Focus ring with glow
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]",
    "focus-visible:rounded-sm",
  ],
  {
    variants: {
      variant: {
        default: [
          // Animated underline effect
          "after:absolute after:bottom-0 after:left-0 after:h-[1px]",
          "after:w-full after:bg-current after:origin-left",
          "after:transition-transform after:duration-[var(--duration-normal)] after:ease-[var(--ease-spring)]",
          "hover:text-[var(--color-link-hover)]",
          "hover:after:scale-x-110",
          // Subtle glow on hover
          "hover:drop-shadow-[0_0_8px_var(--color-primary)]",
        ],
        subtle: [
          // Underline grows from center on hover
          "after:absolute after:bottom-0 after:left-1/2 after:h-[1px]",
          "after:w-0 after:bg-current after:-translate-x-1/2",
          "after:transition-all after:duration-[var(--duration-normal)] after:ease-[var(--ease-spring)]",
          "hover:text-[var(--color-link-hover)]",
          "hover:after:w-full",
        ],
        muted: [
          "text-[var(--color-muted-foreground)]",
          // Underline slides in from left
          "after:absolute after:bottom-0 after:left-0 after:h-[1px]",
          "after:w-0 after:bg-[var(--color-link)]",
          "after:transition-all after:duration-[var(--duration-normal)] after:ease-[var(--ease-spring)]",
          "hover:text-[var(--color-link)]",
          "hover:after:w-full",
        ],
        nav: [
          "text-[var(--color-foreground)]",
          // Highlight indicator
          "before:absolute before:-bottom-1 before:left-0 before:h-0.5",
          "before:w-0 before:bg-[var(--color-primary)] before:rounded-full",
          "before:transition-all before:duration-[var(--duration-normal)] before:ease-[var(--ease-spring)]",
          "hover:text-[var(--color-muted-foreground)]",
          "hover:before:w-full",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// External link icon as inline SVG with animation
const ExternalIcon = () => (
  <svg
    className={cn(
      "ml-1 inline-block h-[0.75em] w-[0.75em] align-middle",
      "transition-transform duration-[var(--duration-fast)] ease-[var(--ease-spring)]",
      "group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
    )}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export interface LinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">,
    VariantProps<typeof linkVariants> {
  /**
   * The URL to link to. Can be internal or external.
   */
  href: string
  /**
   * Whether this is an external link. Auto-detected if not provided.
   */
  external?: boolean
}

/**
 * Link component following Domain 52 specification.
 *
 * @example
 * // Internal link
 * <Link href="/about">About us</Link>
 *
 * @example
 * // External link (auto-detected)
 * <Link href="https://github.com">GitHub</Link>
 *
 * @example
 * // Subtle variant (no underline until hover)
 * <Link href="/pricing" variant="subtle">Pricing</Link>
 */
export function Link({
  className,
  variant,
  href,
  external,
  children,
  ...props
}: LinkProps) {
  // Auto-detect external links
  const isExternal =
    external ??
    (href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("//"))

  if (isExternal) {
    return (
      <a
        href={href}
        className={cn(linkVariants({ variant, className }), "group")}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <ExternalIcon />
        <span className="sr-only">(opens in new tab)</span>
      </a>
    )
  }

  return (
    <NextLink
      href={href}
      className={cn(linkVariants({ variant, className }))}
      {...props}
    >
      {children}
    </NextLink>
  )
}

export { linkVariants }
