import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ShieldCheck, FileUp, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

export default function PlagiarismCheck() {
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<null | number>(null);

  const runCheck = () => {
    setChecking(true);
    setResult(null);
    setTimeout(() => {
      setChecking(false);
      setResult(8);
      toast.success("Plagiarism check complete!");
    }, 2500);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">Plagiarism Check</h1>
        <p className="text-muted-foreground text-sm">Check your work for similarity</p>
      </div>

      <Card className="glass-card">
        <CardContent className="p-6">
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer hover:border-primary/50 hover:bg-accent/30 transition-colors">
            <FileUp className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">Upload file to check</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, TXT</p>
            <input type="file" className="hidden" />
          </label>
          <Button className="w-full mt-4" onClick={runCheck} disabled={checking}>
            <ShieldCheck className="h-4 w-4 mr-2" />
            {checking ? "Analyzing..." : "Run Plagiarism Check"}
          </Button>
        </CardContent>
      </Card>

      {checking && (
        <Card className="glass-card">
          <CardContent className="p-6 text-center space-y-4">
            <div className="animate-pulse">
              <ShieldCheck className="h-12 w-12 text-primary mx-auto" />
              <p className="text-sm mt-3">Analyzing document...</p>
            </div>
            <Progress value={65} className="h-2" />
          </CardContent>
        </Card>
      )}

      {result !== null && (
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative h-24 w-24 shrink-0">
                <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke={result < 15 ? "hsl(var(--success))" : "hsl(var(--destructive))"} strokeWidth="8"
                    strokeDasharray={`${result * 2.51} ${100 * 2.51}`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold">{result}%</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle className="h-4 w-4 text-success" />
                  <span className="font-medium text-sm">Low Similarity</span>
                </div>
                <p className="text-sm text-muted-foreground">Your document has {result}% similarity with existing sources.</p>
              </div>
            </div>
            <div className="space-y-2 border-t pt-4">
              <p className="text-xs font-medium text-muted-foreground">Highlighted Sections</p>
              <div className="bg-accent/50 rounded-lg p-3 text-sm">
                <span className="bg-warning/20 px-1 rounded">Machine learning is a subset of artificial intelligence</span> that focuses on building systems that learn from data. <span className="bg-warning/20 px-1 rounded">Neural networks are inspired by the human brain</span> and consist of layers of interconnected nodes.
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
