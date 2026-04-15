import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Trophy } from "lucide-react";

interface Message {
  role: "ai" | "student";
  content: string;
}

const vivaQuestions: Message[] = [
  { role: "ai", content: "Welcome to your AI Viva! I'll be asking questions about your project. Let's begin.\n\nQ1: Can you explain the main objective of your project?" },
];

export default function AIViva() {
  const [messages, setMessages] = useState<Message[]>(vivaQuestions);
  const [input, setInput] = useState("");
  const [questionCount, setQuestionCount] = useState(1);
  const [vivaComplete, setVivaComplete] = useState(false);

  const send = () => {
    if (!input.trim()) return;
    const newMessages: Message[] = [
      ...messages,
      { role: "student", content: input },
    ];

    if (questionCount >= 5) {
      newMessages.push({ role: "ai", content: "Thank you for completing the viva! Your responses have been recorded. Check your score below." });
      setVivaComplete(true);
    } else {
      const questions = [
        "Q2: What technologies did you use and why?",
        "Q3: How did you handle data preprocessing?",
        "Q4: What challenges did you face during implementation?",
        "Q5: How would you improve this project in the future?",
      ];
      newMessages.push({ role: "ai", content: `Good answer! Let me continue.\n\n${questions[questionCount - 1]}` });
      setQuestionCount((c) => c + 1);
    }

    setMessages(newMessages);
    setInput("");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold">AI Viva</h1>
        <p className="text-muted-foreground text-sm">AI-powered project evaluation interview</p>
      </div>

      <Card className="glass-card">
        <CardHeader className="pb-2 flex-row items-center justify-between">
          <CardTitle className="text-base flex items-center gap-2">
            <Bot className="h-4 w-4 text-primary" /> Viva Session
          </CardTitle>
          <Badge variant="secondary">Question {Math.min(questionCount, 5)}/5</Badge>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4 py-2">
              {messages.map((m, i) => (
                <div key={i} className={`flex gap-3 ${m.role === "student" ? "justify-end" : ""}`}>
                  {m.role === "ai" && (
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm whitespace-pre-wrap ${
                    m.role === "student" ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}>
                    {m.content}
                  </div>
                  {m.role === "student" && (
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center shrink-0">
                      <User className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          {!vivaComplete && (
            <div className="flex gap-2 mt-4 pt-4 border-t">
              <Input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type your answer..." />
              <Button onClick={send}><Send className="h-4 w-4" /></Button>
            </div>
          )}
        </CardContent>
      </Card>

      {vivaComplete && (
        <Card className="glass-card">
          <CardContent className="p-6 text-center space-y-4">
            <Trophy className="h-12 w-12 text-warning mx-auto" />
            <h3 className="text-lg font-bold">Viva Complete!</h3>
            <div className="text-4xl font-bold text-primary">85%</div>
            <p className="text-sm text-muted-foreground">Great performance! Your answers demonstrated solid understanding.</p>
            <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t">
              <div><p className="text-lg font-semibold">5/5</p><p className="text-xs text-muted-foreground">Questions</p></div>
              <div><p className="text-lg font-semibold">4:32</p><p className="text-xs text-muted-foreground">Duration</p></div>
              <div><p className="text-lg font-semibold">A</p><p className="text-xs text-muted-foreground">Grade</p></div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
