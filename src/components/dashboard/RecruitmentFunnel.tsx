import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recruitmentData } from "@/data/hrMockData";
import { Briefcase, Clock, AlertTriangle } from "lucide-react";

export function RecruitmentFunnel() {
  const maxCount = Math.max(...recruitmentData.funnel.map((s) => s.count));

  return (
    <Card className="border-border">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recrutamento e Seleção</CardTitle>
          <Badge variant="outline" className="gap-1">
            <Briefcase className="h-3 w-3" />
            {recruitmentData.openPositions} vagas abertas
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-warning-muted">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Urgentes</p>
              <p className="font-semibold">{recruitmentData.urgentPositions}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-info-muted">
              <Clock className="h-4 w-4 text-info" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Tempo médio</p>
              <p className="font-semibold">{recruitmentData.avgTimeToHire} dias</p>
            </div>
          </div>
        </div>

        {/* Funnel */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Funil de Candidaturas</p>
          {recruitmentData.funnel.map((stage, index) => (
            <div key={stage.stage} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{stage.stage}</span>
                <span className="text-muted-foreground">{stage.count}</span>
              </div>
              <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(stage.count / maxCount) * 100}%`,
                    backgroundColor: stage.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
