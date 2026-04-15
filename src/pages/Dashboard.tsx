import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  FolderKanban, FileText, ShieldCheck, Clock, Bot, TrendingUp, BookOpen
} from "lucide-react";

const deadlines = [
  { title: "ML Project Report", course: "CS3501", due: "Apr 18", urgent: true },
  { title: "Database Assignment 3", course: "CS3402", due: "Apr 20", urgent: false },
  { title: "Web Dev Final Project", course: "CS3601", due: "Apr 25", urgent: false },
];

const activities = [
  { text: "Submitted ML Project Phase 2", time: "2 hours ago" },
  { text: "AI Viva completed — Score: 85%", time: "5 hours ago" },
  { text: "New assignment posted in CS3402", time: "1 day ago" },
  { text: "Plagiarism check passed — 4% similarity", time: "2 days ago" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, John</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Projects" value="4" icon={FolderKanban} trend="+1 this week" />
        <StatCard title="Pending Assignments" value="3" icon={FileText} subtitle="2 due this week" />
        <StatCard title="AI Usage Score" value="12%" icon={Bot} subtitle="Low AI dependency" />
        <StatCard title="Plagiarism Score" value="4%" icon={ShieldCheck} trend="Clean" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" /> Upcoming Deadlines
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deadlines.map((d) => (
              <div key={d.title} className="flex items-center justify-between py-2 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{d.title}</p>
                  <p className="text-xs text-muted-foreground">{d.course}</p>
                </div>
                <Badge variant={d.urgent ? "destructive" : "secondary"}>{d.due}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" /> Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <p className="text-sm">{a.text}</p>
                  <p className="text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-primary" /> Project Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "ML Chatbot", progress: 75 },
              { name: "E-Commerce App", progress: 45 },
              { name: "Data Pipeline", progress: 90 },
            ].map((p) => (
              <div key={p.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{p.name}</span>
                  <span className="text-muted-foreground">{p.progress}%</span>
                </div>
                <Progress value={p.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Bot className="h-4 w-4 text-primary" /> AI Usage Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <div className="relative h-28 w-28 shrink-0">
                <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                    strokeDasharray={`${12 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold">12%</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <p>Your AI usage is <span className="font-semibold text-success">low</span>, indicating original work.</p>
                <p className="text-muted-foreground">AI-assisted sections: Introduction, Literature Review</p>
                <p className="text-muted-foreground">Last checked: 2 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
