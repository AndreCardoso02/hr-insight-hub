import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Award, TrendingUp } from "lucide-react";
import { employeeOfMonth } from "@/data/evaluationMockData";

export function EmployeeOfMonthCard() {
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-accent/30">
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Award className="h-5 w-5 text-warning" />
          <h3 className="font-semibold text-lg">Colaborador do Mês</h3>
          <Badge className="bg-warning/10 text-warning border-warning/20 text-xs">
            Fevereiro 2026
          </Badge>
        </div>

        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-xl font-bold text-primary">
            {employeeOfMonth.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-lg">{employeeOfMonth.name}</h4>
            <p className="text-sm text-muted-foreground">
              {employeeOfMonth.position} • {employeeOfMonth.department}
            </p>
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-3.5 w-3.5 ${i < Math.floor(employeeOfMonth.score) ? "text-warning fill-warning" : "text-muted"}`}
                />
              ))}
              <span className="text-sm font-bold ml-1">{employeeOfMonth.score}</span>
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Destaques</p>
          {employeeOfMonth.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-success mt-0.5 shrink-0" />
              <p className="text-sm">{h}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Evolução de Notas</p>
          <div className="flex items-end gap-1.5 h-10">
            {employeeOfMonth.previousScores.map((score, i) => (
              <div
                key={i}
                className="flex-1 bg-primary/20 rounded-t relative group"
                style={{ height: `${(score / 5) * 100}%` }}
              >
                <div
                  className="absolute bottom-0 left-0 right-0 bg-primary rounded-t transition-all"
                  style={{ height: `${(score / 5) * 100}%` }}
                />
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  {score}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-[10px] text-muted-foreground">S1 '24</span>
            <span className="text-[10px] text-muted-foreground">S1 '26</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
