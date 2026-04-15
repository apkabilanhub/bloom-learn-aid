import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Topbar } from "@/components/Topbar";
import { AIAssistant } from "@/components/AIAssistant";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full relative">
        <div className="watermark">SRM</div>
        <AppSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar onToggleAssistant={() => setShowAssistant(!showAssistant)} />
          <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
        </div>
        <AIAssistant open={showAssistant} onClose={() => setShowAssistant(false)} />
      </div>
    </SidebarProvider>
  );
}
