import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "@/components/atoms/Input";
import { FormField } from "@/components/molecules/FormField";

const meta = {
  title: "Molecules/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    htmlFor: "email",
    label: "Adresse email",
    children: <Input id="email" type="email" placeholder="vous@entreprise.fr" />,
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Email: Story = {};

export const Password: Story = {
  args: {
    htmlFor: "password",
    label: "Mot de passe",
    required: true,
    helpText: "Minimum 8 caractères.",
    children: <Input id="password" type="password" placeholder="••••••••" />,
  },
};

export const Error: Story = {
  args: {
    htmlFor: "email-error",
    label: "Adresse email",
    error: "Veuillez saisir un email valide.",
    children: (
      <Input
        id="email-error"
        type="email"
        variant="error"
        aria-invalid
        placeholder="vous@entreprise.fr"
      />
    ),
  },
};
