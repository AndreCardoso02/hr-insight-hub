import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EvaluationHeader } from "@/components/evaluation/EvaluationHeader";
import { CycleCard } from "@/components/evaluation/CycleCard";
import { CycleStatsCards } from "@/components/evaluation/CycleStatsCards";
import { DepartmentEvaluationTable } from "@/components/evaluation/DepartmentEvaluationTable";
import { TopPerformersCard } from "@/components/evaluation/TopPerformersCard";
import { EmployeeOfMonthCard } from "@/components/evaluation/EmployeeOfMonthCard";
import { EvaluationProgressChart } from "@/components/evaluation/EvaluationProgressChart";
import { EvaluationListTable } from "@/components/evaluation/EvaluationListTable";
import { EvaluationDetailModal } from "@/components/evaluation/EvaluationDetailModal";
import {
  evaluationCycles,
  departmentEvaluations,
  evaluations,
  Evaluation,
} from "@/data/evaluationMockData";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const EvaluationDashboard = () => {
  const navigate = useNavigate();
  const [selectedCycleId, setSelectedCycleId] = useState(evaluationCycles[0].id);
  const [selectedEvaluation, setSelectedEvaluation] = useState<Evaluation | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState<string | null>(null);

  const selectedCycle = evaluationCycles.find((c) => c.id === selectedCycleId) || evaluationCycles[0];

  const cycleEvaluations = evaluations.filter((e) => e.cycleId === selectedCycleId);
  const filteredEvaluations = departmentFilter
    ? cycleEvaluations.filter((e) => e.department === departmentFilter)
    : cycleEvaluations;

  const handleEvaluationClick = (evaluation: Evaluation) => {
    setSelectedEvaluation(evaluation);
    setModalOpen(true);
  };

  const handleDepartmentClick = (department: string) => {
    setDepartmentFilter(department);
  };

  return (
    <div className="min-h-screen bg-background">
      <EvaluationHeader
        showBack
        backTo="/"
        onNewCycle={() => {}}
      />

      <main className="p-6 space-y-6">
        {/* Cycles selector */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Ciclos de Avaliação</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evaluationCycles.map((cycle) => (
              <CycleCard
                key={cycle.id}
                cycle={cycle}
                onClick={() => {
                  setSelectedCycleId(cycle.id);
                  setDepartmentFilter(null);
                }}
              />
            ))}
          </div>
        </section>

        {/* Active cycle stats */}
        <CycleStatsCards cycle={selectedCycle} />

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="areas">Por Área</TabsTrigger>
            <TabsTrigger value="evaluations">Avaliações</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Charts */}
            <EvaluationProgressChart />

            {/* Top performers + Employee of month */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <TopPerformersCard />
              </div>
              <EmployeeOfMonthCard />
            </div>
          </TabsContent>

          <TabsContent value="areas" className="space-y-6">
            {departmentFilter && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtrando por:</span>
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-sm font-medium">
                  {departmentFilter}
                  <button
                    onClick={() => setDepartmentFilter(null)}
                    className="ml-1 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}

            <DepartmentEvaluationTable
              departments={departmentEvaluations}
              onDepartmentClick={handleDepartmentClick}
            />

            {departmentFilter && (
              <EvaluationListTable
                evaluations={filteredEvaluations}
                title={`Avaliações — ${departmentFilter}`}
                onEvaluationClick={handleEvaluationClick}
              />
            )}
          </TabsContent>

          <TabsContent value="evaluations" className="space-y-4">
            {departmentFilter && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filtrando por:</span>
                <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-2.5 py-1 rounded-full text-sm font-medium">
                  {departmentFilter}
                  <button
                    onClick={() => setDepartmentFilter(null)}
                    className="ml-1 hover:text-primary/70"
                  >
                    ×
                  </button>
                </span>
              </div>
            )}

            <EvaluationListTable
              evaluations={filteredEvaluations}
              title="Todas as Avaliações"
              onEvaluationClick={handleEvaluationClick}
            />
          </TabsContent>
        </Tabs>
      </main>

      <EvaluationDetailModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        evaluation={selectedEvaluation}
      />
    </div>
  );
};

export default EvaluationDashboard;
