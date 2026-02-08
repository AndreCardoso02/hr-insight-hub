import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, MessageSquare, Calendar } from "lucide-react";
import { Evaluation, statusLabels, statusColors } from "@/data/evaluationMockData";
import { ApprovalTimeline } from "./ApprovalTimeline";

interface EvaluationDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  evaluation: Evaluation | null;
}

export function EvaluationDetailModal({ open, onOpenChange, evaluation }: EvaluationDetailModalProps) {
  if (!evaluation) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
              {evaluation.employeeName.split(" ").map(n => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <DialogTitle className="text-xl">{evaluation.employeeName}</DialogTitle>
              <DialogDescription>
                {evaluation.position} • {evaluation.department}
              </DialogDescription>
            </div>
          </div>
          <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium w-fit mt-2 ${statusColors[evaluation.status]}`}>
            {statusLabels[evaluation.status]}
          </span>
        </DialogHeader>

        <Tabs defaultValue="scores" className="mt-2">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="scores">Notas</TabsTrigger>
            <TabsTrigger value="approval">Fluxo de Aprovação</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="scores" className="space-y-4 mt-4">
            {/* Summary scores */}
            <div className="grid grid-cols-3 gap-3">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">Autoavaliação</p>
                  <p className="text-2xl font-bold mt-1">
                    {evaluation.selfEvaluationScore?.toFixed(1) ?? "—"}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">Chefia</p>
                  <p className="text-2xl font-bold mt-1">
                    {evaluation.supervisorScore?.toFixed(1) ?? "—"}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-primary/30">
                <CardContent className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">Nota Final</p>
                  <p className="text-2xl font-bold text-primary mt-1">
                    {evaluation.finalScore?.toFixed(1) ?? "—"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Criteria breakdown */}
            {evaluation.criteria.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-semibold">Critérios de Avaliação</h4>
                {evaluation.criteria.map((c) => (
                  <div key={c.name} className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{c.name}</span>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground">
                          Auto: <strong>{c.selfScore}</strong>
                        </span>
                        {c.supervisorScore !== undefined && (
                          <span className="text-muted-foreground">
                            Chefia: <strong>{c.supervisorScore}</strong>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Progress value={(c.selfScore / c.maxScore) * 100} className="h-1.5 flex-1" />
                      {c.supervisorScore !== undefined && (
                        <Progress value={(c.supervisorScore / c.maxScore) * 100} className="h-1.5 flex-1" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="approval" className="mt-4">
            <ApprovalTimeline steps={evaluation.approvalFlow} />
          </TabsContent>

          <TabsContent value="feedback" className="mt-4">
            {evaluation.employeeFeedback ? (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-primary" />
                    <span className="text-sm font-semibold">Parecer do Colaborador</span>
                    {evaluation.feedbackDate && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                        <Calendar className="h-3 w-3" />
                        {new Date(evaluation.feedbackDate).toLocaleDateString("pt-BR")}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "{evaluation.employeeFeedback}"
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Nenhum feedback registado ainda.</p>
                <p className="text-xs mt-1">O colaborador poderá dar o seu parecer após a conclusão do ciclo de aprovação.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
