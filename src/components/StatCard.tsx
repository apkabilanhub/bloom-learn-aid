import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend }: Props) {
  return (
    <Card className="glass-card">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
            {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
            {trend && <p className="text-xs text-success mt-1">{trend}</p>}
          </div>
          <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
