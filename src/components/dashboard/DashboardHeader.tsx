import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Settings } from "lucide-react";
import { DashboardFilters, FilterState } from "./DashboardFilters";

interface DashboardHeaderProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function DashboardHeader({ filters, onFiltersChange }: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard de RH</h1>
            <p className="text-sm text-muted-foreground">
              Visão geral do capital humano • Atualizado em{" "}
              {new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Exportar
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <DashboardFilters filters={filters} onFiltersChange={onFiltersChange} />
      </div>
    </header>
  );
}
