import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine,
} from "recharts";
import { budgetComparison } from "@/data/financialMockData";
import { Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function BudgetComparisonChart() {
  const lastMonth = budgetComparison[budgetComparison.length - 1];
  const variance = ((lastMonth.realizado - lastMonth.orcamento) / lastMonth.orcamento) * 100;

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Target className="h-4 w-4 text-success" />
            Orçamento vs Realizado
          </CardTitle>
          <Badge
            variant={variance < 0 ? "default" : "destructive"}
            className="text-xs"
          >
            {variance > 0 ? "+" : ""}{variance.toFixed(1)}% desvio
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={budgetComparison}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                className="text-muted-foreground"
              />
              <YAxis
                tick={{ fontSize: 11 }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `€${(value / 1000000).toFixed(1)}M`}
                domain={["dataMin - 200000", "dataMax + 200000"]}
                className="text-muted-foreground"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`€${value.toLocaleString("pt-BR")}`, ""]}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar
                dataKey="orcamento"
                name="Orçamento"
                fill="hsl(var(--muted-foreground))"
                opacity={0.4}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="realizado"
                name="Realizado"
                fill="hsl(var(--success))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
