import { useState } from "react";
import { Users, TrendingUp, Wallet, UserMinus } from "lucide-react";
import { PCAHeader } from "@/components/pca/PCAHeader";
import { ExecutiveKPICard } from "@/components/pca/ExecutiveKPICard";
import { ExecutiveKPIModal, ExecutiveKPIData } from "@/components/pca/ExecutiveKPIModal";
import { PerformanceRiskCard } from "@/components/pca/PerformanceRiskCard";
import { ComparativeCharts } from "@/components/pca/ComparativeCharts";
import { executiveKPIs } from "@/data/pcaMockData";

export default function PCADashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<ExecutiveKPIData | null>(null);

  const handleKPIClick = (kpiKey: "totalEmployees" | "averageCost" | "absenteeismRate" | "turnoverRate") => {
    let modalData: ExecutiveKPIData;
    
    switch (kpiKey) {
      case "totalEmployees": {
        const kpi = executiveKPIs.totalEmployees;
        modalData = {
          title: "Total de Colaboradores",
          currentValue: kpi.current.toLocaleString("pt-BR"),
          previousValue: kpi.previousPeriod.toLocaleString("pt-BR"),
          change: kpi.growthPercent,
          trend: kpi.trend,
          trendLabels: kpi.trendLabels,
          description: kpi.description,
          insight: kpi.insight,
        };
        break;
      }
      case "averageCost": {
        const kpi = executiveKPIs.averageCost;
        modalData = {
          title: "Custo Médio por Colaborador",
          currentValue: `€${kpi.current.toLocaleString("pt-BR")}`,
          previousValue: `€${kpi.previousPeriod.toLocaleString("pt-BR")}`,
          change: kpi.changePercent,
          trend: kpi.trend,
          trendLabels: kpi.trendLabels,
          description: kpi.description,
          insight: kpi.insight,
          unit: "€",
        };
        break;
      }
      case "absenteeismRate": {
        const kpi = executiveKPIs.absenteeismRate;
        modalData = {
          title: "Taxa de Absentismo",
          currentValue: `${kpi.current}%`,
          previousValue: `${kpi.previousPeriod}%`,
          change: kpi.changePercent,
          trend: kpi.trend,
          trendLabels: kpi.trendLabels,
          description: kpi.description,
          insight: kpi.insight,
          target: kpi.target,
          unit: "%",
        };
        break;
      }
      case "turnoverRate": {
        const kpi = executiveKPIs.turnoverRate;
        modalData = {
          title: "Taxa de Rotatividade",
          currentValue: `${kpi.current}%`,
          previousValue: `${kpi.previousPeriod}%`,
          change: kpi.changePercent,
          trend: kpi.trend,
          trendLabels: kpi.trendLabels,
          description: kpi.description,
          insight: kpi.insight,
        };
        break;
      }
      default:
        return;
    }
    
    setSelectedKPI(modalData);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PCAHeader />
      
      <main className="p-6 space-y-6">
        {/* Strategic KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <ExecutiveKPICard
            title="Total Colaboradores"
            value={executiveKPIs.totalEmployees.current.toLocaleString("pt-BR")}
            change={executiveKPIs.totalEmployees.growthPercent}
            changeLabel="vs semestre anterior"
            icon={<Users className="h-7 w-7" />}
            accentColor="blue"
            onClick={() => handleKPIClick("totalEmployees")}
          />
          <ExecutiveKPICard
            title="Custo Médio / Colaborador"
            value={`€${executiveKPIs.averageCost.current.toLocaleString("pt-BR")}`}
            subtitle="Mensal"
            change={executiveKPIs.averageCost.changePercent}
            changeLabel="vs período anterior"
            icon={<Wallet className="h-7 w-7" />}
            accentColor="amber"
            onClick={() => handleKPIClick("averageCost")}
          />
          <ExecutiveKPICard
            title="Taxa de Absentismo"
            value={`${executiveKPIs.absenteeismRate.current}%`}
            subtitle={`Meta: ${executiveKPIs.absenteeismRate.target}%`}
            change={executiveKPIs.absenteeismRate.changePercent}
            changeLabel="vs período anterior"
            icon={<TrendingUp className="h-7 w-7" />}
            accentColor="green"
            onClick={() => handleKPIClick("absenteeismRate")}
          />
          <ExecutiveKPICard
            title="Taxa de Rotatividade"
            value={`${executiveKPIs.turnoverRate.current}%`}
            subtitle="Mensal"
            change={executiveKPIs.turnoverRate.changePercent}
            changeLabel="vs período anterior"
            icon={<UserMinus className="h-7 w-7" />}
            accentColor="red"
            onClick={() => handleKPIClick("turnoverRate")}
          />
        </div>

        {/* Performance & Risk Indicators */}
        <PerformanceRiskCard />

        {/* Comparative Charts */}
        <ComparativeCharts />
      </main>

      {/* KPI Detail Modal */}
      <ExecutiveKPIModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        data={selectedKPI}
      />
    </div>
  );
}
