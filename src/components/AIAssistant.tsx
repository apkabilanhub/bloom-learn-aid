import { useState } from "react";
import { X, Send, Bot, Sparkles, FileSearch, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Props {
  open: boolean;
  onClose: () => void;
}

const quickActions = [
  { icon: Sparkles, label: "Explain project", action: "Explain my project structure and goals" },
  { icon: HelpCircle, label: "Generate questions", action: "Generate viva questions for my project" },
  { icon: FileSearch, label: "Check plagiarism", action: "Run a plagiarism check on my latest submission" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export function AIAssistant({ open, onClose }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hello! I'm your AI assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      { role: "assistant", content: "I'm processing your request. This feature will be connected to the AI backend soon." },
    ]);
    setInput("");
  };

  if (!open) return null;

  return (
    <Card className="fixed bottom-4 right-4 w-[380px] h-[520px] z-50 flex flex-col shadow-lg border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b bg-primary/5">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <span className="font-semibold text-sm">AI Assistant</span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-3">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
              }`}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
        {messages.length === 1 && (
          <div className="mt-4 space-y-2">
            <p className="text-xs text-muted-foreground font-medium">Quick Actions</p>
            {quickActions.map((a) => (
              <button
                key={a.label}
                onClick={() => send(a.action)}
                className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
              >
                <a.icon className="h-4 w-4 text-primary" />
                {a.label}
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
      <div className="p-3 border-t flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send(input)}
          placeholder="Ask anything..."
          className="h-9 text-sm"
        />
        <Button size="icon" className="h-9 w-9 shrink-0" onClick={() => send(input)}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
