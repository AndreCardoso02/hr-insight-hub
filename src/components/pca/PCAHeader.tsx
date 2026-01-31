import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, RefreshCw, ArrowLeft, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export function PCAHeader() {
  return (
    <header className="border-b border-border bg-card px-6 py-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">Dashboard Executivo</h1>
              <Badge variant="secondary" className="text-xs font-medium">
                PCA / Direção
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Visão estratégica consolidada • {new Date().toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/financeiro">
            <Button variant="default" size="sm" className="gap-2">
              <Wallet className="h-4 w-4" />
              Financeiro
            </Button>
          </Link>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Relatório Executivo
          </Button>
          <Button variant="outline" size="icon" className="h-9 w-9">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
