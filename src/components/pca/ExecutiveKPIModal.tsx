import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Target, Lightbulb } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { cn } from "@/lib/utils";

export interface ExecutiveKPIData {
  title: string;
  currentValue: string;
  previousValue: string;
  change: number;
  trend: number[];
  trendLabels: string[];
  description: string;
  insight: string;
  target?: number;
  unit?: string;
}

interface ExecutiveKPIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ExecutiveKPIData | null;
}

export function ExecutiveKPIModal({ open, onOpenChange, data }: ExecutiveKPIModalProps) {
  if (!data) return null;

  const chartData = data.trend.map((value, index) => ({
    month: data.trendLabels[index],
    value,
  }));

  const isPositive = data.change > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{data.title}</DialogTitle>
          <DialogDescription className="text-base">{data.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Current vs Previous */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground font-medium mb-1">Período Atual</p>
              <p className="text-3xl font-bold">{data.currentValue}</p>
            </div>
            <div className="p-5 bg-muted/30 rounded-xl">
              <p className="text-sm text-muted-foreground font-medium mb-1">Período Anterior</p>
              <p className="text-3xl font-bold text-muted-foreground">{data.previousValue}</p>
            </div>
          </div>

          {/* Change indicator */}
          <div
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl",
              isPositive ? "bg-success/10" : "bg-destructive/10"
            )}
          >
            {isPositive ? (
              <TrendingUp className={cn("h-6 w-6", isPositive ? "text-success" : "text-destructive")} />
            ) : (
              <TrendingDown className={cn("h-6 w-6", isPositive ? "text-success" : "text-destructive")} />
            )}
            <div>
              <p className={cn("font-semibold", isPositive ? "text-success" : "text-destructive")}>
                {isPositive ? "+" : ""}{data.change}% vs período anterior
              </p>
              <p className="text-sm text-muted-foreground">Variação dos últimos 6 meses</p>
            </div>
          </div>

          {/* Trend Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Target className="h-4 w-4" />
              Tendência Histórica
            </h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    tick={{ fontSize: 12 }}
                    tickLine={false}
                    axisLine={false}
                    className="text-muted-foreground"
                    domain={["dataMin - 5%", "dataMax + 5%"]}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  {data.target && (
                    <ReferenceLine
                      y={data.target}
                      stroke="hsl(var(--success))"
                      strokeDasharray="5 5"
                      label={{ value: "Meta", position: "right", fontSize: 12 }}
                    />
                  )}
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 5 }}
                    activeDot={{ r: 7, fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Insight */}
          <div className="flex items-start gap-3 p-4 bg-info/10 rounded-xl">
            <Lightbulb className="h-5 w-5 text-info mt-0.5" />
            <div>
              <p className="font-semibold text-info mb-1">Insight</p>
              <p className="text-sm text-muted-foreground">{data.insight}</p>
            </div>
          </div>

          {/* Last updated */}
          <div className="flex justify-end">
            <Badge variant="outline" className="text-xs">
              Atualizado: {new Date().toLocaleDateString("pt-BR")}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
