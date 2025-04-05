"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut } from "lucide-react";
import { useSession } from "next-auth/react";
import { logout } from "@/lib/auth";
import { useRouter } from "next/navigation"; // Import router

export function UserDropdownMenu() {
  const session = useSession();
  const router = useRouter(); // Add router
  
  const handleLogout = async () => {
    try {
      await logout();
      // Force a client-side navigation after logout
      router.push("/auth/signin");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still try to redirect even if there's an error
      router.push("/auth/signin");
    }
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage
              src="/placeholder-avatar.jpg"
              alt="Avatar utilisateur"
            />
            <AvatarFallback className="border bg-muted">
              <User className="h-6 w-6 text-primary" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {session.data?.user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {session.data?.user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4 text-destructive" />
          <span>Se déconnecter</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}