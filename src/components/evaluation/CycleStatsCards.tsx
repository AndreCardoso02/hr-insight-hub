import { Card, CardContent } from "@/components/ui/card";
import { Users, CheckCircle2, Clock, TrendingUp, Award, Star } from "lucide-react";
import { EvaluationCycle, departmentEvaluations } from "@/data/evaluationMockData";

interface CycleStatsCardsProps {
  cycle: EvaluationCycle;
}

export function CycleStatsCards({ cycle }: CycleStatsCardsProps) {
  const progress = Math.round((cycle.evaluatedCount / cycle.totalEmployees) * 100);
  const avgScore = departmentEvaluations.reduce((sum, d) => sum + d.avgScore * d.evaluated, 0) /
    departmentEvaluations.reduce((sum, d) => sum + d.evaluated, 0);

  const stats = [
    {
      title: "Total Colaboradores",
      value: cycle.totalEmployees.toLocaleString("pt-BR"),
      subtitle: `${cycle.evaluatedCount} avaliados`,
      icon: <Users className="h-5 w-5" />,
      color: "text-primary",
      bgColor: "bg-accent",
    },
    {
      title: "Avaliações Concluídas",
      value: cycle.evaluatedCount.toLocaleString("pt-BR"),
      subtitle: `${progress}% do total`,
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: "text-success",
      bgColor: "bg-success-muted",
    },
    {
      title: "Em Progresso",
      value: cycle.inProgressCount.toLocaleString("pt-BR"),
      subtitle: `${cycle.pendingCount} pendentes`,
      icon: <Clock className="h-5 w-5" />,
      color: "text-warning",
      bgColor: "bg-warning-muted",
    },
    {
      title: "Nota Média Global",
      value: avgScore.toFixed(1),
      subtitle: "de 5.0 possíveis",
      icon: <Star className="h-5 w-5" />,
      color: "text-primary",
      bgColor: "bg-accent",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-2.5 rounded-lg`}>
                {stat.icon}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
