import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Star } from "lucide-react";
import { DepartmentEvaluation } from "@/data/evaluationMockData";

interface DepartmentEvaluationTableProps {
  departments: DepartmentEvaluation[];
  onDepartmentClick: (department: string) => void;
}

export function DepartmentEvaluationTable({ departments, onDepartmentClick }: DepartmentEvaluationTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Avaliações por Área</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Departamento</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Total</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Avaliados</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Em Curso</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Pendentes</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3 w-40">Progresso</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Nota Média</th>
                <th className="px-3 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => {
                const progress = Math.round((dept.evaluated / dept.totalEmployees) * 100);
                return (
                  <tr
                    key={dept.department}
                    className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                    onClick={() => onDepartmentClick(dept.department)}
                  >
                    <td className="px-5 py-3.5">
                      <span className="font-medium text-sm">{dept.department}</span>
                    </td>
                    <td className="text-center px-3 py-3.5 text-sm">{dept.totalEmployees}</td>
                    <td className="text-center px-3 py-3.5">
                      <Badge variant="outline" className="bg-success-muted text-success border-0 text-xs">
                        {dept.evaluated}
                      </Badge>
                    </td>
                    <td className="text-center px-3 py-3.5">
                      <Badge variant="outline" className="bg-warning-muted text-warning border-0 text-xs">
                        {dept.inProgress}
                      </Badge>
                    </td>
                    <td className="text-center px-3 py-3.5">
                      <Badge variant="outline" className="bg-muted text-muted-foreground border-0 text-xs">
                        {dept.pending}
                      </Badge>
                    </td>
                    <td className="px-3 py-3.5">
                      <div className="flex items-center gap-2">
                        <Progress value={progress} className="h-1.5 flex-1" />
                        <span className="text-xs font-medium w-8 text-right">{progress}%</span>
                      </div>
                    </td>
                    <td className="text-center px-3 py-3.5">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 text-warning fill-warning" />
                        <span className="text-sm font-semibold">{dept.avgScore.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3.5">
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
