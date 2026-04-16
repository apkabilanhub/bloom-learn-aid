import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, UserPlus, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const initialUsers = [
  { id: 1, name: "Dr. Kumar", email: "kumar@srm.edu", role: "faculty", status: "active" },
  { id: 2, name: "Dr. Priya", email: "priya.f@srm.edu", role: "faculty", status: "active" },
  { id: 3, name: "John Doe", email: "john@srm.edu", role: "student", status: "active" },
  { id: 4, name: "Jane Smith", email: "jane@srm.edu", role: "student", status: "active" },
  { id: 5, name: "Raj Patel", email: "raj@srm.edu", role: "student", status: "inactive" },
  { id: 6, name: "Dr. Rajan", email: "rajan@srm.edu", role: "faculty", status: "active" },
  { id: 7, name: "Mike Chen", email: "mike@srm.edu", role: "student", status: "active" },
  { id: 8, name: "Priya Singh", email: "priya.s@srm.edu", role: "student", status: "active" },
];

export default function ManageUsers() {
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filtered = initialUsers.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = filterRole === "all" || u.role === filterRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-muted-foreground text-sm">Admin panel for user management</p>
        </div>
        <Button size="sm" onClick={() => toast.info("Invite user modal coming soon")}>
          <UserPlus className="h-4 w-4 mr-2" />Invite User
        </Button>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search users..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="faculty">Faculty</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/30">
                  <th className="text-left p-3 font-medium">User</th>
                  <th className="text-left p-3 font-medium">Email</th>
                  <th className="text-left p-3 font-medium">Role</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b last:border-0 hover:bg-muted/20">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                          <AvatarFallback className="text-xs bg-primary/10 text-primary">
                            {u.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        {u.name}
                      </div>
                    </td>
                    <td className="p-3 text-muted-foreground">{u.email}</td>
                    <td className="p-3">
                      <Badge variant={u.role === "faculty" ? "default" : "secondary"}>
                        {u.role}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge variant={u.status === "active" ? "secondary" : "outline"} className={u.status === "active" ? "bg-success/10 text-success border-0" : ""}>
                        {u.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button variant="ghost" size="icon" onClick={() => toast.info("User actions coming soon")}>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
