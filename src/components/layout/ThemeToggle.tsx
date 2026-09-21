"use client";

import { useTheme } from "next-themes";
import { Icon } from "@/components/ui";
import { Button } from "@/components/ui/button/Button";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <Button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      size="icon"
      variant="ghost"
    >
      {/* Both icons render; CSS picks one, so there is no hydration flicker. */}
      <Icon className="dark:hidden" name="moon" size={18} />
      <Icon className="hidden dark:block" name="sun" size={18} />
    </Button>
  );
};
