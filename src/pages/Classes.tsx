import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Users, BookOpen, LogIn } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { toast } from "sonner";

const initialClasses = [
  { id: 1, name: "Machine Learning", code: "CS3501", instructor: "Dr. Kumar", students: 45, color: "bg-primary/10" },
  { id: 2, name: "Database Systems", code: "CS3402", instructor: "Dr. Priya", students: 52, color: "bg-info/10" },
  { id: 3, name: "Web Development", code: "CS3601", instructor: "Dr. Rajan", students: 38, color: "bg-success/10" },
  { id: 4, name: "Data Structures", code: "CS2301", instructor: "Dr. Sharma", students: 60, color: "bg-warning/10" },
];

export default function Classes() {
  const [classes, setClasses] = useState(initialClasses);
  const [joinCode, setJoinCode] = useState("");
  const [newClass, setNewClass] = useState({ name: "", code: "", description: "" });
  const [joinOpen, setJoinOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const { role } = useRole();
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!newClass.name || !newClass.code) return;
    setClasses([...classes, {
      id: classes.length + 1, name: newClass.name, code: newClass.code,
      instructor: role === "faculty" ? "You" : "Admin", students: 0, color: "bg-accent",
    }]);
    setNewClass({ name: "", code: "", description: "" });
    setCreateOpen(false);
    toast.success("Class created successfully!");
  };

  const handleJoin = () => {
    if (!joinCode.trim()) return;
    toast.success("Joined class successfully!");
    setJoinCode("");
    setJoinOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Classes</h1>
          <p className="text-muted-foreground text-sm">
            {role === "student" ? "Your enrolled classes" : role === "faculty" ? "Classes you teach" : "All classes in the system"}
          </p>
        </div>
        <div className="flex gap-2">
          {(role === "student") && (
            <Dialog open={joinOpen} onOpenChange={setJoinOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm"><LogIn className="h-4 w-4 mr-2" />Join Class</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Join a Class</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div><Label>Class Code</Label><Input placeholder="Enter class code (e.g. CS3501)" value={joinCode} onChange={(e) => setJoinCode(e.target.value)} /></div>
                  <Button onClick={handleJoin} className="w-full">Join</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
          {(role === "faculty" || role === "admin") && (
            <Dialog open={createOpen} onOpenChange={setCreateOpen}>
              <DialogTrigger asChild>
                <Button size="sm"><Plus className="h-4 w-4 mr-2" />Create Class</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader><DialogTitle>Create a Class</DialogTitle></DialogHeader>
                <div className="space-y-4">
                  <div><Label>Class Name</Label><Input value={newClass.name} onChange={(e) => setNewClass({ ...newClass, name: e.target.value })} placeholder="e.g. Machine Learning" /></div>
                  <div><Label>Class Code</Label><Input value={newClass.code} onChange={(e) => setNewClass({ ...newClass, code: e.target.value })} placeholder="e.g. CS3501" /></div>
                  <div><Label>Description</Label><Textarea value={newClass.description} onChange={(e) => setNewClass({ ...newClass, description: e.target.value })} placeholder="Brief description" /></div>
                  <Button onClick={handleCreate} className="w-full">Create Class</Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {classes.map((cls) => (
          <Card
            key={cls.id}
            className="glass-card hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/classes/${cls.id}`)}
          >
            <CardContent className="p-5">
              <div className={`h-2 w-16 rounded-full ${cls.color} mb-4`} />
              <h3 className="font-semibold">{cls.name}</h3>
              <p className="text-sm text-muted-foreground">{cls.code}</p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> {cls.instructor}
              </p>
              <div className="flex items-center justify-between mt-4">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Users className="h-3 w-3" /> {cls.students} students
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
