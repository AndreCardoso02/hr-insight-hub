import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { CheckCircle2, Clock, AlertTriangle, CreditCard } from "lucide-react";
import { payrollProcessing } from "@/data/financialMockData";
import { cn } from "@/lib/utils";

export function PayrollProcessingCard() {
  const [selectedStatus, setSelectedStatus] = useState<"completed" | "pending" | "error" | null>(null);

  const totalPayments = payrollProcessing.completed.count + payrollProcessing.pending.count + payrollProcessing.error.count;

  const getStatusDetails = () => {
    if (!selectedStatus) return null;
    const data = payrollProcessing[selectedStatus];
    return {
      completed: {
        title: "Pagamentos Concluídos",
        description: "Todos os pagamentos processados com sucesso",
        icon: <CheckCircle2 className="h-5 w-5 text-success" />,
        color: "text-success",
      },
      pending: {
        title: "Pagamentos Pendentes",
        description: "Pagamentos aguardando processamento",
        icon: <Clock className="h-5 w-5 text-warning" />,
        color: "text-warning",
      },
      error: {
        title: "Pagamentos com Erro",
        description: "Pagamentos que requerem atenção",
        icon: <AlertTriangle className="h-5 w-5 text-destructive" />,
        color: "text-destructive",
      },
    }[selectedStatus];
  };

  const statusDetails = getStatusDetails();

  return (
    <>
      <Card className="border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-primary" />
            Processamento Salarial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress Overview */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progresso do mês</span>
              <span className="font-medium">{payrollProcessing.completed.percent}%</span>
            </div>
            <Progress value={payrollProcessing.completed.percent} className="h-2" />
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-3 gap-3">
            {/* Completed */}
            <div
              className="p-3 bg-success/10 rounded-lg cursor-pointer hover:bg-success/20 transition-colors"
              onClick={() => setSelectedStatus("completed")}
            >
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="h-4 w-4 text-success" />
                <span className="text-xs font-medium text-success">Concluídos</span>
              </div>
              <p className="text-2xl font-bold">{payrollProcessing.completed.count}</p>
              <p className="text-xs text-muted-foreground">
                €{(payrollProcessing.completed.amount / 1000000).toFixed(2)}M
              </p>
            </div>

            {/* Pending */}
            <div
              className="p-3 bg-warning/10 rounded-lg cursor-pointer hover:bg-warning/20 transition-colors"
              onClick={() => setSelectedStatus("pending")}
            >
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-warning" />
                <span className="text-xs font-medium text-warning">Pendentes</span>
              </div>
              <p className="text-2xl font-bold">{payrollProcessing.pending.count}</p>
              <p className="text-xs text-muted-foreground">
                €{(payrollProcessing.pending.amount / 1000).toFixed(1)}k
              </p>
            </div>

            {/* Error */}
            <div
              className="p-3 bg-destructive/10 rounded-lg cursor-pointer hover:bg-destructive/20 transition-colors"
              onClick={() => setSelectedStatus("error")}
            >
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 text-destructive" />
                <span className="text-xs font-medium text-destructive">Erros</span>
              </div>
              <p className="text-2xl font-bold">{payrollProcessing.error.count}</p>
              <p className="text-xs text-muted-foreground">
                €{(payrollProcessing.error.amount / 1000).toFixed(1)}k
              </p>
            </div>
          </div>

          {/* Summary */}
          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Total de pagamentos</span>
              <Badge variant="secondary">{totalPayments}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={selectedStatus !== null} onOpenChange={() => setSelectedStatus(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {statusDetails?.icon}
              {statusDetails?.title}
            </DialogTitle>
            <DialogDescription>{statusDetails?.description}</DialogDescription>
          </DialogHeader>

          {selectedStatus && selectedStatus !== "completed" && (
            <div className="space-y-4 mt-4">
              <h4 className="text-sm font-medium text-muted-foreground">Motivos</h4>
              <div className="space-y-2">
                {payrollProcessing[selectedStatus].reasons.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <span className="text-sm">{item.reason}</span>
                    <Badge variant="outline">{item.count}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedStatus === "completed" && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-success/10 rounded-lg">
                <p className="text-3xl font-bold text-success">
                  €{payrollProcessing.completed.amount.toLocaleString("pt-BR")}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Total processado com sucesso
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                {payrollProcessing.completed.count} colaboradores receberam o pagamento corretamente.
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
