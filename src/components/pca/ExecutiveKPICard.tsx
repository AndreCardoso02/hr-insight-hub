import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";

interface ExecutiveKPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  onClick?: () => void;
  accentColor?: "blue" | "green" | "amber" | "red";
}

const accentStyles = {
  blue: "border-l-primary",
  green: "border-l-success",
  amber: "border-l-warning",
  red: "border-l-destructive",
};

const iconBgStyles = {
  blue: "bg-primary/10 text-primary",
  green: "bg-success/10 text-success",
  amber: "bg-warning/10 text-warning",
  red: "bg-destructive/10 text-destructive",
};

export function ExecutiveKPICard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon,
  onClick,
  accentColor = "blue",
}: ExecutiveKPICardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) return <Minus className="h-3.5 w-3.5" />;
    return change > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />;
  };

  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-muted-foreground";
    // For cost and some metrics, increase might be bad
    return change > 0 ? "text-success" : "text-destructive";
  };

  return (
    <Card
      className={cn(
        "border-l-4 bg-card hover:shadow-xl transition-all duration-300 cursor-pointer group",
        accentStyles[accentColor]
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
              {title}
            </p>
            <p className="text-4xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
            {change !== undefined && (
              <div className={cn("flex items-center gap-1.5 text-sm font-semibold", getTrendColor())}>
                {getTrendIcon()}
                <span>{change > 0 ? "+" : ""}{change}%</span>
                {changeLabel && (
                  <span className="text-muted-foreground font-normal text-xs ml-1">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={cn("p-4 rounded-2xl", iconBgStyles[accentColor])}>
            {icon}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Ver detalhes</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );
}
