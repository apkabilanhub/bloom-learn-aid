import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, RotateCcw } from "lucide-react";
import { toast } from "sonner";

const defaultCode = `#include <stdio.h>

int main() {
    printf("Hello, World!\\n");
    return 0;
}`;

const languages = [
  { value: "c", label: "C" },
  { value: "cpp", label: "C++" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "javascript", label: "JavaScript" },
];

export default function CompilerLab() {
  const [language, setLanguage] = useState("c");
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [running, setRunning] = useState(false);

  const runCode = () => {
    setRunning(true);
    setOutput("");
    setError("");
    setTimeout(() => {
      setRunning(false);
      if (code.includes("error")) {
        setError("compilation error: unexpected token");
      } else {
        setOutput("Hello, World!\n\nProcess exited with code 0");
      }
      toast.success("Code executed!");
    }, 1500);
  };

  return (
    <div className="space-y-4 h-[calc(100vh-7rem)] flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Compiler Lab</h1>
          <p className="text-muted-foreground text-sm">Write, compile, and run code</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-36 h-9"><SelectValue /></SelectTrigger>
            <SelectContent>
              {languages.map((l) => (
                <SelectItem key={l.value} value={l.value}>{l.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" onClick={() => { setCode(defaultCode); setOutput(""); setError(""); }}>
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
          <Button size="sm" onClick={runCode} disabled={running}>
            <Play className="h-4 w-4 mr-1" /> {running ? "Running..." : "Run"}
          </Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0">
        <Card className="glass-card flex flex-col min-h-0">
          <CardContent className="p-0 flex-1 min-h-0">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 font-mono text-sm bg-transparent resize-none focus:outline-none"
              spellCheck={false}
            />
          </CardContent>
        </Card>
        <Card className="glass-card flex flex-col min-h-0">
          <div className="px-4 py-2 border-b text-xs font-medium text-muted-foreground">Output</div>
          <CardContent className="p-4 flex-1 overflow-auto min-h-0">
            {running && <p className="text-sm text-muted-foreground animate-pulse">Compiling and running...</p>}
            {output && <pre className="text-sm font-mono text-success whitespace-pre-wrap">{output}</pre>}
            {error && <pre className="text-sm font-mono text-destructive whitespace-pre-wrap">{error}</pre>}
            {!running && !output && !error && <p className="text-sm text-muted-foreground">Run your code to see output here</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
