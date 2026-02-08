import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, RefreshCw, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface EvaluationHeaderProps {
  title?: string;
  subtitle?: string;
  showBack?: boolean;
  backTo?: string;
  onNewCycle?: () => void;
}

export function EvaluationHeader({
  title = "Avaliação de Desempenho",
  subtitle,
  showBack = false,
  backTo = "/avaliacoes",
  onNewCycle,
}: EvaluationHeaderProps) {
  return (
    <header className="border-b border-border bg-card px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showBack && (
            <Link to={backTo}>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
              <Badge variant="secondary" className="text-xs font-medium">
                Gestão de Desempenho
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {subtitle || `Gestão de ciclos e avaliações • ${new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/">
            <Button variant="ghost" size="sm">
              Dashboard RH
            </Button>
          </Link>
          {onNewCycle && (
            <Button size="sm" className="gap-2" onClick={onNewCycle}>
              <Plus className="h-4 w-4" />
              Novo Ciclo
            </Button>
          )}
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
