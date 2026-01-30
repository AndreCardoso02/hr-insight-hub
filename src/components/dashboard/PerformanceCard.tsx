import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { performanceData } from "@/data/hrMockData";
import { Star, Users, Target, TrendingUp, TrendingDown, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface DepartmentDetail {
  department: string;
  score: number;
  employees: number;
  evaluated: number;
  topPerformers: number;
  needsImprovement: number;
}

const departmentDetails: Record<string, Omit<DepartmentDetail, "department" | "score" | "employees">> = {
  "TI": { evaluated: 145, topPerformers: 28, needsImprovement: 5 },
  "Comercial": { evaluated: 210, topPerformers: 45, needsImprovement: 12 },
  "Financeiro": { evaluated: 82, topPerformers: 15, needsImprovement: 3 },
  "RH": { evaluated: 43, topPerformers: 12, needsImprovement: 1 },
  "Marketing": { evaluated: 61, topPerformers: 14, needsImprovement: 4 },
  "Produção": { evaluated: 278, topPerformers: 35, needsImprovement: 28 },
  "Logística": { evaluated: 158, topPerformers: 22, needsImprovement: 15 },
  "Jurídico": { evaluated: 27, topPerformers: 10, needsImprovement: 0 },
};

export function PerformanceCard() {
  const [selectedDept, setSelectedDept] = useState<DepartmentDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const maxScore = 5;

  const handleDeptClick = (dept: typeof performanceData.byDepartment[0]) => {
    const details = departmentDetails[dept.department];
    setSelectedDept({
      ...dept,
      evaluated: details.evaluated,
      topPerformers: details.topPerformers,
      needsImprovement: details.needsImprovement,
    });
    setModalOpen(true);
  };

  const getScoreColor = (score: number) => {
    if (score >= 4.5) return "hsl(var(--success))";
    if (score >= 4) return "hsl(var(--primary))";
    if (score >= 3.5) return "hsl(var(--warning))";
    return "hsl(var(--destructive))";
  };

  return (
    <TooltipProvider>
      <>
        <Card className="border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold">Avaliação de Desempenho</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Overall Stats */}
            <div className="grid grid-cols-3 gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-primary/10 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Target className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-primary">{performanceData.percentEvaluated}%</p>
                    <p className="text-xs text-muted-foreground">Avaliados</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{performanceData.evaluated} de {performanceData.total} colaboradores avaliados</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-warning-muted rounded-lg cursor-pointer hover:brightness-95 transition-all">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-warning" />
                    </div>
                    <p className="text-2xl font-bold text-warning">{performanceData.averageScore}</p>
                    <p className="text-xs text-muted-foreground">Média geral</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Média de desempenho em escala de 0 a 5</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-center p-3 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-2xl font-bold">
                      {performanceData.evaluated}/{performanceData.total}
                    </p>
                    <p className="text-xs text-muted-foreground">Colaboradores</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{performanceData.total - performanceData.evaluated} colaboradores pendentes de avaliação</p>
                </TooltipContent>
              </Tooltip>
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
                    <div
                      key={i}
                      className="space-y-1 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
                      onClick={() => handleDeptClick(dept)}
                    >
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium group-hover:text-primary transition-colors">
                          {dept.department}
                        </span>
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground text-xs">
                            {dept.employees} colaboradores
                          </span>
                          <span
                            className="font-semibold"
                            style={{ color: getScoreColor(dept.score) }}
                          >
                            {dept.score.toFixed(1)}
                          </span>
                        </div>
                      </div>
                      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500 group-hover:brightness-110"
                          style={{
                            width: `${(dept.score / maxScore) * 100}%`,
                            backgroundColor: getScoreColor(dept.score),
                          }}
                        />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {selectedDept?.department}
              </DialogTitle>
              <DialogDescription>Detalhes do desempenho do departamento</DialogDescription>
            </DialogHeader>
            {selectedDept && (
              <div className="space-y-4">
                <div
                  className="p-4 rounded-lg text-center"
                  style={{ backgroundColor: `${getScoreColor(selectedDept.score)}20` }}
                >
                  <p
                    className="text-4xl font-bold"
                    style={{ color: getScoreColor(selectedDept.score) }}
                  >
                    {selectedDept.score.toFixed(1)}
                  </p>
                  <p className="text-sm text-muted-foreground">média de desempenho</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Total de colaboradores</p>
                    <p className="text-xl font-bold">{selectedDept.employees}</p>
                  </div>
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="text-xs text-muted-foreground">Avaliados</p>
                    <p className="text-xl font-bold">{selectedDept.evaluated}</p>
                  </div>
                  <div className="p-3 bg-success-muted rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> Top performers
                    </p>
                    <p className="text-xl font-bold text-success">{selectedDept.topPerformers}</p>
                  </div>
                  <div className="p-3 bg-destructive/10 rounded-lg">
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <TrendingDown className="h-3 w-3" /> Precisa melhorar
                    </p>
                    <p className="text-xl font-bold text-destructive">{selectedDept.needsImprovement}</p>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </>
    </TooltipProvider>
  );
}
