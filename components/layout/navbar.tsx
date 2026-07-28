"use client";

import { useTheme } from "next-themes";
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
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-lg px-6">
      <div className="flex-1">
        <h1 className="text-sm font-semibold">
          {title || "Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {mounted && (theme === "dark" ? (
            <Icons.Sun className="h-4 w-4" />
          ) : (
            <Icons.Moon className="h-4 w-4" />
          ))}
        </Button>

        <Button variant="ghost" size="icon-sm">
          <Icons.Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-[10px]">AD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
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
