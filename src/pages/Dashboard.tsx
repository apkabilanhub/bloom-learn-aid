import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  FolderKanban, FileText, ShieldCheck, Clock, Bot, TrendingUp, BookOpen, Users, AlertTriangle,
  MessageSquare, Terminal, Upload, BarChart3, Bell,
} from "lucide-react";

/* ─── STUDENT ─── */
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

const studentNotifications = [
  { text: "Assignment deadline tomorrow: ML Project", type: "warning" },
  { text: "New material uploaded in CS3601", type: "info" },
  { text: "Viva scheduled for Apr 20", type: "info" },
];

/* ─── FACULTY ─── */
const facultyActivities = [
  { text: "32 submissions received for Linear Regression", time: "1 hour ago" },
  { text: "Plagiarism alert: 2 students flagged", time: "3 hours ago" },
  { text: "New student joined CS3501", time: "5 hours ago" },
  { text: "AI Viva scores published", time: "1 day ago" },
];

const pendingReviews = [
  { student: "Arun K.", project: "ML Chatbot", submitted: "2h ago", aiScore: "8%" },
  { student: "Priya M.", project: "E-Commerce App", submitted: "4h ago", aiScore: "15%" },
  { student: "Rahul S.", project: "Data Pipeline", submitted: "1d ago", aiScore: "3%" },
];

/* ─── ADMIN ─── */
const adminActivities = [
  { text: "New faculty registered: Dr. Rajan", time: "2 hours ago" },
  { text: "System update completed", time: "5 hours ago" },
  { text: "3 new classes created this week", time: "1 day ago" },
  { text: "Plagiarism engine updated to v2.1", time: "2 days ago" },
];

export default function Dashboard() {
  const { role, userName } = useRole();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">
          {role === "student" ? "Student Dashboard" : role === "faculty" ? "Faculty Dashboard" : "Admin Dashboard"}
        </h1>
        <p className="text-muted-foreground text-sm">Welcome back, {userName}</p>
      </div>

      {/* ═══════════ STUDENT ═══════════ */}
      {role === "student" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Active Projects" value="4" icon={FolderKanban} trend="+1 this week" />
            <StatCard title="Pending Assignments" value="3" icon={FileText} subtitle="2 due this week" />
            <StatCard title="AI Usage Score" value="12%" icon={Bot} subtitle="Low AI dependency" />
            <StatCard title="Plagiarism Score" value="4%" icon={ShieldCheck} trend="Clean" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "My Classes", icon: BookOpen, path: "/classes" },
              { label: "Upload Project", icon: Upload, path: "/upload" },
              { label: "AI Viva", icon: MessageSquare, path: "/ai-viva" },
              { label: "Compiler Lab", icon: Terminal, path: "/compiler" },
            ].map((a) => (
              <Card key={a.label} className="glass-card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(a.path)}>
                <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <a.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{a.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Deadlines */}
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

            {/* Activity */}
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

            {/* Notifications */}
            <Card className="glass-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2"><Bell className="h-4 w-4 text-primary" />Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {studentNotifications.map((n, i) => (
                  <div key={i} className="flex items-start gap-3 py-2 border-b last:border-0">
                    <div className={`h-2 w-2 rounded-full mt-1.5 shrink-0 ${n.type === "warning" ? "bg-warning" : "bg-info"}`} />
                    <p className="text-sm">{n.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Progress & AI Usage */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="glass-card lg:col-span-1">
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
            <Card className="glass-card lg:col-span-2">
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

      {/* ═══════════ FACULTY ═══════════ */}
      {role === "faculty" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="My Classes" value="3" icon={BookOpen} trend="Active" />
            <StatCard title="Total Students" value="135" icon={Users} subtitle="Across all classes" />
            <StatCard title="Pending Reviews" value="12" icon={FileText} trend="5 new today" />
            <StatCard title="Plagiarism Alerts" value="2" icon={AlertTriangle} subtitle="Needs attention" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "My Classes", icon: BookOpen, path: "/classes" },
              { label: "Assignments", icon: FileText, path: "/assignments" },
              { label: "Plagiarism", icon: ShieldCheck, path: "/plagiarism" },
              { label: "Analytics", icon: BarChart3, path: "/analytics" },
            ].map((a) => (
              <Card key={a.label} className="glass-card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(a.path)}>
                <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <a.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{a.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Submissions */}
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

            {/* Pending Reviews */}
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Clock className="h-4 w-4 text-primary" />Pending Reviews</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingReviews.map((r, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="text-sm font-medium">{r.student}</p>
                        <p className="text-xs text-muted-foreground">{r.project} · {r.submitted}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">AI: {r.aiScore}</Badge>
                        <Button size="sm" variant="outline" className="h-7 text-xs">Evaluate</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity */}
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

            {/* AI Insights */}
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />AI Insights</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Avg AI Usage (Class)</span>
                  <span className="text-sm font-semibold">14%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">High AI Flagged</span>
                  <Badge variant="destructive">3 students</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Plagiarism Avg</span>
                  <span className="text-sm font-semibold text-success">6%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* ═══════════ ADMIN ═══════════ */}
      {role === "admin" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Total Users" value="248" icon={Users} trend="+12 this month" />
            <StatCard title="Active Classes" value="16" icon={BookOpen} subtitle="Across departments" />
            <StatCard title="Plagiarism Flags" value="8" icon={AlertTriangle} subtitle="This month" />
            <StatCard title="System Health" value="99.9%" icon={ShieldCheck} trend="Excellent" />
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Manage Users", icon: Users, path: "/manage-users" },
              { label: "All Classes", icon: BookOpen, path: "/classes" },
              { label: "Analytics", icon: BarChart3, path: "/analytics" },
              { label: "Plagiarism", icon: ShieldCheck, path: "/plagiarism" },
            ].map((a) => (
              <Card key={a.label} className="glass-card hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(a.path)}>
                <CardContent className="p-4 flex flex-col items-center gap-2 text-center">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <a.icon className="h-5 w-5 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{a.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Breakdown */}
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

            {/* System Activity */}
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

            {/* AI Monitoring */}
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><Bot className="h-4 w-4 text-primary" />AI Monitoring</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Platform AI Usage Avg</span>
                  <span className="text-sm font-semibold">11%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm">Plagiarism Trend</span>
                  <Badge variant="secondary">↓ 2% from last month</Badge>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm">Total AI Vivas Conducted</span>
                  <span className="text-sm font-semibold">342</span>
                </div>
              </CardContent>
            </Card>

            {/* Reports */}
            <Card className="glass-card">
              <CardHeader className="pb-3"><CardTitle className="text-base flex items-center gap-2"><BarChart3 className="h-4 w-4 text-primary" />Quick Reports</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {["Monthly Usage Report", "Plagiarism Summary", "Student Performance", "AI Usage Trends"].map((r) => (
                  <div key={r} className="flex items-center justify-between py-2 border-b last:border-0">
                    <span className="text-sm">{r}</span>
                    <Button size="sm" variant="outline" className="h-7 text-xs">View</Button>
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