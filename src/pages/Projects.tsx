import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { FolderKanban, Users } from "lucide-react";

const projects = [
  { id: 1, name: "AI Chatbot for Education", team: "Team Alpha", progress: 75, status: "In Progress", members: 4 },
  { id: 2, name: "E-Commerce Platform", team: "Team Beta", progress: 45, status: "In Progress", members: 3 },
  { id: 3, name: "Healthcare Data Pipeline", team: "Team Gamma", progress: 90, status: "Review", members: 5 },
  { id: 4, name: "Smart Campus App", team: "Team Delta", progress: 100, status: "Completed", members: 4 },
  { id: 5, name: "Blockchain Voting System", team: "Team Epsilon", progress: 20, status: "In Progress", members: 3 },
];

const statusColor: Record<string, string> = {
  "In Progress": "secondary",
  Review: "default",
  Completed: "default",
};

export default function Projects() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Projects</h1>
        <p className="text-muted-foreground text-sm">All team projects and their progress</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((p) => (
          <Card key={p.id} className="glass-card hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FolderKanban className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{p.name}</h3>
                    <p className="text-xs text-muted-foreground">{p.team}</p>
                  </div>
                </div>
                <Badge variant={statusColor[p.status] as any}>{p.status}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Progress</span><span>{p.progress}%</span>
                </div>
                <Progress value={p.progress} className="h-2" />
              </div>
              <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                <Users className="h-3 w-3" /> {p.members} members
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
