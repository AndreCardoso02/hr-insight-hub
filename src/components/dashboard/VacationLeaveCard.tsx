import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { vacationData, leaveData } from "@/data/hrMockData";
import { Palmtree, Calendar, FileText, User, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface PersonDetail {
  name: string;
  department: string;
  type: "vacation" | "leave";
  startDate?: string;
  endDate?: string;
  daysRemaining?: number;
  expectedReturn?: string;
  leaveType?: string;
}

export function VacationLeaveCard() {
  const [selectedPerson, setSelectedPerson] = useState<PersonDetail | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handlePersonClick = (person: PersonDetail) => {
    setSelectedPerson(person);
    setModalOpen(true);
  };

  return (
    <>
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
                <div className="text-center p-3 bg-success-muted rounded-lg hover:brightness-95 transition-all cursor-pointer">
                  <p className="text-2xl font-bold text-success">{vacationData.onVacation}</p>
                  <p className="text-xs text-muted-foreground">Em férias</p>
                </div>
                <div className="text-center p-3 bg-info-muted rounded-lg hover:brightness-95 transition-all cursor-pointer">
                  <p className="text-2xl font-bold text-info">{vacationData.scheduled}</p>
                  <p className="text-xs text-muted-foreground">Agendadas</p>
                </div>
                <div className="text-center p-3 bg-warning-muted rounded-lg hover:brightness-95 transition-all cursor-pointer">
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
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                      onClick={() =>
                        handlePersonClick({
                          name: v.name,
                          department: v.department,
                          type: "vacation",
                          startDate: v.startDate,
                          endDate: v.endDate,
                          daysRemaining: v.daysRemaining,
                        })
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{v.name}</p>
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
                <div className="text-center p-3 bg-destructive/10 rounded-lg hover:brightness-95 transition-all cursor-pointer">
                  <p className="text-2xl font-bold text-destructive">{leaveData.medicalLeave}</p>
                  <p className="text-xs text-muted-foreground">Médica</p>
                </div>
                <div className="text-center p-3 bg-info-muted rounded-lg hover:brightness-95 transition-all cursor-pointer">
                  <p className="text-2xl font-bold text-info">{leaveData.maternityPaternity}</p>
                  <p className="text-xs text-muted-foreground">Mat./Pat.</p>
                </div>
                <div className="text-center p-3 bg-muted rounded-lg hover:brightness-95 transition-all cursor-pointer">
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
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer group"
                      onClick={() =>
                        handlePersonClick({
                          name: l.name,
                          department: l.department,
                          type: "leave",
                          expectedReturn: l.expectedReturn,
                          leaveType: l.type,
                        })
                      }
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <User className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium group-hover:text-primary transition-colors">{l.name}</p>
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

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {selectedPerson?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedPerson?.type === "vacation" ? "Detalhes das férias" : "Detalhes da licença"}
            </DialogDescription>
          </DialogHeader>
          {selectedPerson && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">{selectedPerson.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedPerson.department}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {selectedPerson.type === "vacation" ? (
                  <>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Início
                      </p>
                      <p className="font-medium">
                        {new Date(selectedPerson.startDate!).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Término
                      </p>
                      <p className="font-medium">
                        {new Date(selectedPerson.endDate!).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                    <div className="col-span-2 p-3 bg-success-muted rounded-lg text-center">
                      <p className="text-2xl font-bold text-success">
                        {selectedPerson.daysRemaining}
                      </p>
                      <p className="text-xs text-muted-foreground">dias restantes</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground">Tipo de licença</p>
                      <p className="font-medium">{selectedPerson.leaveType}</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" /> Retorno previsto
                      </p>
                      <p className="font-medium">
                        {new Date(selectedPerson.expectedReturn!).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <div className="flex-1 p-2 bg-muted/30 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-muted transition-colors">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Email</span>
                </div>
                <div className="flex-1 p-2 bg-muted/30 rounded-lg flex items-center justify-center gap-2 cursor-pointer hover:bg-muted transition-colors">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">Telefone</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
