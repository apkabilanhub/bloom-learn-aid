import { Search, Bell, Bot, Shield, GraduationCap, BookOpenCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface TopbarProps {
  onToggleAssistant: () => void;
}

const roleConfig: Record<UserRole, { label: string; icon: typeof Shield; badgeClass: string; initials: string }> = {
  admin: { label: "Admin", icon: Shield, badgeClass: "bg-destructive/10 text-destructive", initials: "AD" },
  student: { label: "Student", icon: GraduationCap, badgeClass: "bg-primary/10 text-primary", initials: "JD" },
  faculty: { label: "Faculty", icon: BookOpenCheck, badgeClass: "bg-success/10 text-success", initials: "DK" },
};

export function Topbar({ onToggleAssistant }: TopbarProps) {
  const { role, userName } = useRole();
  const cfg = roleConfig[role];
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b bg-card flex items-center px-4 gap-3 shrink-0">
      <SidebarTrigger />
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search classes, assignments..." className="pl-9 bg-muted/50 border-0 h-9" />
        </div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Badge variant="secondary" className={`text-xs ${cfg.badgeClass}`}>
          <cfg.icon className="h-3 w-3 mr-1" />{cfg.label}
        </Badge>

        <Button variant="ghost" size="icon" className="relative" onClick={onToggleAssistant}>
          <Bot className="h-5 w-5 text-primary" />
        </Button>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-destructive rounded-full" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`text-xs ${cfg.badgeClass}`}>{cfg.initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/")}>Switch Portal</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}