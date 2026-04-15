import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, FileText, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const initialAssignments = [
  { id: 1, title: "ML Model Implementation", course: "CS3501", deadline: "Apr 18, 2026", status: "pending", submissions: 32, total: 45 },
  { id: 2, title: "ER Diagram Design", course: "CS3402", deadline: "Apr 20, 2026", status: "submitted", submissions: 48, total: 52 },
  { id: 3, title: "React Portfolio App", course: "CS3601", deadline: "Apr 25, 2026", status: "pending", submissions: 15, total: 38 },
  { id: 4, title: "Sorting Algorithms Analysis", course: "CS2301", deadline: "Apr 15, 2026", status: "late", submissions: 55, total: 60 },
];

const statusConfig = {
  pending: { label: "Pending", icon: Clock, variant: "secondary" as const },
  submitted: { label: "Submitted", icon: CheckCircle, variant: "default" as const },
  late: { label: "Late", icon: AlertCircle, variant: "destructive" as const },
};

export default function Assignments() {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [newAssignment, setNewAssignment] = useState({ title: "", description: "", deadline: "" });

  const handleCreate = () => {
    if (!newAssignment.title) return;
    setAssignments([...assignments, {
      id: assignments.length + 1, title: newAssignment.title, course: "CS3501",
      deadline: newAssignment.deadline || "TBD", status: "pending", submissions: 0, total: 45,
    }]);
    setNewAssignment({ title: "", description: "", deadline: "" });
    toast.success("Assignment created!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Assignments</h1>
          <p className="text-muted-foreground text-sm">Track and manage all assignments</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm"><Plus className="h-4 w-4 mr-2" />Create Assignment</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>New Assignment</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <div><Label>Title</Label><Input value={newAssignment.title} onChange={(e) => setNewAssignment({ ...newAssignment, title: e.target.value })} /></div>
              <div><Label>Description</Label><Textarea value={newAssignment.description} onChange={(e) => setNewAssignment({ ...newAssignment, description: e.target.value })} /></div>
              <div><Label>Deadline</Label><Input type="date" value={newAssignment.deadline} onChange={(e) => setNewAssignment({ ...newAssignment, deadline: e.target.value })} /></div>
              <Button onClick={handleCreate} className="w-full">Create</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-3">
        {assignments.map((a) => {
          const sc = statusConfig[a.status as keyof typeof statusConfig];
          return (
            <Card key={a.id} className="glass-card">
              <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{a.title}</h3>
                    <p className="text-xs text-muted-foreground">{a.course} · Due: {a.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{a.submissions}/{a.total} submitted</span>
                  <Badge variant={sc.variant} className="flex items-center gap-1">
                    <sc.icon className="h-3 w-3" /> {sc.label}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
