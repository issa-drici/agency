import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/atoms/Input";

const meta = {
  title: "Atoms/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "vous@entreprise.fr",
    type: "text",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Email: Story = {
  args: {
    type: "email",
  },
};

export const Password: Story = {
  args: {
    type: "password",
    placeholder: "••••••••",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "champ désactivé",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    value: "email invalide",
    "aria-invalid": true,
  },
};
