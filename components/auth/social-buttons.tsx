"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";

interface SocialButtonsProps {
  mode?: "signin" | "signup";
}

export function SocialButtons({ mode = "signin" }: SocialButtonsProps) {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [githubLoading, setGithubLoading] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        variant="outline"
        className="w-full"
        disabled={googleLoading}
        onClick={async () => {
          setGoogleLoading(true);
          await new Promise((r) => setTimeout(r, 1000));
          setGoogleLoading(false);
        }}
      >
        {googleLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        ) : (
          <Icons.User className="mr-2 h-4 w-4" />
        )}
        Google
      </Button>
      <Button
        variant="outline"
        className="w-full"
        disabled={githubLoading}
        onClick={async () => {
          setGithubLoading(true);
          await new Promise((r) => setTimeout(r, 1000));
          setGithubLoading(false);
        }}
      >
        {githubLoading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
        ) : (
          <Icons.User className="mr-2 h-4 w-4" />
        )}
        GitHub
      </Button>
    </div>
  );
}