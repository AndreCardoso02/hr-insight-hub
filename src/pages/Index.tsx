import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { KPICard } from "@/components/dashboard/KPICard";
import { AbsenteeismChart } from "@/components/dashboard/AbsenteeismChart";
import { TurnoverChart } from "@/components/dashboard/TurnoverChart";
import { RecruitmentFunnel } from "@/components/dashboard/RecruitmentFunnel";
import { VacationLeaveCard } from "@/components/dashboard/VacationLeaveCard";
import { PerformanceCard } from "@/components/dashboard/PerformanceCard";
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
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

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
          />
          <KPICard
            title="Admissões (30 dias)"
            value={admissionsExits.last30Days.admissions}
            subtitle={`${admissionsExits.last90Days.admissions} nos últimos 90 dias`}
            trend={8.5}
            trendLabel="vs período anterior"
            icon={<UserPlus className="h-6 w-6" />}
            variant="success"
          />
          <KPICard
            title="Desligamentos (30 dias)"
            value={admissionsExits.last30Days.exits}
            subtitle={`${admissionsExits.last90Days.exits} nos últimos 90 dias`}
            trend={-15.2}
            trendLabel="vs período anterior"
            icon={<UserMinus className="h-6 w-6" />}
            variant="warning"
          />
          <KPICard
            title="Taxa de Absentismo"
            value={`${absenteeismRates.month}%`}
            subtitle={`Hoje: ${absenteeismRates.today}% • Acumulado: ${absenteeismRates.accumulated}%`}
            trend={absenteeismRates.trendVsLastMonth}
            trendLabel="vs mês anterior"
            icon={<Clock className="h-6 w-6" />}
            variant={absenteeismRates.month > 4 ? "destructive" : "default"}
          />
        </section>

        {/* Secondary KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2 bg-card rounded-lg border border-border p-4">
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
          <div className="bg-card rounded-lg border border-border p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Turnover Mensal
            </p>
            <p className="text-3xl font-bold">1.9%</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <TrendingDown className="h-3 w-3 text-success" />
              <span className="text-success">-0.3%</span> vs mês anterior
            </p>
          </div>
          <div className="bg-card rounded-lg border border-border p-4">
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
    </div>
  );
};

export default Index;
