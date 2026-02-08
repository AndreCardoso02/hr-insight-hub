import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ChevronRight, MessageSquare } from "lucide-react";
import { Evaluation, statusLabels, statusColors } from "@/data/evaluationMockData";

interface EvaluationListTableProps {
  evaluations: Evaluation[];
  title?: string;
  onEvaluationClick: (evaluation: Evaluation) => void;
}

export function EvaluationListTable({ evaluations, title = "Avaliações", onEvaluationClick }: EvaluationListTableProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left text-xs font-medium text-muted-foreground px-5 py-3">Colaborador</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Departamento</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Função</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Autoavaliação</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Chefia</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Final</th>
                <th className="text-left text-xs font-medium text-muted-foreground px-3 py-3">Estado</th>
                <th className="text-center text-xs font-medium text-muted-foreground px-3 py-3">Feedback</th>
                <th className="px-3 py-3 w-8"></th>
              </tr>
            </thead>
            <tbody>
              {evaluations.map((evaluation) => (
                <tr
                  key={evaluation.id}
                  className="border-b border-border last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                  onClick={() => onEvaluationClick(evaluation)}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {evaluation.employeeName.split(" ").map(n => n[0]).slice(0, 2).join("")}
                      </div>
                      <span className="font-medium text-sm">{evaluation.employeeName}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3.5 text-sm text-muted-foreground">{evaluation.department}</td>
                  <td className="px-3 py-3.5 text-sm text-muted-foreground">{evaluation.position}</td>
                  <td className="text-center px-3 py-3.5">
                    {evaluation.selfEvaluationScore ? (
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 text-warning fill-warning" />
                        <span className="text-sm font-medium">{evaluation.selfEvaluationScore.toFixed(1)}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="text-center px-3 py-3.5">
                    {evaluation.supervisorScore ? (
                      <div className="flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 text-warning fill-warning" />
                        <span className="text-sm font-medium">{evaluation.supervisorScore.toFixed(1)}</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="text-center px-3 py-3.5">
                    {evaluation.finalScore ? (
                      <span className="text-sm font-bold">{evaluation.finalScore.toFixed(1)}</span>
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusColors[evaluation.status]}`}>
                      {statusLabels[evaluation.status]}
                    </span>
                  </td>
                  <td className="text-center px-3 py-3.5">
                    {evaluation.employeeFeedback ? (
                      <MessageSquare className="h-4 w-4 text-success mx-auto" />
                    ) : (
                      <span className="text-xs text-muted-foreground">—</span>
                    )}
                  </td>
                  <td className="px-3 py-3.5">
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
