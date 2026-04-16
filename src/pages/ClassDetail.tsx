import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useRole } from "@/contexts/RoleContext";
import {
  ArrowLeft, Send, FileUp, Users, FileText, BookOpen, MessageSquare, Plus, Download,
} from "lucide-react";
import { toast } from "sonner";

const classesData: Record<string, { name: string; code: string; instructor: string; students: number; description: string }> = {
  "1": { name: "Machine Learning", code: "CS3501", instructor: "Dr. Kumar", students: 45, description: "Introduction to ML algorithms, neural networks, and deep learning." },
  "2": { name: "Database Systems", code: "CS3402", instructor: "Dr. Priya", students: 52, description: "Relational databases, SQL, normalization, and query optimization." },
  "3": { name: "Web Development", code: "CS3601", instructor: "Dr. Rajan", students: 38, description: "Full-stack web development with modern frameworks." },
  "4": { name: "Data Structures", code: "CS2301", instructor: "Dr. Sharma", students: 60, description: "Arrays, trees, graphs, sorting, and algorithm analysis." },
};

const mockAnnouncements = [
  { id: 1, author: "Dr. Kumar", text: "Mid-term exam will be held on April 25. Please review chapters 1-6.", time: "2 hours ago", avatar: "DK" },
  { id: 2, author: "Dr. Kumar", text: "Project Phase 2 deadline extended to April 20.", time: "1 day ago", avatar: "DK" },
  { id: 3, author: "Dr. Kumar", text: "Welcome to the class! Please review the syllabus.", time: "1 week ago", avatar: "DK" },
];

const mockAssignments = [
  { id: 1, title: "Linear Regression Implementation", due: "Apr 18", status: "pending", submissions: 32 },
  { id: 2, title: "Neural Network from Scratch", due: "Apr 25", status: "pending", submissions: 0 },
  { id: 3, title: "Data Preprocessing Report", due: "Apr 10", status: "completed", submissions: 44 },
];

const mockStudents = [
  { id: 1, name: "John Doe", email: "john@srm.edu", grade: "A", submissions: 3 },
  { id: 2, name: "Jane Smith", email: "jane@srm.edu", grade: "A-", submissions: 3 },
  { id: 3, name: "Raj Patel", email: "raj@srm.edu", grade: "B+", submissions: 2 },
  { id: 4, name: "Priya Singh", email: "priya@srm.edu", grade: "A", submissions: 3 },
  { id: 5, name: "Mike Chen", email: "mike@srm.edu", grade: "B", submissions: 2 },
];

const mockMaterials = [
  { id: 1, title: "Chapter 1 - Introduction to ML", type: "PDF", size: "2.4 MB" },
  { id: 2, title: "Neural Networks Slides", type: "PPTX", size: "5.1 MB" },
  { id: 3, title: "Python ML Cheatsheet", type: "PDF", size: "1.2 MB" },
  { id: 4, title: "Dataset for Assignment 1", type: "CSV", size: "840 KB" },
];

export default function ClassDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useRole();
  const cls = classesData[id || "1"];
  const [newPost, setNewPost] = useState("");

  if (!cls) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Class not found.</p>
        <Button variant="link" onClick={() => navigate("/classes")}>Back to Classes</Button>
      </div>
    );
  }

  const handlePost = () => {
    if (!newPost.trim()) return;
    toast.success("Announcement posted!");
    setNewPost("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => navigate("/classes")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{cls.name}</h1>
          <p className="text-muted-foreground text-sm">{cls.code} · {cls.instructor} · {cls.students} students</p>
        </div>
        {role === "admin" && <Badge variant="destructive">Admin View</Badge>}
        {role === "faculty" && <Badge className="bg-primary/10 text-primary border-0">Faculty</Badge>}
      </div>

      <Card className="glass-card">
        <CardContent className="p-4">
          <p className="text-sm">{cls.description}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="stream" className="w-full">
        <TabsList className="w-full justify-start bg-muted/50">
          <TabsTrigger value="stream" className="gap-1.5"><MessageSquare className="h-3.5 w-3.5" />Stream</TabsTrigger>
          <TabsTrigger value="assignments" className="gap-1.5"><FileText className="h-3.5 w-3.5" />Assignments</TabsTrigger>
          <TabsTrigger value="students" className="gap-1.5"><Users className="h-3.5 w-3.5" />Students</TabsTrigger>
          <TabsTrigger value="materials" className="gap-1.5"><BookOpen className="h-3.5 w-3.5" />Materials</TabsTrigger>
        </TabsList>

        {/* STREAM */}
        <TabsContent value="stream" className="space-y-4 mt-4">
          {(role === "faculty" || role === "admin") && (
            <Card className="glass-card">
              <CardContent className="p-4 space-y-3">
                <Textarea placeholder="Share an announcement with the class..." value={newPost} onChange={(e) => setNewPost(e.target.value)} className="min-h-[80px]" />
                <div className="flex justify-end">
                  <Button size="sm" onClick={handlePost}><Send className="h-4 w-4 mr-2" />Post</Button>
                </div>
              </CardContent>
            </Card>
          )}
          {mockAnnouncements.map((a) => (
            <Card key={a.id} className="glass-card">
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="bg-primary/10 text-primary text-xs">{a.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{a.author}</span>
                      <span className="text-xs text-muted-foreground">{a.time}</span>
                    </div>
                    <p className="text-sm mt-1">{a.text}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ASSIGNMENTS */}
        <TabsContent value="assignments" className="space-y-4 mt-4">
          {(role === "faculty" || role === "admin") && (
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />Create Assignment</Button>
          )}
          {mockAssignments.map((a) => (
            <Card key={a.id} className="glass-card">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{a.title}</p>
                  <p className="text-xs text-muted-foreground">Due: {a.due}</p>
                </div>
                <div className="flex items-center gap-3">
                  {(role === "faculty" || role === "admin") && (
                    <span className="text-xs text-muted-foreground">{a.submissions} submissions</span>
                  )}
                  <Badge variant={a.status === "completed" ? "secondary" : "default"}>
                    {role === "student" ? (a.status === "completed" ? "Submitted" : "Pending") : a.status}
                  </Badge>
                  {role === "student" && a.status !== "completed" && (
                    <Button size="sm" variant="outline" onClick={() => toast.success("Assignment submitted!")}>
                      <FileUp className="h-3.5 w-3.5 mr-1" />Submit
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* STUDENTS */}
        <TabsContent value="students" className="mt-4">
          <Card className="glass-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/30">
                      <th className="text-left p-3 font-medium">Name</th>
                      <th className="text-left p-3 font-medium">Email</th>
                      {(role === "faculty" || role === "admin") && (
                        <>
                          <th className="text-left p-3 font-medium">Grade</th>
                          <th className="text-left p-3 font-medium">Submissions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {mockStudents.map((s) => (
                      <tr key={s.id} className="border-b last:border-0 hover:bg-muted/20">
                        <td className="p-3 flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-primary/10 text-primary">{s.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          {s.name}
                        </td>
                        <td className="p-3 text-muted-foreground">{s.email}</td>
                        {(role === "faculty" || role === "admin") && (
                          <>
                            <td className="p-3"><Badge variant="secondary">{s.grade}</Badge></td>
                            <td className="p-3">{s.submissions}/3</td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* MATERIALS */}
        <TabsContent value="materials" className="space-y-4 mt-4">
          {(role === "faculty" || role === "admin") && (
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />Upload Material</Button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockMaterials.map((m) => (
              <Card key={m.id} className="glass-card">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.type} · {m.size}</p>
                  </div>
                  <Button size="icon" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
