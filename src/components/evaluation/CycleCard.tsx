import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Users, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { EvaluationCycle, CycleStatus } from "@/data/evaluationMockData";

interface CycleCardProps {
  cycle: EvaluationCycle;
  onClick: () => void;
}

const cycleStatusConfig: Record<CycleStatus, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  draft: { label: "Rascunho", variant: "secondary" },
  open: { label: "Aberto", variant: "default" },
  in_progress: { label: "Em Progresso", variant: "default" },
  closed: { label: "Encerrado", variant: "outline" },
};

export function CycleCard({ cycle, onClick }: CycleCardProps) {
  const config = cycleStatusConfig[cycle.status];
  const progress = Math.round((cycle.evaluatedCount / cycle.totalEmployees) * 100);

  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-primary/30 group"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-base group-hover:text-primary transition-colors">
              {cycle.name}
            </h3>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <Calendar className="h-3 w-3" />
              {new Date(cycle.startDate).toLocaleDateString("pt-BR")} — {new Date(cycle.endDate).toLocaleDateString("pt-BR")}
            </p>
          </div>
          <Badge variant={config.variant}>{config.label}</Badge>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-semibold">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              <div>
                <p className="text-xs text-muted-foreground">Concluídas</p>
                <p className="text-sm font-semibold">{cycle.evaluatedCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-warning" />
              <div>
                <p className="text-xs text-muted-foreground">Em curso</p>
                <p className="text-sm font-semibold">{cycle.inProgressCount}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Pendentes</p>
                <p className="text-sm font-semibold">{cycle.pendingCount}</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Users className="h-3 w-3" />
              {cycle.totalEmployees} colaboradores
            </span>
            <span className="text-xs text-muted-foreground">
              Criado por {cycle.createdBy}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
