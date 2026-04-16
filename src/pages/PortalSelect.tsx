import { useNavigate } from "react-router-dom";
import { useRole, UserRole } from "@/contexts/RoleContext";
import { GraduationCap, BookOpenCheck, Shield, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const portals: { role: UserRole; title: string; description: string; icon: typeof Shield; gradient: string }[] = [
  {
    role: "student",
    title: "Student Portal",
    description: "Access classes, submit projects, attend AI viva, track progress and deadlines.",
    icon: GraduationCap,
    gradient: "from-primary/10 to-primary/5",
  },
  {
    role: "faculty",
    title: "Faculty Portal",
    description: "Manage classes, create assignments, evaluate submissions, view AI insights.",
    icon: BookOpenCheck,
    gradient: "from-info/10 to-info/5",
  },
  {
    role: "admin",
    title: "Admin Portal",
    description: "Manage users, monitor platform activity, view global analytics and reports.",
    icon: Shield,
    gradient: "from-warning/10 to-warning/5",
  },
];

export default function PortalSelect() {
  const { setRole } = useRole();
  const navigate = useNavigate();

  const enter = (role: UserRole) => {
    setRole(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative">
      <div className="watermark">SRM</div>
      <div className="text-center mb-10 relative z-10">
        <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4">
          <span className="text-primary-foreground font-bold text-xl">SR</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">SRM EduCloud</h1>
        <p className="text-muted-foreground mt-2">AI-Powered University Classroom & Project Management</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full relative z-10">
        {portals.map((p) => (
          <Card
            key={p.role}
            onClick={() => enter(p.role)}
            className="glass-card hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer group"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center mb-4`}>
                <p.icon className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-lg font-semibold mb-2">{p.title}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
              <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                Enter <ArrowRight className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted-foreground mt-10 relative z-10">
        © 2026 SRM Institute of Science and Technology. All rights reserved.
      </p>
    </div>
  );
}