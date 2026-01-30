import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { recruitmentData } from "@/data/hrMockData";
import { Briefcase, Clock, AlertTriangle, ExternalLink, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface FunnelStageDetail {
  stage: string;
  count: number;
  color: string;
  description: string;
  avgTime: string;
  conversionRate: string;
}

const stageDetails: Record<string, Omit<FunnelStageDetail, "stage" | "count" | "color">> = {
  "Candidaturas": { description: "Candidatos que aplicaram para as vagas", avgTime: "1-2 dias", conversionRate: "45.6%" },
  "Triagem": { description: "Candidatos em análise de currículo e requisitos", avgTime: "3-5 dias", conversionRate: "50.0%" },
  "Entrevista RH": { description: "Entrevistas comportamentais em andamento", avgTime: "5-7 dias", conversionRate: "57.7%" },
  "Entrevista Técnica": { description: "Avaliação técnica com gestores da área", avgTime: "7-10 dias", conversionRate: "40.0%" },
  "Proposta": { description: "Propostas enviadas aguardando retorno", avgTime: "3-5 dias", conversionRate: "66.7%" },
  "Contratados": { description: "Candidatos que aceitaram a proposta", avgTime: "-", conversionRate: "100%" },
};

export function RecruitmentFunnel() {
  const [selectedStage, setSelectedStage] = useState<FunnelStageDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const maxCount = Math.max(...recruitmentData.funnel.map((s) => s.count));

  const handleStageClick = (stage: typeof recruitmentData.funnel[0]) => {
    const details = stageDetails[stage.stage];
    setSelectedStage({
      ...stage,
      description: details.description,
      avgTime: details.avgTime,
      conversionRate: details.conversionRate,
    });
    setModalOpen(true);
  };

  return (
    <>
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
            <div
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              title="Ver vagas urgentes"
            >
              <div className="p-2 rounded-lg bg-warning-muted">
                <AlertTriangle className="h-4 w-4 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Urgentes</p>
                <p className="font-semibold">{recruitmentData.urgentPositions}</p>
              </div>
            </div>
            <div
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
              title="Tempo médio de contratação"
            >
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
            {recruitmentData.funnel.map((stage) => (
              <div
                key={stage.stage}
                className="space-y-1 p-2 rounded-lg hover:bg-muted/50 transition-all cursor-pointer group"
                onClick={() => handleStageClick(stage)}
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium flex items-center gap-2">
                    {stage.stage}
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground" />
                  </span>
                  <span className="text-muted-foreground">{stage.count}</span>
                </div>
                <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 group-hover:brightness-110"
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              {selectedStage?.stage}
            </DialogTitle>
            <DialogDescription>{selectedStage?.description}</DialogDescription>
          </DialogHeader>
          {selectedStage && (
            <div className="space-y-4">
              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${selectedStage.color}20` }}
              >
                <p className="text-3xl font-bold" style={{ color: selectedStage.color }}>
                  {selectedStage.count}
                </p>
                <p className="text-sm text-muted-foreground">candidatos nesta etapa</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Tempo médio</p>
                  <p className="font-semibold">{selectedStage.avgTime}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground">Taxa de conversão</p>
                  <p className="font-semibold">{selectedStage.conversionRate}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
