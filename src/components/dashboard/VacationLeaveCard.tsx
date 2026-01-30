import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { vacationData, leaveData } from "@/data/hrMockData";
import { Palmtree, Calendar, FileText, User } from "lucide-react";

export function VacationLeaveCard() {
  return (
    <Card className="border-border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Férias e Licenças</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="vacation" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="vacation" className="gap-2">
              <Palmtree className="h-4 w-4" />
              Férias
            </TabsTrigger>
            <TabsTrigger value="leave" className="gap-2">
              <FileText className="h-4 w-4" />
              Licenças
            </TabsTrigger>
          </TabsList>

          <TabsContent value="vacation" className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-success-muted rounded-lg">
                <p className="text-2xl font-bold text-success">{vacationData.onVacation}</p>
                <p className="text-xs text-muted-foreground">Em férias</p>
              </div>
              <div className="text-center p-3 bg-info-muted rounded-lg">
                <p className="text-2xl font-bold text-info">{vacationData.scheduled}</p>
                <p className="text-xs text-muted-foreground">Agendadas</p>
              </div>
              <div className="text-center p-3 bg-warning-muted rounded-lg">
                <p className="text-2xl font-bold text-warning">{vacationData.pendingApproval}</p>
                <p className="text-xs text-muted-foreground">Pendentes</p>
              </div>
            </div>

            {/* Current vacations list */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Férias em curso</p>
              <div className="space-y-2 max-h-[180px] overflow-y-auto">
                {vacationData.currentVacations.map((v, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{v.name}</p>
                        <p className="text-xs text-muted-foreground">{v.department}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {v.daysRemaining} dias restantes
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="leave" className="space-y-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-destructive/10 rounded-lg">
                <p className="text-2xl font-bold text-destructive">{leaveData.medicalLeave}</p>
                <p className="text-xs text-muted-foreground">Médica</p>
              </div>
              <div className="text-center p-3 bg-info-muted rounded-lg">
                <p className="text-2xl font-bold text-info">{leaveData.maternityPaternity}</p>
                <p className="text-xs text-muted-foreground">Mat./Pat.</p>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <p className="text-2xl font-bold">{leaveData.other}</p>
                <p className="text-xs text-muted-foreground">Outras</p>
              </div>
            </div>

            {/* Active leaves list */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">Licenças ativas</p>
              <div className="space-y-2 max-h-[180px] overflow-y-auto">
                {leaveData.activeLeaves.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{l.name}</p>
                        <p className="text-xs text-muted-foreground">{l.type}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Retorno previsto</p>
                      <p className="text-sm font-medium">
                        {new Date(l.expectedReturn).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
