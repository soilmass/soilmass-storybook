/**
 * Contact Page
 *
 * Contact form and information.
 */

import { Metadata } from "next"
import { Hero, HeroGradientText } from "@/components/sections/hero"
import { Input, Textarea, FormField, Label, FormHelp } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Soilmass team.",
}

// Icons
const MailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
)

const MessageIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
)

const GithubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.026 2.747-1.026.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
)

const contactMethods = [
  {
    icon: <MailIcon />,
    title: "Email",
    description: "Our team typically responds within 24 hours.",
    value: "hello@soilmass.com",
    href: "mailto:hello@soilmass.com",
  },
  {
    icon: <MessageIcon />,
    title: "Discord",
    description: "Join our community for discussions and support.",
    value: "Join Discord",
    href: "https://discord.gg/soilmass",
  },
  {
    icon: <GithubIcon />,
    title: "GitHub",
    description: "Report issues and contribute to the specification.",
    value: "soilmass/design-system-spec",
    href: "https://github.com/soilmass/design-system-spec",
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <Hero
        headline={
          <>
            <HeroGradientText>Get in touch</HeroGradientText>
          </>
        }
        description="Have questions about the specification? Want to discuss enterprise options? We'd love to hear from you."
      />

      {/* Contact Section */}
      <section className="px-[var(--space-6)] py-[var(--space-24)] border-t border-[var(--color-border)]">
        <div className="max-w-[var(--container-xl)] mx-auto">
          <div className="grid gap-[var(--space-16)] lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-foreground)] mb-[var(--space-6)]">
                Send us a message
              </h2>

              <form className="space-y-[var(--space-6)]">
                <div className="grid gap-[var(--space-6)] sm:grid-cols-2">
                  <FormField>
                    <Label htmlFor="firstName" required>
                      First name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      placeholder="Jane"
                      required
                    />
                  </FormField>

                  <FormField>
                    <Label htmlFor="lastName" required>
                      Last name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      placeholder="Doe"
                      required
                    />
                  </FormField>
                </div>

                <FormField>
                  <Label htmlFor="email" required>
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    required
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="company">Company</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Acme Inc."
                  />
                </FormField>

                <FormField>
                  <Label htmlFor="message" required>
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                  <FormHelp>
                    Please include as much detail as possible.
                  </FormHelp>
                </FormField>

                <Button type="submit" size="lg">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Methods */}
            <div>
              <h2 className="text-[var(--text-2xl)] font-[var(--font-bold)] text-[var(--color-foreground)] mb-[var(--space-6)]">
                Other ways to reach us
              </h2>

              <div className="space-y-[var(--space-6)]">
                {contactMethods.map((method) => (
                  <a
                    key={method.title}
                    href={method.href}
                    className="flex items-start gap-[var(--space-4)] p-[var(--space-6)] border border-[var(--color-border)] rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-hover)] transition-colors group"
                    target={method.href.startsWith("http") ? "_blank" : undefined}
                    rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    <div className="p-[var(--space-3)] bg-[var(--color-primary-muted)] text-[var(--color-primary)] rounded-[var(--radius-md)]">
                      {method.icon}
                    </div>
                    <div>
                      <h3 className="text-[var(--text-lg)] font-[var(--font-semibold)] text-[var(--color-foreground)]">
                        {method.title}
                      </h3>
                      <p className="text-[var(--text-sm)] text-[var(--color-muted-foreground)] mt-[var(--space-1)]">
                        {method.description}
                      </p>
                      <p className="text-[var(--text-sm)] text-[var(--color-primary)] font-[var(--font-medium)] mt-[var(--space-2)] group-hover:underline">
                        {method.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
