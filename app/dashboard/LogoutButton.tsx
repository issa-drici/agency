"use client";

import { signOut } from "next-auth/react";
import { Button } from "@/components/atoms/Button";

export function LogoutButton() {
  return (
    <Button
      type="button"
      onClick={() => void signOut({ callbackUrl: "/" })}
      variant="dangerGhost"
      size="inline"
      className="text-xs"
    >
      Se déconnecter
    </Button>
  );
}
