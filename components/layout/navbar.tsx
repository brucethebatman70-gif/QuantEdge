"use client";

import { useTheme } from "@/lib/theme-store";
import { useMounted } from "@/hooks/use-mounted";
import { Button } from "@/components/ui/button";
import { Icons } from "@/lib/icons";
import { brand } from "@/config/brand";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface NavbarProps {
  title?: string;
}

export function Navbar({ title }: NavbarProps) {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  return (
    <header className="glass-navbar sticky top-3 z-20 mx-3 flex h-12 items-center gap-4 rounded-xl px-4">
      <div className="flex-1">
        <h1 className="text-sm font-semibold opacity-80">
          {title || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-1.5">
        <Button
          variant="ghost"
          size="icon-xs"
          className="opacity-60 hover:opacity-100"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && (theme === "dark" ? (
            <Icons.Sun className="h-3.5 w-3.5" />
          ) : (
            <Icons.Moon className="h-3.5 w-3.5" />
          ))}
        </Button>

        <Button variant="ghost" size="icon-xs" className="opacity-60 hover:opacity-100">
          <Icons.Bell className="h-3.5 w-3.5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" className="rounded-full opacity-60 hover:opacity-100 ml-1">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="text-[9px]">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass-popover">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-sm font-medium">Demo User</span>
                <span className="text-xs text-muted-foreground">demo@{brand.company.toLowerCase().replace(/\s/g, "")}.com</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Icons.User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Icons.Keyboard className="mr-2 h-4 w-4" />
              Keyboard Shortcuts
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-error">
              <Icons.LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
