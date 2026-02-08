import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Trophy, Medal, Award } from "lucide-react";
import { departmentEvaluations, topEmployees } from "@/data/evaluationMockData";

export function TopPerformersCard() {
  const topDepartments = [...departmentEvaluations]
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 5);

  const rankIcons = [
    <Trophy className="h-4 w-4 text-warning" />,
    <Medal className="h-4 w-4 text-muted-foreground" />,
    <Award className="h-4 w-4 text-warning/60" />,
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Top 5 Areas */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            Top 5 Áreas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topDepartments.map((dept, index) => (
            <div
              key={dept.department}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-card text-xs font-bold border border-border">
                  {index < 3 ? rankIcons[index] : index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{dept.department}</p>
                  <p className="text-xs text-muted-foreground">
                    {dept.evaluated}/{dept.totalEmployees} avaliados
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                <span className="text-sm font-bold">{dept.avgScore.toFixed(1)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top 5 Employees */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" />
            Top 5 Colaboradores
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topEmployees.map((emp, index) => (
            <div
              key={emp.name}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-card text-xs font-bold border border-border">
                  {index < 3 ? rankIcons[index] : index + 1}
                </span>
                <div>
                  <p className="text-sm font-medium">{emp.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {emp.position} • {emp.department}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 text-warning fill-warning" />
                <span className="text-sm font-bold">{emp.score.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
