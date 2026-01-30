import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, ChevronRight } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  onClick?: () => void;
  clickable?: boolean;
}

const variantStyles = {
  default: "bg-card border-border",
  success: "bg-success-muted border-success/20",
  warning: "bg-warning-muted border-warning/20",
  destructive: "bg-destructive/10 border-destructive/20",
  info: "bg-info-muted border-info/20",
};

const iconContainerStyles = {
  default: "bg-primary/10 text-primary",
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  destructive: "bg-destructive/20 text-destructive",
  info: "bg-info/20 text-info",
};

export function KPICard({
  title,
  value,
  subtitle,
  trend,
  trendLabel,
  icon,
  variant = "default",
  onClick,
  clickable = true,
}: KPICardProps) {
  const getTrendIcon = () => {
    if (trend === undefined || trend === 0) return <Minus className="h-3 w-3" />;
    return trend > 0 ? (
      <TrendingUp className="h-3 w-3" />
    ) : (
      <TrendingDown className="h-3 w-3" />
    );
  };

  const getTrendColor = () => {
    if (trend === undefined || trend === 0) return "text-muted-foreground";
    return trend > 0 ? "text-success" : "text-destructive";
  };

  return (
    <Card
      className={cn(
        "border transition-all",
        variantStyles[variant],
        clickable && "cursor-pointer hover:shadow-lg hover:scale-[1.02] active:scale-[0.99]"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              {clickable && (
                <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </div>
            <p className="text-3xl font-bold tracking-tight text-foreground">{value}</p>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
            {trend !== undefined && (
              <div className={cn("flex items-center gap-1 text-sm font-medium", getTrendColor())}>
                {getTrendIcon()}
                <span>{Math.abs(trend)}%</span>
                {trendLabel && (
                  <span className="text-muted-foreground font-normal">{trendLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl", iconContainerStyles[variant])}>
            {icon}
          </div>
        </div>
        {clickable && (
          <div className="mt-3 pt-3 border-t border-border/50">
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              Clique para ver detalhes
              <ChevronRight className="h-3 w-3" />
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
