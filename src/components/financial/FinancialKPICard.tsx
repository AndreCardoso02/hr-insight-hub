import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FinancialKPICardProps {
  title: string;
  value: string;
  subtitle?: string;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  tooltip?: string;
  onClick?: () => void;
  variant?: "default" | "primary" | "success" | "warning" | "danger";
}

const variantStyles = {
  default: "border-l-muted-foreground",
  primary: "border-l-primary",
  success: "border-l-success",
  warning: "border-l-warning",
  danger: "border-l-destructive",
};

const iconBgStyles = {
  default: "bg-muted text-muted-foreground",
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/10 text-warning",
  danger: "bg-destructive/10 text-destructive",
};

export function FinancialKPICard({
  title,
  value,
  subtitle,
  change,
  changeLabel,
  icon,
  tooltip,
  onClick,
  variant = "default",
}: FinancialKPICardProps) {
  const getTrendIcon = () => {
    if (change === undefined || change === 0) return <Minus className="h-3.5 w-3.5" />;
    return change > 0 ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />;
  };

  // For financial metrics, increase in costs is usually negative (warning/red)
  const getTrendColor = () => {
    if (change === undefined || change === 0) return "text-muted-foreground";
    return change > 0 ? "text-warning" : "text-success";
  };

  const cardContent = (
    <Card
      className={cn(
        "border-l-4 bg-card hover:shadow-lg transition-all duration-200 cursor-pointer group",
        variantStyles[variant]
      )}
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1 min-w-0">
            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide truncate">
              {title}
            </p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </p>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
            {change !== undefined && (
              <div className={cn("flex items-center gap-1.5 text-sm font-semibold", getTrendColor())}>
                {getTrendIcon()}
                <span>{change > 0 ? "+" : ""}{change.toFixed(1)}%</span>
                {changeLabel && (
                  <span className="text-muted-foreground font-normal text-xs">
                    {changeLabel}
                  </span>
                )}
              </div>
            )}
          </div>
          <div className={cn("p-3 rounded-xl shrink-0", iconBgStyles[variant])}>
            {icon}
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Ver detalhes</span>
          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  );

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{cardContent}</TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return cardContent;
}
