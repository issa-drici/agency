import type { Meta, StoryObj } from "@storybook/react";
import { ButtonLink } from "@/components/molecules/ButtonLink";

const meta = {
  title: "Molecules/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  args: {
    href: "/",
    children: "Aller à l'accueil",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["accent", "dark", "secondary", "ghost", "dangerGhost", "outlineLight", "text", "textMuted"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "inline"],
    },
  },
} satisfies Meta<typeof ButtonLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: {
    variant: "accent",
    size: "md",
  },
};

export const Text: Story = {
  args: {
    variant: "text",
    size: "inline",
    children: "Consulter →",
  },
};

export const OutlineLight: Story = {
  args: {
    variant: "outlineLight",
    children: "Retour à l'accueil",
  },
  decorators: [(StoryComponent) => <div className="bg-[#0c1322] p-4 rounded-lg"><StoryComponent /></div>],
};
