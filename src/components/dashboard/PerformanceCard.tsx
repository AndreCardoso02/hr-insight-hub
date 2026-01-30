import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { performanceData } from "@/data/hrMockData";
import { Star, Users, Target } from "lucide-react";

export function PerformanceCard() {
  const maxScore = 5;

  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Avaliação de Desempenho</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center p-3 bg-primary/10 rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Target className="h-4 w-4 text-primary" />
            </div>
            <p className="text-2xl font-bold text-primary">{performanceData.percentEvaluated}%</p>
            <p className="text-xs text-muted-foreground">Avaliados</p>
          </div>
          <div className="text-center p-3 bg-warning-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Star className="h-4 w-4 text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning">{performanceData.averageScore}</p>
            <p className="text-xs text-muted-foreground">Média geral</p>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-2xl font-bold">
              {performanceData.evaluated}/{performanceData.total}
            </p>
            <p className="text-xs text-muted-foreground">Colaboradores</p>
          </div>
        </div>

        {/* Evaluation progress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progresso da avaliação</span>
            <span className="font-medium">{performanceData.percentEvaluated}%</span>
          </div>
          <Progress value={performanceData.percentEvaluated} className="h-2" />
        </div>

        {/* By Department */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">Média por Departamento</p>
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {performanceData.byDepartment
              .sort((a, b) => b.score - a.score)
              .map((dept, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{dept.department}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {dept.employees} colaboradores
                      </span>
                      <span className="font-semibold">{dept.score.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${(dept.score / maxScore) * 100}%`,
                        backgroundColor:
                          dept.score >= 4.5
                            ? "hsl(var(--success))"
                            : dept.score >= 4
                            ? "hsl(var(--primary))"
                            : dept.score >= 3.5
                            ? "hsl(var(--warning))"
                            : "hsl(var(--destructive))",
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
