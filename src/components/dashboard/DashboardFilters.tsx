import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Building2, Users, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";

export interface FilterState {
  period: string;
  department: string;
  status: string;
  dateRange?: {
    from: Date | undefined;
    to: Date | undefined;
  };
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

const departments = [
  { value: "all", label: "Todos os Departamentos" },
  { value: "ti", label: "TI" },
  { value: "comercial", label: "Comercial" },
  { value: "financeiro", label: "Financeiro" },
  { value: "rh", label: "RH" },
  { value: "marketing", label: "Marketing" },
  { value: "producao", label: "Produção" },
  { value: "logistica", label: "Logística" },
  { value: "juridico", label: "Jurídico" },
];

const periods = [
  { value: "7d", label: "Últimos 7 dias" },
  { value: "30d", label: "Últimos 30 dias" },
  { value: "90d", label: "Últimos 90 dias" },
  { value: "12m", label: "Últimos 12 meses" },
  { value: "ytd", label: "Ano atual" },
  { value: "custom", label: "Personalizado" },
];

const statuses = [
  { value: "all", label: "Todos os Status" },
  { value: "active", label: "Ativos" },
  { value: "suspended", label: "Suspensos" },
  { value: "terminated", label: "Desligados" },
];

export function DashboardFilters({ filters, onFiltersChange }: DashboardFiltersProps) {
  const [dateOpen, setDateOpen] = useState(false);

  const activeFiltersCount = [
    filters.period !== "30d",
    filters.department !== "all",
    filters.status !== "all",
  ].filter(Boolean).length;

  const handleClearFilters = () => {
    onFiltersChange({
      period: "30d",
      department: "all",
      status: "all",
      dateRange: undefined,
    });
  };

  const getPeriodLabel = () => {
    if (filters.period === "custom" && filters.dateRange?.from) {
      const from = format(filters.dateRange.from, "dd/MM", { locale: ptBR });
      const to = filters.dateRange.to
        ? format(filters.dateRange.to, "dd/MM", { locale: ptBR })
        : "...";
      return `${from} - ${to}`;
    }
    return periods.find((p) => p.value === filters.period)?.label || "Período";
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Period Filter */}
      <Popover open={dateOpen} onOpenChange={setDateOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className={cn(
              "gap-2",
              filters.period !== "30d" && "border-primary text-primary"
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {getPeriodLabel()}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b border-border">
            <Select
              value={filters.period}
              onValueChange={(value) => {
                onFiltersChange({ ...filters, period: value });
                if (value !== "custom") setDateOpen(false);
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {periods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {filters.period === "custom" && (
            <Calendar
              mode="range"
              selected={{
                from: filters.dateRange?.from,
                to: filters.dateRange?.to,
              }}
              onSelect={(range) => {
                onFiltersChange({
                  ...filters,
                  dateRange: { from: range?.from, to: range?.to },
                });
              }}
              locale={ptBR}
              numberOfMonths={2}
              className="p-3"
            />
          )}
        </PopoverContent>
      </Popover>

      {/* Department Filter */}
      <Select
        value={filters.department}
        onValueChange={(value) => onFiltersChange({ ...filters, department: value })}
      >
        <SelectTrigger
          className={cn(
            "w-auto gap-2",
            filters.department !== "all" && "border-primary text-primary"
          )}
        >
          <Building2 className="h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept.value} value={dept.value}>
              {dept.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={filters.status}
        onValueChange={(value) => onFiltersChange({ ...filters, status: value })}
      >
        <SelectTrigger
          className={cn(
            "w-auto gap-2",
            filters.status !== "all" && "border-primary text-primary"
          )}
        >
          <Users className="h-4 w-4" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {statuses.map((status) => (
            <SelectItem key={status.value} value={status.value}>
              {status.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active Filters Badge & Clear */}
      {activeFiltersCount > 0 && (
        <>
          <Badge variant="secondary" className="gap-1">
            <Filter className="h-3 w-3" />
            {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} ativo
            {activeFiltersCount > 1 ? "s" : ""}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
            className="gap-1 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
            Limpar
          </Button>
        </>
      )}
    </div>
  );
}
