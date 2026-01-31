import { useState } from "react";
import { Wallet, Receipt, HandCoins, Calculator } from "lucide-react";
import { FinancialHeader } from "@/components/financial/FinancialHeader";
import { FinancialFilterState } from "@/components/financial/FinancialFilters";
import { FinancialKPICard } from "@/components/financial/FinancialKPICard";
import { FinancialKPIModal, FinancialKPIData } from "@/components/financial/FinancialKPIModal";
import { PayrollEvolutionChart } from "@/components/financial/PayrollEvolutionChart";
import { CostDistributionChart } from "@/components/financial/CostDistributionChart";
import { BudgetComparisonChart } from "@/components/financial/BudgetComparisonChart";
import { PayrollProcessingCard } from "@/components/financial/PayrollProcessingCard";
import { AssetManagementCard } from "@/components/financial/AssetManagementCard";
import { payrollKPIs } from "@/data/financialMockData";

export default function FinancialDashboard() {
  const [filters, setFilters] = useState<FinancialFilterState>({
    period: "current-month",
    department: "all",
    costType: "all",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedKPI, setSelectedKPI] = useState<FinancialKPIData | null>(null);

  const handleKPIClick = (kpiKey: "currentPayroll" | "socialCharges" | "allowances" | "totalCost") => {
    let modalData: FinancialKPIData;

    switch (kpiKey) {
      case "currentPayroll": {
        const kpi = payrollKPIs.currentPayroll;
        modalData = {
          title: "Massa Salarial",
          currentValue: `€${kpi.value.toLocaleString("pt-BR")}`,
          previousValue: `€${kpi.previousMonth.toLocaleString("pt-BR")}`,
          change: kpi.changePercent,
          breakdown: kpi.byDepartment,
          trend: kpi.trend,
          trendLabels: kpi.trendLabels,
          insights: kpi.insights,
        };
        break;
      }
      case "socialCharges": {
        const kpi = payrollKPIs.socialCharges;
        modalData = {
          title: "Encargos Sociais e Impostos",
          currentValue: `€${kpi.value.toLocaleString("pt-BR")}`,
          previousValue: `€${kpi.previousMonth.toLocaleString("pt-BR")}`,
          change: kpi.changePercent,
          breakdown: kpi.breakdown,
          trend: kpi.trend,
          trendLabels: kpi.trendLabels,
          insights: kpi.insights,
        };
        break;
      }
      case "allowances": {
        const kpi = payrollKPIs.allowances;
        modalData = {
          title: "Ajudas de Custo",
          currentValue: `€${kpi.value.toLocaleString("pt-BR")}`,
          previousValue: `€${kpi.previousMonth.toLocaleString("pt-BR")}`,
          change: kpi.changePercent,
          breakdown: kpi.breakdown,
          trend: kpi.trend,
          trendLabels: kpi.trendLabels,
          insights: kpi.insights,
        };
        break;
      }
      case "totalCost": {
        const kpi = payrollKPIs.totalCost;
        modalData = {
          title: "Custo Total com Pessoal",
          currentValue: `€${kpi.value.toLocaleString("pt-BR")}`,
          previousValue: `€${kpi.previousMonth.toLocaleString("pt-BR")}`,
          change: kpi.changePercent,
          breakdown: [
            { name: "Salários", value: payrollKPIs.currentPayroll.value, percent: (payrollKPIs.currentPayroll.value / kpi.value) * 100 },
            { name: "Encargos", value: payrollKPIs.socialCharges.value, percent: (payrollKPIs.socialCharges.value / kpi.value) * 100 },
            { name: "Ajudas de Custo", value: payrollKPIs.allowances.value, percent: (payrollKPIs.allowances.value / kpi.value) * 100 },
          ],
          trend: [6775000, 6815500, 6869500, 6905000, 6960000, 7038000],
          trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
          insights: [
            `Desvio de ${kpi.budgetVariance > 0 ? "+" : ""}${kpi.budgetVariance}% em relação ao orçamento`,
            `Orçamento previsto: €${kpi.budget.toLocaleString("pt-BR")}`,
            "Custos dentro do esperado para o período",
          ],
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
      <FinancialHeader filters={filters} onFiltersChange={setFilters} />

      <main className="p-6 space-y-6">
        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          <FinancialKPICard
            title="Massa Salarial"
            value={`€${(payrollKPIs.currentPayroll.value / 1000000).toFixed(2)}M`}
            subtitle="Mês atual"
            change={payrollKPIs.currentPayroll.changePercent}
            changeLabel="vs mês anterior"
            icon={<Wallet className="h-6 w-6" />}
            variant="primary"
            tooltip="Total de salários pagos no mês, incluindo subsídios fixos"
            onClick={() => handleKPIClick("currentPayroll")}
          />
          <FinancialKPICard
            title="Encargos Sociais"
            value={`€${(payrollKPIs.socialCharges.value / 1000000).toFixed(2)}M`}
            subtitle="TSU, IRS e outros"
            change={payrollKPIs.socialCharges.changePercent}
            changeLabel="vs mês anterior"
            icon={<Receipt className="h-6 w-6" />}
            variant="warning"
            tooltip="Contribuições para Segurança Social, retenções de IRS e seguros"
            onClick={() => handleKPIClick("socialCharges")}
          />
          <FinancialKPICard
            title="Ajudas de Custo"
            value={`€${(payrollKPIs.allowances.value / 1000).toFixed(0)}k`}
            subtitle="Alimentação, transporte, viagens"
            change={payrollKPIs.allowances.changePercent}
            changeLabel="vs mês anterior"
            icon={<HandCoins className="h-6 w-6" />}
            variant="danger"
            tooltip="Subsídios variáveis: alimentação, transporte e deslocações"
            onClick={() => handleKPIClick("allowances")}
          />
          <FinancialKPICard
            title="Custo Total"
            value={`€${(payrollKPIs.totalCost.value / 1000000).toFixed(2)}M`}
            subtitle={`Orçamento: €${(payrollKPIs.totalCost.budget / 1000000).toFixed(2)}M`}
            change={payrollKPIs.totalCost.changePercent}
            changeLabel="vs mês anterior"
            icon={<Calculator className="h-6 w-6" />}
            variant="success"
            tooltip="Soma de todos os custos com pessoal no período"
            onClick={() => handleKPIClick("totalCost")}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PayrollEvolutionChart />
          </div>
          <CostDistributionChart />
        </div>

        {/* Budget Comparison */}
        <BudgetComparisonChart />

        {/* Functional Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PayrollProcessingCard />
          <AssetManagementCard />
        </div>
      </main>

      {/* KPI Detail Modal */}
      <FinancialKPIModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        data={selectedKPI}
      />
    </div>
  );
}
