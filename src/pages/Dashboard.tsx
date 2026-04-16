import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRole } from "@/contexts/RoleContext";
import {
  FolderKanban, FileText, ShieldCheck, Clock, Bot, TrendingUp, BookOpen, Users, AlertTriangle,
} from "lucide-react";

const studentDeadlines = [
  { title: "ML Project Report", course: "CS3501", due: "Apr 18", urgent: true },
  { title: "Database Assignment 3", course: "CS3402", due: "Apr 20", urgent: false },
  { title: "Web Dev Final Project", course: "CS3601", due: "Apr 25", urgent: false },
];

const studentActivities = [
  { text: "Submitted ML Project Phase 2", time: "2 hours ago" },
  { text: "AI Viva completed — Score: 85%", time: "5 hours ago" },
  { text: "New assignment posted in CS3402", time: "1 day ago" },
  { text: "Plagiarism check passed — 4% similarity", time: "2 days ago" },
];

const facultyActivities = [
  { text: "32 submissions received for Linear Regression", time: "1 hour ago" },
  { text: "Plagiarism alert: 2 students flagged", time: "3 hours ago" },
  { text: "New student joined CS3501", time: "5 hours ago" },
  { text: "AI Viva scores published", time: "1 day ago" },
];

const adminActivities = [
  { text: "New faculty registered: Dr. Rajan", time: "2 hours ago" },
  { text: "System update completed", time: "5 hours ago" },
  { text: "3 new classes created this week", time: "1 day ago" },
  { text: "Plagiarism engine updated to v2.1", time: "2 days ago" },
];

export default function Dashboard() {
  const { role, userName } = useRole();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-sm">Welcome back, {userName}</p>
      </div>

      {/* STUDENT DASHBOARD */}
      {role === "student" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Active Projects" value="4" icon={FolderKanban} trend="+1 this week" />
            <StatCard title="Pending Assignments" value="3" icon={FileText} subtitle="2 due this week" />
            <StatCard title="AI Usage Score" value="12%" icon={Bot} subtitle="Low AI dependency" />
            <StatCard title="Plagiarism Score" value="4%" icon={ShieldCheck} trend="Clean" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentDeadlines.map((d) => (
                  <div key={d.title} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div><p className="text-sm font-medium">{d.title}</p><p className="text-xs text-muted-foreground">{d.course}</p></div>
                    <Badge variant={d.urgent ? "destructive" : "secondary"}>{d.due}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" />Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentActivities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div><p className="text-sm">{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><BookOpen className="h-4 w-4 text-primary" />Project Progress</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[{ name: "ML Chatbot", progress: 75 }, { name: "E-Commerce App", progress: 45 }, { name: "Data Pipeline", progress: 90 }].map((p) => (
                  <div key={p.name} className="space-y-1">
                    <div className="flex justify-between text-sm"><span>{p.name}</span><span className="text-muted-foreground">{p.progress}%</span></div>
                    <Progress value={p.progress} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="glass-card col-span-1 lg:col-span-2">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />AI Usage Overview</CardTitle></CardHeader>
              <CardContent>
                <div className="flex items-center gap-6">
                  <div className="relative h-28 w-28 shrink-0">
                    <svg className="h-28 w-28 -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                      <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--primary))" strokeWidth="8" strokeDasharray={`${12 * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center"><span className="text-xl font-bold">12%</span></div>
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
        </>
      )}

      {/* FACULTY DASHBOARD */}
      {role === "faculty" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="My Classes" value="3" icon={BookOpen} trend="Active" />
            <StatCard title="Total Students" value="135" icon={Users} subtitle="Across all classes" />
            <StatCard title="Pending Reviews" value="12" icon={FileText} trend="5 new today" />
            <StatCard title="Plagiarism Alerts" value="2" icon={AlertTriangle} subtitle="Needs attention" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><FileText className="h-4 w-4 text-primary" />Submission Overview</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[{ cls: "CS3501 - Machine Learning", submitted: 32, total: 45 }, { cls: "CS3402 - Database Systems", submitted: 48, total: 52 }, { cls: "CS3601 - Web Development", submitted: 20, total: 38 }].map((c) => (
                  <div key={c.cls} className="space-y-1">
                    <div className="flex justify-between text-sm"><span>{c.cls}</span><span className="text-muted-foreground">{c.submitted}/{c.total}</span></div>
                    <Progress value={(c.submitted / c.total) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" />Recent Activity</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {facultyActivities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div><p className="text-sm">{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* ADMIN DASHBOARD */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Users" value="248" icon={Users} trend="+12 this month" />
            <StatCard title="Active Classes" value="16" icon={BookOpen} subtitle="Across departments" />
            <StatCard title="Plagiarism Flags" value="8" icon={AlertTriangle} subtitle="This month" />
            <StatCard title="System Health" value="99.9%" icon={ShieldCheck} trend="Excellent" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Users className="h-4 w-4 text-primary" />User Breakdown</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[{ label: "Students", count: 200, total: 248 }, { label: "Faculty", count: 40, total: 248 }, { label: "Admins", count: 8, total: 248 }].map((u) => (
                  <div key={u.label} className="space-y-1">
                    <div className="flex justify-between text-sm"><span>{u.label}</span><span className="text-muted-foreground">{u.count}</span></div>
                    <Progress value={(u.count / u.total) * 100} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><TrendingUp className="h-4 w-4 text-primary" />System Activity</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {adminActivities.map((a, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1.5 shrink-0" />
                    <div><p className="text-sm">{a.text}</p><p className="text-xs text-muted-foreground">{a.time}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
