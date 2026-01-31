import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Lightbulb, BarChart3 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { cn } from "@/lib/utils";

export interface FinancialKPIData {
  title: string;
  currentValue: string;
  previousValue: string;
  change: number;
  breakdown: {
    name: string;
    value: number;
    percent: number;
  }[];
  trend: number[];
  trendLabels: string[];
  insights: string[];
}

interface FinancialKPIModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: FinancialKPIData | null;
}

const COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--info))",
  "hsl(var(--warning))",
  "hsl(var(--success))",
];

export function FinancialKPIModal({ open, onOpenChange, data }: FinancialKPIModalProps) {
  if (!data) return null;

  const isIncrease = data.change > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{data.title}</DialogTitle>
          <DialogDescription>
            Detalhamento e análise comparativa
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          {/* Current vs Previous */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground font-medium mb-1">Período Atual</p>
              <p className="text-2xl font-bold">{data.currentValue}</p>
            </div>
            <div className="p-4 bg-muted/30 rounded-xl">
              <p className="text-sm text-muted-foreground font-medium mb-1">Período Anterior</p>
              <p className="text-2xl font-bold text-muted-foreground">{data.previousValue}</p>
            </div>
          </div>

          {/* Change indicator */}
          <div
            className={cn(
              "flex items-center gap-3 p-4 rounded-xl",
              isIncrease ? "bg-warning/10" : "bg-success/10"
            )}
          >
            {isIncrease ? (
              <TrendingUp className="h-5 w-5 text-warning" />
            ) : (
              <TrendingDown className="h-5 w-5 text-success" />
            )}
            <div>
              <p className={cn("font-semibold", isIncrease ? "text-warning" : "text-success")}>
                {isIncrease ? "+" : ""}{data.change.toFixed(2)}% vs período anterior
              </p>
              <p className="text-sm text-muted-foreground">Variação mensal</p>
            </div>
          </div>

          {/* Breakdown Chart */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Distribuição por Categoria
            </h4>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data.breakdown}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={true} vertical={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `€${(value / 1000).toFixed(0)}k`}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 11 }}
                    tickLine={false}
                    axisLine={false}
                    width={75}
                    className="text-muted-foreground"
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                    formatter={(value: number) => [`€${value.toLocaleString("pt-BR")}`, "Valor"]}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {data.breakdown.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            {/* Breakdown list */}
            <div className="grid grid-cols-2 gap-2">
              {data.breakdown.map((item, index) => (
                <div
                  key={item.name}
                  className="flex items-center justify-between p-2 bg-muted/30 rounded-lg text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="truncate">{item.name}</span>
                  </div>
                  <span className="font-medium">{item.percent.toFixed(1)}%</span>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Insights */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Insights Automáticos
            </h4>
            <ul className="space-y-2">
              {data.insights.map((insight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm p-3 bg-info/5 rounded-lg"
                >
                  <span className="text-info mt-0.5">•</span>
                  <span className="text-muted-foreground">{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
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
