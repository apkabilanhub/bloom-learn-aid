import { Search, Bell, Bot, Shield, GraduationCap, BookOpenCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useRole, UserRole } from "@/contexts/RoleContext";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

interface TopbarProps {
  onToggleAssistant: () => void;
}

const roleConfig: Record<UserRole, { label: string; icon: typeof Shield; color: string; initials: string }> = {
  admin: { label: "Admin", icon: Shield, color: "bg-destructive/10 text-destructive", initials: "AD" },
  student: { label: "Student", icon: GraduationCap, color: "bg-primary/10 text-primary", initials: "JD" },
  faculty: { label: "Faculty", icon: BookOpenCheck, color: "bg-success/10 text-success", initials: "DK" },
};

export function Topbar({ onToggleAssistant }: TopbarProps) {
  const { role, setRole, userName } = useRole();
  const cfg = roleConfig[role];

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
        {/* Role Switcher */}
        <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
          <SelectTrigger className="w-[130px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">
              <span className="flex items-center gap-1.5"><Shield className="h-3.5 w-3.5" />Admin</span>
            </SelectItem>
            <SelectItem value="student">
              <span className="flex items-center gap-1.5"><GraduationCap className="h-3.5 w-3.5" />Student</span>
            </SelectItem>
            <SelectItem value="faculty">
              <span className="flex items-center gap-1.5"><BookOpenCheck className="h-3.5 w-3.5" />Faculty</span>
            </SelectItem>
          </SelectContent>
        </Select>

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
                <AvatarFallback className={`text-xs ${cfg.color}`}>{cfg.initials}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground capitalize">{role}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
