import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { pt } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export interface FinancialFilterState {
  period: string;
  dateRange?: DateRange;
  department: string;
  costType: string;
}

interface FinancialFiltersProps {
  filters: FinancialFilterState;
  onFiltersChange: (filters: FinancialFilterState) => void;
}

const departments = [
  { value: "all", label: "Todos os Departamentos" },
  { value: "producao", label: "Produção" },
  { value: "comercial", label: "Comercial" },
  { value: "ti", label: "TI" },
  { value: "logistica", label: "Logística" },
  { value: "financeiro", label: "Financeiro" },
  { value: "marketing", label: "Marketing" },
  { value: "rh", label: "RH" },
  { value: "juridico", label: "Jurídico" },
];

const periods = [
  { value: "current-month", label: "Mês Atual" },
  { value: "last-month", label: "Mês Anterior" },
  { value: "quarter", label: "Trimestre" },
  { value: "year", label: "Ano" },
  { value: "custom", label: "Personalizado" },
];

const costTypes = [
  { value: "all", label: "Todos os Custos" },
  { value: "salarios", label: "Salários" },
  { value: "encargos", label: "Encargos Sociais" },
  { value: "ajudas", label: "Ajudas de Custo" },
  { value: "patrimonio", label: "Patrimônio" },
];

export function FinancialFilters({ filters, onFiltersChange }: FinancialFiltersProps) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const activeFiltersCount = [
    filters.period !== "current-month",
    filters.department !== "all",
    filters.costType !== "all",
  ].filter(Boolean).length;

  const handlePeriodChange = (value: string) => {
    onFiltersChange({ ...filters, period: value });
    if (value === "custom") {
      setCalendarOpen(true);
    }
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    onFiltersChange({ ...filters, dateRange: range });
  };

  const clearFilters = () => {
    onFiltersChange({
      period: "current-month",
      department: "all",
      costType: "all",
      dateRange: undefined,
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Filter className="h-4 w-4" />
        <span>Filtros:</span>
      </div>

      {/* Period Filter */}
      <Select value={filters.period} onValueChange={handlePeriodChange}>
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="Período" />
        </SelectTrigger>
        <SelectContent>
          {periods.map((period) => (
            <SelectItem key={period.value} value={period.value}>
              {period.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Custom Date Range */}
      {filters.period === "custom" && (
        <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "justify-start text-left font-normal h-9",
                !filters.dateRange && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {filters.dateRange?.from ? (
                filters.dateRange.to ? (
                  <>
                    {format(filters.dateRange.from, "dd/MM/yy", { locale: pt })} -{" "}
                    {format(filters.dateRange.to, "dd/MM/yy", { locale: pt })}
                  </>
                ) : (
                  format(filters.dateRange.from, "dd/MM/yyyy", { locale: pt })
                )
              ) : (
                <span>Selecionar datas</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={filters.dateRange?.from}
              selected={filters.dateRange}
              onSelect={handleDateRangeSelect}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}

      {/* Department Filter */}
      <Select
        value={filters.department}
        onValueChange={(value) => onFiltersChange({ ...filters, department: value })}
      >
        <SelectTrigger className="w-[180px] h-9">
          <SelectValue placeholder="Departamento" />
        </SelectTrigger>
        <SelectContent>
          {departments.map((dept) => (
            <SelectItem key={dept.value} value={dept.value}>
              {dept.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Cost Type Filter */}
      <Select
        value={filters.costType}
        onValueChange={(value) => onFiltersChange({ ...filters, costType: value })}
      >
        <SelectTrigger className="w-[160px] h-9">
          <SelectValue placeholder="Tipo de Custo" />
        </SelectTrigger>
        <SelectContent>
          {costTypes.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Active Filters Indicator */}
      {activeFiltersCount > 0 && (
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            {activeFiltersCount} filtro{activeFiltersCount > 1 ? "s" : ""} ativo{activeFiltersCount > 1 ? "s" : ""}
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        </div>
      )}
    </div>
  );
}
