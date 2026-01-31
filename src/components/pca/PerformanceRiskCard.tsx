import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { performanceIndicators, riskIndicators } from "@/data/pcaMockData";

export function PerformanceRiskCard() {
  const { evaluationsCompleted, averagePerformance } = performanceIndicators;
  const { highTurnoverDepartments, prolongedLeaves, totalOnLeave } = riskIndicators;

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-destructive" />;
    if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-success" />;
    return <Minus className="h-3.5 w-3.5 text-muted-foreground" />;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Performance Card */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-success" />
            Desempenho Organizacional
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Evaluations Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Avaliações Concluídas</span>
              <Badge variant="secondary" className="font-bold">
                {evaluationsCompleted.percent}%
              </Badge>
            </div>
            <Progress value={evaluationsCompleted.percent} className="h-3" />
            <p className="text-xs text-muted-foreground">
              {evaluationsCompleted.completed} de {evaluationsCompleted.total} colaboradores avaliados
            </p>
          </div>

          {/* Average Performance */}
          <div className="p-4 bg-muted/50 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Média Geral de Desempenho</span>
              <div className="flex items-center gap-1.5 text-success text-sm font-semibold">
                <TrendingUp className="h-3.5 w-3.5" />
                +{averagePerformance.changePercent}%
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold">{averagePerformance.score}</span>
              <span className="text-lg text-muted-foreground">/ {averagePerformance.maxScore}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Período anterior: {averagePerformance.previousPeriod}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Risk Card */}
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            Indicadores de Risco
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* High Turnover Departments */}
          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">Maior Rotatividade</p>
            <div className="space-y-2">
              {highTurnoverDepartments.map((dept) => (
                <div
                  key={dept.name}
                  className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    {getTrendIcon(dept.trend)}
                    <span className="font-medium">{dept.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{dept.employees} colab.</span>
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-bold",
                        dept.rate > 3 ? "border-destructive text-destructive" : "border-warning text-warning"
                      )}
                    >
                      {dept.rate}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prolonged Leaves */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted-foreground">Licenças Prolongadas</p>
              <Badge variant="secondary">{totalOnLeave} ativas</Badge>
            </div>
            <div className="space-y-2">
              {prolongedLeaves.map((leave) => (
                <div
                  key={leave.type}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-muted-foreground">{leave.type}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-medium">{leave.count}</span>
                    <span className="text-xs text-muted-foreground">~{leave.avgDuration}</span>
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
