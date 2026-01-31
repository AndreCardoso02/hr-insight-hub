// Mock data for PCA Executive Dashboard

export const executiveKPIs = {
  totalEmployees: {
    current: 1247,
    previousPeriod: 1218,
    growthPercent: 2.4,
    trend: [1150, 1175, 1190, 1205, 1218, 1247],
    trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    description: "Número total de colaboradores ativos na instituição, incluindo todas as unidades e departamentos.",
    insight: "Crescimento consistente nos últimos 6 meses, com média de 16 novas contratações mensais.",
  },
  averageCost: {
    current: 4850,
    previousPeriod: 4720,
    changePercent: 2.8,
    trend: [4500, 4580, 4650, 4700, 4720, 4850],
    trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    description: "Custo médio mensal por colaborador, incluindo salário, encargos e benefícios.",
    insight: "Aumento reflete reajuste salarial coletivo de 2.5% aplicado em Dezembro.",
  },
  absenteeismRate: {
    current: 3.8,
    previousPeriod: 4.2,
    changePercent: -9.5,
    trend: [4.5, 4.3, 4.1, 4.0, 4.2, 3.8],
    trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    target: 3.5,
    description: "Taxa global de absentismo, considerando todas as ausências não programadas.",
    insight: "Redução de 9.5% em relação ao período anterior. Meta de 3.5% está próxima.",
  },
  turnoverRate: {
    current: 1.8,
    previousPeriod: 2.1,
    changePercent: -14.3,
    trend: [2.4, 2.2, 2.0, 2.1, 2.1, 1.8],
    trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    description: "Taxa mensal de rotatividade de colaboradores (saídas/total de colaboradores).",
    insight: "Menor taxa dos últimos 12 meses. Políticas de retenção a mostrar resultados.",
  },
};

export const performanceIndicators = {
  evaluationsCompleted: {
    percent: 78,
    total: 1189,
    completed: 927,
    pending: 262,
  },
  averagePerformance: {
    score: 4.2,
    maxScore: 5.0,
    previousPeriod: 4.0,
    changePercent: 5.0,
  },
};

export const riskIndicators = {
  highTurnoverDepartments: [
    { name: "Produção", rate: 3.2, employees: 312, trend: "up" },
    { name: "Logística", rate: 2.8, employees: 178, trend: "stable" },
    { name: "Comercial", rate: 2.4, employees: 234, trend: "down" },
  ],
  prolongedLeaves: [
    { type: "Licença Maternidade", count: 8, avgDuration: "4 meses" },
    { type: "Licença Médica (+30 dias)", count: 5, avgDuration: "45 dias" },
    { type: "Outras Licenças", count: 3, avgDuration: "60 dias" },
  ],
  totalOnLeave: 16,
};

export const comparativeData = {
  headcountEvolution: [
    { month: "Jul", current: 1150, previous: 1120 },
    { month: "Ago", current: 1175, previous: 1135 },
    { month: "Set", current: 1190, previous: 1150 },
    { month: "Out", current: 1205, previous: 1168 },
    { month: "Nov", current: 1218, previous: 1185 },
    { month: "Dez", current: 1247, previous: 1200 },
  ],
  costEvolution: [
    { month: "Jul", current: 4500, budget: 4600 },
    { month: "Ago", current: 4580, budget: 4600 },
    { month: "Set", current: 4650, budget: 4700 },
    { month: "Out", current: 4700, budget: 4700 },
    { month: "Nov", current: 4720, budget: 4800 },
    { month: "Dez", current: 4850, budget: 4900 },
  ],
};
