import {
  LayoutDashboard, BookOpen, FileText, FolderKanban, Upload, ShieldCheck,
  MessageSquare, Terminal, BarChart3, Settings, Users, Shield,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  url: string;
  icon: typeof LayoutDashboard;
  roles: UserRole[];
}

const items: NavItem[] = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard, roles: ["admin", "student", "faculty"] },
  { title: "Classes", url: "/classes", icon: BookOpen, roles: ["admin", "student", "faculty"] },
  { title: "Assignments", url: "/assignments", icon: FileText, roles: ["student", "faculty", "admin"] },
  { title: "Projects", url: "/projects", icon: FolderKanban, roles: ["student", "faculty", "admin"] },
  { title: "Upload Project", url: "/upload", icon: Upload, roles: ["student"] },
  { title: "Plagiarism Check", url: "/plagiarism", icon: ShieldCheck, roles: ["student", "faculty", "admin"] },
  { title: "AI Viva", url: "/ai-viva", icon: MessageSquare, roles: ["student", "faculty"] },
  { title: "Compiler Lab", url: "/compiler", icon: Terminal, roles: ["student"] },
  { title: "Analytics", url: "/analytics", icon: BarChart3, roles: ["faculty", "admin"] },
  { title: "Manage Users", url: "/manage-users", icon: Users, roles: ["admin"] },
  { title: "Settings", url: "/settings", icon: Settings, roles: ["admin", "student", "faculty"] },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const { role } = useRole();

  const filtered = items.filter((item) => item.roles.includes(role));

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="px-4 py-5 flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <span className="text-primary-foreground font-bold text-sm">SR</span>
          </div>
          {!collapsed && <span className="font-semibold text-foreground text-lg">SRM Edu</span>}
        </div>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filtered.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location.pathname === item.url}>
                    <NavLink to={item.url} end className="hover:bg-accent/50" activeClassName="bg-accent text-accent-foreground font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
