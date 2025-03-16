"use client";
import { useEffect, useState } from "react";
import { SunMedium, MoonStar, LaptopMinimal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const getIcon = () => {
    if (theme === "light") return <SunMedium />;
    if (theme === "dark") return <MoonStar />;
    return <LaptopMinimal />;
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="scale-95 rounded-lg"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
