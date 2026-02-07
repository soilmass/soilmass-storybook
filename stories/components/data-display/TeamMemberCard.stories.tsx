import type { Meta, StoryObj } from "@storybook/react-vite"
import {
  TeamMemberCard,
  TeamGrid,
  TeamSection,
} from "@/components/ui/team-member-card"

const meta = {
  title: "Components/DataDisplay/TeamMemberCard",
  component: TeamMemberCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Display team member profiles. Features photo with fallback, name/role/bio, social links, and multiple card styles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "centered", "horizontal", "minimal"],
      description: "Card variant",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Size variant",
    },
  },
} satisfies Meta<typeof TeamMemberCard>

export default meta
type Story = StoryObj<typeof meta>

const sampleSocialLinks = [
  { platform: "twitter" as const, href: "https://twitter.com/example" },
  { platform: "linkedin" as const, href: "https://linkedin.com/in/example" },
  { platform: "github" as const, href: "https://github.com/example" },
]

// Default
export const Default: Story = {
  render: () => (
    <div className="w-80">
      <TeamMemberCard
        name="Jane Smith"
        role="CEO & Co-founder"
        bio="Leading the company vision with 15+ years of experience in tech leadership."
        photo="https://i.pravatar.cc/200?img=5"
        socialLinks={sampleSocialLinks}
      />
    </div>
  ),
}

// Variants
export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-80">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Default</p>
        <TeamMemberCard
          name="John Doe"
          role="Engineering Lead"
          bio="Building scalable systems and leading engineering teams."
          photo="https://i.pravatar.cc/200?img=3"
          socialLinks={sampleSocialLinks.slice(0, 2)}
        />
      </div>
      <div className="w-80">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Centered</p>
        <TeamMemberCard
          variant="centered"
          name="Sarah Johnson"
          role="Product Designer"
          bio="Creating beautiful and intuitive user experiences."
          photo="https://i.pravatar.cc/200?img=9"
          socialLinks={sampleSocialLinks.slice(0, 2)}
        />
      </div>
      <div className="w-96">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Horizontal</p>
        <TeamMemberCard
          variant="horizontal"
          name="Mike Chen"
          role="Backend Developer"
          bio="Specializing in distributed systems and API design."
          photo="https://i.pravatar.cc/200?img=11"
          socialLinks={sampleSocialLinks}
        />
      </div>
      <div>
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Minimal</p>
        <TeamMemberCard
          variant="minimal"
          name="Emily Davis"
          role="Marketing Manager"
          photo="https://i.pravatar.cc/200?img=21"
        />
      </div>
    </div>
  ),
}

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="w-64">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Small</p>
        <TeamMemberCard
          size="sm"
          name="Alex Wong"
          role="Developer"
          photo="https://i.pravatar.cc/200?img=7"
        />
      </div>
      <div className="w-80">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Medium</p>
        <TeamMemberCard
          size="md"
          name="Alex Wong"
          role="Developer"
          bio="Full-stack developer with a passion for clean code."
          photo="https://i.pravatar.cc/200?img=7"
        />
      </div>
      <div className="w-96">
        <p className="text-sm text-[var(--color-text-muted)] mb-2">Large</p>
        <TeamMemberCard
          size="lg"
          name="Alex Wong"
          role="Senior Developer"
          bio="Full-stack developer with a passion for clean code and building great products."
          photo="https://i.pravatar.cc/200?img=7"
          socialLinks={sampleSocialLinks}
        />
      </div>
    </div>
  ),
}

// Without photo (initials)
export const WithInitials: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[400px]">
      <TeamMemberCard
        variant="centered"
        name="Alice Brown"
        role="Designer"
      />
      <TeamMemberCard
        variant="centered"
        name="Bob Wilson"
        role="Engineer"
      />
      <TeamMemberCard
        variant="centered"
        name="Carol Martinez"
        role="Manager"
      />
      <TeamMemberCard
        variant="centered"
        name="David Lee"
        role="Analyst"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "When no photo is provided, initials are displayed with auto-generated colors.",
      },
    },
  },
}

// Clickable card
export const Clickable: Story = {
  render: () => (
    <div className="w-80">
      <TeamMemberCard
        name="Rachel Green"
        role="Design Director"
        bio="Overseeing all design initiatives and building the design team."
        photo="https://i.pravatar.cc/200?img=32"
        href="#team/rachel"
        socialLinks={sampleSocialLinks.slice(0, 2)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Clickable card that navigates to a profile page.",
      },
    },
  },
}

// Team grid
export const Grid: Story = {
  render: () => (
    <div className="w-[900px]">
      <TeamGrid columns={3}>
        {[
          { name: "Jane Smith", role: "CEO", photo: "https://i.pravatar.cc/200?img=5" },
          { name: "John Doe", role: "CTO", photo: "https://i.pravatar.cc/200?img=3" },
          { name: "Sarah Johnson", role: "CFO", photo: "https://i.pravatar.cc/200?img=9" },
          { name: "Mike Chen", role: "COO", photo: "https://i.pravatar.cc/200?img=11" },
          { name: "Emily Davis", role: "CMO", photo: "https://i.pravatar.cc/200?img=21" },
          { name: "Alex Wong", role: "CIO", photo: "https://i.pravatar.cc/200?img=7" },
        ].map((member) => (
          <TeamMemberCard
            key={member.name}
            variant="centered"
            name={member.name}
            role={member.role}
            photo={member.photo}
          />
        ))}
      </TeamGrid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Grid layout helper for team sections.",
      },
    },
  },
}

// Team section
export const Section: Story = {
  render: () => (
    <div className="w-[900px]">
      <TeamSection
        heading="Meet Our Team"
        description="The talented people behind our success."
        columns={3}
      >
        {[
          {
            name: "Jane Smith",
            role: "CEO & Co-founder",
            bio: "Leading the company vision.",
            photo: "https://i.pravatar.cc/200?img=5",
          },
          {
            name: "John Doe",
            role: "CTO & Co-founder",
            bio: "Building our technology platform.",
            photo: "https://i.pravatar.cc/200?img=3",
          },
          {
            name: "Sarah Johnson",
            role: "Head of Design",
            bio: "Creating beautiful experiences.",
            photo: "https://i.pravatar.cc/200?img=9",
          },
        ].map((member) => (
          <TeamMemberCard
            key={member.name}
            variant="centered"
            name={member.name}
            role={member.role}
            bio={member.bio}
            photo={member.photo}
            socialLinks={sampleSocialLinks.slice(0, 2)}
          />
        ))}
      </TeamSection>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Complete team section with heading and description.",
      },
    },
  },
}

// Horizontal list
export const HorizontalList: Story = {
  render: () => (
    <div className="w-[500px] space-y-4">
      {[
        { name: "Jane Smith", role: "CEO", photo: "https://i.pravatar.cc/200?img=5" },
        { name: "John Doe", role: "CTO", photo: "https://i.pravatar.cc/200?img=3" },
        { name: "Sarah Johnson", role: "Head of Design", photo: "https://i.pravatar.cc/200?img=9" },
      ].map((member) => (
        <TeamMemberCard
          key={member.name}
          variant="horizontal"
          name={member.name}
          role={member.role}
          photo={member.photo}
          bio="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
          socialLinks={sampleSocialLinks.slice(0, 2)}
        />
      ))}
    </div>
  ),
}

// Minimal list
export const MinimalList: Story = {
  render: () => (
    <div className="w-64 space-y-3">
      {[
        { name: "Jane Smith", role: "CEO" },
        { name: "John Doe", role: "CTO" },
        { name: "Sarah Johnson", role: "Head of Design" },
        { name: "Mike Chen", role: "Engineering Lead" },
      ].map((member) => (
        <TeamMemberCard
          key={member.name}
          variant="minimal"
          name={member.name}
          role={member.role}
        />
      ))}
    </div>
  ),
}
