"use client";
import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { SunIcon, MoonIcon } from "lucide-react";

const ModeToggle = () => {

  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  

  const isDarkMode = theme === "dark";
  
  return (
    <div className="flex items-center   gap-2">
      <Button
        variant="ghost"
        className="focus-visible:ring-0  focus-visible:ring-offset-0"
      >
        {theme === "dark" ? <MoonIcon /> : <SunIcon />}
      </Button>

      <Switch
        id="theme-toggle"
        checked={isDarkMode}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
      />
    </div>
  );
};

export default ModeToggle;

