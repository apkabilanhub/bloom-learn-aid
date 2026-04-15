import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload as UploadIcon, FileUp, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function UploadProject() {
  const [submitted, setSubmitted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = () => {
    setSubmitted(true);
    toast.success("Project uploaded successfully!");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold">Upload Project</h1>
        <p className="text-muted-foreground text-sm">Submit your project files for evaluation</p>
      </div>
      <Card className="glass-card">
        <CardContent className="p-6 space-y-5">
          <div><Label>Project Title</Label><Input placeholder="Enter project title" /></div>
          <div><Label>Description</Label><Textarea placeholder="Describe your project" rows={3} /></div>
          <div><Label>Class</Label>
            <Select><SelectTrigger><SelectValue placeholder="Select class" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="cs3501">CS3501 - Machine Learning</SelectItem>
                <SelectItem value="cs3402">CS3402 - Database Systems</SelectItem>
                <SelectItem value="cs3601">CS3601 - Web Development</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Project Files</Label>
            <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-colors mt-1">
              {file ? (
                <div className="flex items-center gap-2 text-sm text-primary">
                  <CheckCircle className="h-5 w-5" />
                  {file.name}
                </div>
              ) : (
                <>
                  <FileUp className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">ZIP, PDF, DOCX up to 50MB</p>
                </>
              )}
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            </label>
          </div>
          <div><Label>GitHub Repository (optional)</Label><Input placeholder="https://github.com/..." /></div>
          <Button className="w-full" onClick={handleSubmit}>
            <UploadIcon className="h-4 w-4 mr-2" /> Submit Project
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
