import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { AbsenteeismChart } from "@/components/dashboard/AbsenteeismChart";
import { TurnoverChart } from "@/components/dashboard/TurnoverChart";
import { RecruitmentFunnel } from "@/components/dashboard/RecruitmentFunnel";
import { VacationLeaveCard } from "@/components/dashboard/VacationLeaveCard";
import { PerformanceCard } from "@/components/dashboard/PerformanceCard";
import { KPIDetailModal, KPIDetailData } from "@/components/dashboard/KPIDetailModal";
import { FilterState } from "@/components/dashboard/DashboardFilters";
import {
  employeeStats,
  admissionsExits,
  absenteeismRates,
} from "@/data/hrMockData";
import {
  Users,
  UserPlus,
  UserMinus,
  Clock,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const Index = () => {
  const [filters, setFilters] = useState<FilterState>({
    period: "30d",
    department: "all",
    status: "all",
  });

  const [selectedKPI, setSelectedKPI] = useState<KPIDetailData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleKPIClick = (kpiType: string) => {
    let data: KPIDetailData;

    switch (kpiType) {
      case "employees":
        data = {
          title: "Total de Funcionários",
          value: employeeStats.total.toLocaleString("pt-BR"),
          description: "Visão detalhada do quadro de funcionários da empresa",
          trend: employeeStats.trendVsLastMonth,
          trendLabel: "vs mês anterior",
          lastUpdated: "Hoje, 09:00",
          breakdown: [
            { label: "Ativos", value: employeeStats.active, variant: "success" },
            { label: "Suspensos", value: employeeStats.suspended, variant: "warning" },
            { label: "Desligados", value: employeeStats.terminated, variant: "destructive" },
          ],
          insights: [
            "O quadro de funcionários cresceu 2.3% no último mês",
            "23 funcionários estão temporariamente suspensos",
            "A taxa de retenção está acima da meta de 95%",
          ],
        };
        break;
      case "admissions":
        data = {
          title: "Admissões",
          value: admissionsExits.last30Days.admissions,
          description: "Novas contratações realizadas no período",
          trend: 8.5,
          trendLabel: "vs período anterior",
          lastUpdated: "Hoje, 09:00",
          breakdown: [
            { label: "Últimos 30 dias", value: admissionsExits.last30Days.admissions, variant: "success" },
            { label: "Últimos 90 dias", value: admissionsExits.last90Days.admissions, variant: "info" },
            { label: "Média mensal", value: Math.round(admissionsExits.last90Days.admissions / 3), variant: "default" },
          ],
          insights: [
            "Aumento de 8.5% nas contratações em relação ao período anterior",
            "Departamento de TI lidera com 12 novas contratações",
            "Tempo médio de contratação: 32 dias",
          ],
        };
        break;
      case "exits":
        data = {
          title: "Desligamentos",
          value: admissionsExits.last30Days.exits,
          description: "Saídas registradas no período",
          trend: -15.2,
          trendLabel: "vs período anterior",
          lastUpdated: "Hoje, 09:00",
          breakdown: [
            { label: "Últimos 30 dias", value: admissionsExits.last30Days.exits, variant: "warning" },
            { label: "Últimos 90 dias", value: admissionsExits.last90Days.exits, variant: "info" },
            { label: "Voluntários", value: 8, subValue: "66.7%", variant: "default" },
            { label: "Involuntários", value: 4, subValue: "33.3%", variant: "destructive" },
          ],
          insights: [
            "Redução de 15.2% nos desligamentos - tendência positiva",
            "Maioria das saídas voluntárias por melhores oportunidades",
            "Departamento comercial com maior índice de saída",
          ],
        };
        break;
      case "absenteeism":
        data = {
          title: "Taxa de Absentismo",
          value: `${absenteeismRates.month}%`,
          description: "Índice de ausências não programadas",
          trend: absenteeismRates.trendVsLastMonth,
          trendLabel: "vs mês anterior",
          lastUpdated: "Hoje, 09:00",
          breakdown: [
            { label: "Hoje", value: `${absenteeismRates.today}%`, variant: absenteeismRates.today > 4 ? "destructive" : "success" },
            { label: "Mês atual", value: `${absenteeismRates.month}%`, variant: absenteeismRates.month > 4 ? "warning" : "success" },
            { label: "Acumulado", value: `${absenteeismRates.accumulated}%`, variant: "info" },
            { label: "Meta", value: "3.5%", variant: "default" },
          ],
          insights: [
            "Taxa atual de 4.1% está 0.6% acima da meta",
            "Segunda-feira é o dia com maior índice de ausências",
            "Produção e Logística são os setores mais impactados",
          ],
        };
        break;
      default:
        return;
    }

    setSelectedKPI(data);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader filters={filters} onFiltersChange={setFilters} />

      <main className="p-6 space-y-6">
        {/* KPI Cards Row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total de Funcionários"
            value={employeeStats.total.toLocaleString("pt-BR")}
            subtitle={`${employeeStats.active} ativos • ${employeeStats.suspended} suspensos • ${employeeStats.terminated} desligados`}
            trend={employeeStats.trendVsLastMonth}
            trendLabel="vs mês anterior"
            icon={<Users className="h-6 w-6" />}
            variant="info"
            onClick={() => handleKPIClick("employees")}
          />
          <KPICard
            title="Admissões (30 dias)"
            value={admissionsExits.last30Days.admissions}
            subtitle={`${admissionsExits.last90Days.admissions} nos últimos 90 dias`}
            trend={8.5}
            trendLabel="vs período anterior"
            icon={<UserPlus className="h-6 w-6" />}
            variant="success"
            onClick={() => handleKPIClick("admissions")}
          />
          <KPICard
            title="Desligamentos (30 dias)"
            value={admissionsExits.last30Days.exits}
            subtitle={`${admissionsExits.last90Days.exits} nos últimos 90 dias`}
            trend={-15.2}
            trendLabel="vs período anterior"
            icon={<UserMinus className="h-6 w-6" />}
            variant="warning"
            onClick={() => handleKPIClick("exits")}
          />
          <KPICard
            title="Taxa de Absentismo"
            value={`${absenteeismRates.month}%`}
            subtitle={`Hoje: ${absenteeismRates.today}% • Acumulado: ${absenteeismRates.accumulated}%`}
            trend={absenteeismRates.trendVsLastMonth}
            trendLabel="vs mês anterior"
            icon={<Clock className="h-6 w-6" />}
            variant={absenteeismRates.month > 4 ? "destructive" : "default"}
            onClick={() => handleKPIClick("absenteeism")}
          />
        </section>

        {/* Secondary KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Saldo Líquido (30 dias)
                </p>
                <p className="text-3xl font-bold text-success flex items-center gap-2">
                  <TrendingUp className="h-6 w-6" />+{admissionsExits.last30Days.net}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-muted-foreground">
                  Saldo Líquido (90 dias)
                </p>
                <p className="text-3xl font-bold text-success flex items-center justify-end gap-2">
                  +{admissionsExits.last90Days.net}
                  <TrendingUp className="h-6 w-6" />
                </p>
              </div>
            </div>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground">
              Turnover Mensal
            </p>
            <p className="text-3xl font-bold">1.9%</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-success" />
              <span className="text-success">-0.3%</span> vs mês anterior
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-shadow cursor-pointer">
            <p className="text-sm font-medium text-muted-foreground">
              Headcount Previsto
            </p>
            <p className="text-3xl font-bold">1,320</p>
            <p className="text-sm text-muted-foreground">
              Meta para Q2 2026
            </p>
          </div>
        </section>

        {/* Charts Row */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AbsenteeismChart />
          <TurnoverChart />
        </section>

        {/* Cards Row */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <RecruitmentFunnel />
          <VacationLeaveCard />
          <PerformanceCard />
        </section>
      </main>

      <KPIDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        data={selectedKPI}
      />
    </div>
  );
};

export default Index;
