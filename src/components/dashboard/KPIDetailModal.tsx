import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export interface KPIDetailData {
  title: string;
  value: string | number;
  description: string;
  trend?: number;
  trendLabel?: string;
  breakdown?: {
    label: string;
    value: string | number;
    subValue?: string;
    variant?: "default" | "success" | "warning" | "destructive" | "info";
  }[];
  insights?: string[];
  lastUpdated?: string;
}

interface KPIDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: KPIDetailData | null;
}

const variantBgStyles = {
  default: "bg-muted",
  success: "bg-success-muted text-success",
  warning: "bg-warning-muted text-warning",
  destructive: "bg-destructive/10 text-destructive",
  info: "bg-info-muted text-info",
};

export function KPIDetailModal({ open, onOpenChange, data }: KPIDetailModalProps) {
  if (!data) return null;

  const getTrendIcon = () => {
    if (data.trend === undefined || data.trend === 0)
      return <Minus className="h-4 w-4" />;
    return data.trend > 0 ? (
      <TrendingUp className="h-4 w-4" />
    ) : (
      <TrendingDown className="h-4 w-4" />
    );
  };

  const getTrendColor = () => {
    if (data.trend === undefined || data.trend === 0) return "text-muted-foreground";
    return data.trend > 0 ? "text-success" : "text-destructive";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{data.title}</DialogTitle>
          <DialogDescription>{data.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main value with trend */}
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-4xl font-bold tracking-tight">{data.value}</p>
              {data.trend !== undefined && (
                <div
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium mt-1",
                    getTrendColor()
                  )}
                >
                  {getTrendIcon()}
                  <span>{Math.abs(data.trend)}%</span>
                  {data.trendLabel && (
                    <span className="text-muted-foreground font-normal">
                      {data.trendLabel}
                    </span>
                  )}
                </div>
              )}
            </div>
            {data.lastUpdated && (
              <Badge variant="outline" className="text-xs">
                Atualizado: {data.lastUpdated}
              </Badge>
            )}
          </div>

          {/* Breakdown */}
          {data.breakdown && data.breakdown.length > 0 && (
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Detalhamento
              </h4>
              <div className="grid gap-2">
                {data.breakdown.map((item, i) => (
                  <div
                    key={i}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg",
                      variantBgStyles[item.variant || "default"]
                    )}
                  >
                    <span className="font-medium">{item.label}</span>
                    <div className="text-right">
                      <span className="font-bold">{item.value}</span>
                      {item.subValue && (
                        <p className="text-xs text-muted-foreground">{item.subValue}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Insights */}
          {data.insights && data.insights.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  Insights
                </h4>
                <ul className="space-y-2">
                  {data.insights.map((insight, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="text-primary mt-1">•</span>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
