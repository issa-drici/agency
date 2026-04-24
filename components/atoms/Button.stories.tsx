import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Button } from "@/components/atoms/Button";

const meta = {
  title: "Atoms/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Action",
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["accent", "dark", "secondary", "ghost", "dangerGhost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "inline"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Accent: Story = {
  args: { variant: "accent", children: "Valider" },
};

export const Dark: Story = {
  args: { variant: "dark", children: "Démarrer" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "Annuler" },
};

export const Ghost: Story = {
  args: { variant: "ghost", children: "Retour" },
};

export const DangerGhost: Story = {
  args: { variant: "dangerGhost", children: "Se déconnecter" },
};
