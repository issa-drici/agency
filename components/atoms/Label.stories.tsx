import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "@/components/atoms/Label";

const meta = {
  title: "Atoms/Label",
  component: Label,
  tags: ["autodocs"],
  args: {
    children: "Adresse email",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    children: "Mot de passe",
    required: true,
  },
};

export const Error: Story = {
  args: {
    children: "Adresse email",
    variant: "error",
  },
};
