import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from "recharts";
import { evaluationProgressByMonth, scoreDistribution } from "@/data/evaluationMockData";

export function EvaluationProgressChart() {
  const pieColors = [
    "hsl(var(--destructive))",
    "hsl(var(--warning))",
    "hsl(var(--info))",
    "hsl(var(--primary))",
    "hsl(var(--success))",
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Progress over time */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Progresso do Ciclo</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={evaluationProgressByMonth} barCategoryGap="20%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Bar dataKey="completed" name="Concluídas" fill="hsl(var(--success))" radius={[4, 4, 0, 0]} stackId="a" />
              <Bar dataKey="inProgress" name="Em Curso" fill="hsl(var(--warning))" radius={[0, 0, 0, 0]} stackId="a" />
              <Bar dataKey="pending" name="Pendentes" fill="hsl(var(--muted))" radius={[4, 4, 0, 0]} stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Score distribution */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Distribuição de Notas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={260}>
              <PieChart>
                <Pie
                  data={scoreDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="count"
                >
                  {scoreDistribution.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={pieColors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-2">
              {scoreDistribution.map((item, index) => (
                <div key={item.range} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: pieColors[index] }} />
                  <div className="flex-1 flex items-center justify-between">
                    <span className="text-xs">{item.label}</span>
                    <span className="text-xs font-semibold">{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
