import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import Projects from "./pages/Projects";
import UploadProject from "./pages/UploadProject";
import PlagiarismCheck from "./pages/PlagiarismCheck";
import AIViva from "./pages/AIViva";
import CompilerLab from "./pages/CompilerLab";
import Analytics from "./pages/Analytics";
import SettingsPage from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/upload" element={<UploadProject />} />
            <Route path="/plagiarism" element={<PlagiarismCheck />} />
            <Route path="/ai-viva" element={<AIViva />} />
            <Route path="/compiler" element={<CompilerLab />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
