// Mock data for HR Dashboard

export const employeeStats = {
  total: 1247,
  active: 1189,
  suspended: 23,
  terminated: 35,
  trendVsLastMonth: 2.3,
};

export const admissionsExits = {
  last30Days: {
    admissions: 28,
    exits: 12,
    net: 16,
  },
  last90Days: {
    admissions: 87,
    exits: 41,
    net: 46,
  },
};

export const absenteeismRates = {
  today: 3.2,
  month: 4.1,
  accumulated: 3.8,
  trendVsLastMonth: -0.5,
};

export const absenteeismTrend = [
  { month: "Jan", rate: 4.2, target: 3.5 },
  { month: "Fev", rate: 3.8, target: 3.5 },
  { month: "Mar", rate: 4.5, target: 3.5 },
  { month: "Abr", rate: 4.1, target: 3.5 },
  { month: "Mai", rate: 3.9, target: 3.5 },
  { month: "Jun", rate: 3.6, target: 3.5 },
  { month: "Jul", rate: 4.0, target: 3.5 },
  { month: "Ago", rate: 3.7, target: 3.5 },
  { month: "Set", rate: 4.3, target: 3.5 },
  { month: "Out", rate: 3.9, target: 3.5 },
  { month: "Nov", rate: 3.5, target: 3.5 },
  { month: "Dez", rate: 3.8, target: 3.5 },
];

export const turnoverData = [
  { month: "Jan", turnover: 2.1, voluntary: 1.4, involuntary: 0.7 },
  { month: "Fev", turnover: 1.8, voluntary: 1.2, involuntary: 0.6 },
  { month: "Mar", turnover: 2.3, voluntary: 1.6, involuntary: 0.7 },
  { month: "Abr", turnover: 1.9, voluntary: 1.3, involuntary: 0.6 },
  { month: "Mai", turnover: 2.0, voluntary: 1.4, involuntary: 0.6 },
  { month: "Jun", turnover: 1.7, voluntary: 1.1, involuntary: 0.6 },
  { month: "Jul", turnover: 2.2, voluntary: 1.5, involuntary: 0.7 },
  { month: "Ago", turnover: 1.6, voluntary: 1.0, involuntary: 0.6 },
  { month: "Set", turnover: 2.4, voluntary: 1.7, involuntary: 0.7 },
  { month: "Out", turnover: 1.9, voluntary: 1.3, involuntary: 0.6 },
  { month: "Nov", turnover: 1.5, voluntary: 1.0, involuntary: 0.5 },
  { month: "Dez", turnover: 1.2, voluntary: 0.8, involuntary: 0.4 },
];

export const recruitmentData = {
  openPositions: 24,
  urgentPositions: 6,
  avgTimeToHire: 32,
  funnel: [
    { stage: "Candidaturas", count: 342, color: "hsl(var(--chart-1))" },
    { stage: "Triagem", count: 156, color: "hsl(var(--chart-5))" },
    { stage: "Entrevista RH", count: 78, color: "hsl(var(--chart-4))" },
    { stage: "Entrevista Técnica", count: 45, color: "hsl(var(--chart-3))" },
    { stage: "Proposta", count: 18, color: "hsl(var(--chart-2))" },
    { stage: "Contratados", count: 12, color: "hsl(var(--success))" },
  ],
};

export const vacationData = {
  onVacation: 47,
  scheduled: 83,
  pendingApproval: 12,
  currentVacations: [
    { name: "Ana Silva", department: "Comercial", startDate: "2026-01-20", endDate: "2026-02-03", daysRemaining: 4 },
    { name: "Carlos Santos", department: "TI", startDate: "2026-01-25", endDate: "2026-02-08", daysRemaining: 9 },
    { name: "Maria Oliveira", department: "Financeiro", startDate: "2026-01-27", endDate: "2026-02-10", daysRemaining: 11 },
    { name: "João Pereira", department: "RH", startDate: "2026-01-28", endDate: "2026-02-06", daysRemaining: 7 },
    { name: "Beatriz Costa", department: "Marketing", startDate: "2026-01-22", endDate: "2026-02-05", daysRemaining: 6 },
  ],
};

export const leaveData = {
  medicalLeave: 15,
  maternityPaternity: 8,
  other: 5,
  activeLeaves: [
    { name: "Fernanda Lima", type: "Licença Médica", department: "Produção", expectedReturn: "2026-02-15" },
    { name: "Ricardo Alves", type: "Licença Paternidade", department: "TI", expectedReturn: "2026-02-10" },
    { name: "Patrícia Mendes", type: "Licença Maternidade", department: "Comercial", expectedReturn: "2026-05-20" },
    { name: "Bruno Ferreira", type: "Licença Médica", department: "Logística", expectedReturn: "2026-02-08" },
  ],
};

export const performanceData = {
  evaluated: 892,
  total: 1189,
  percentEvaluated: 75,
  averageScore: 4.2,
  byDepartment: [
    { department: "TI", score: 4.5, employees: 156 },
    { department: "Comercial", score: 4.3, employees: 234 },
    { department: "Financeiro", score: 4.1, employees: 89 },
    { department: "RH", score: 4.4, employees: 45 },
    { department: "Marketing", score: 4.2, employees: 67 },
    { department: "Produção", score: 3.9, employees: 312 },
    { department: "Logística", score: 4.0, employees: 178 },
    { department: "Jurídico", score: 4.6, employees: 28 },
  ],
};

export const departmentDistribution = [
  { name: "TI", value: 156, fill: "hsl(var(--chart-1))" },
  { name: "Comercial", value: 234, fill: "hsl(var(--chart-2))" },
  { name: "Financeiro", value: 89, fill: "hsl(var(--chart-3))" },
  { name: "RH", value: 45, fill: "hsl(var(--chart-4))" },
  { name: "Marketing", value: 67, fill: "hsl(var(--chart-5))" },
  { name: "Produção", value: 312, fill: "hsl(var(--info))" },
  { name: "Logística", value: 178, fill: "hsl(var(--warning))" },
  { name: "Jurídico", value: 28, fill: "hsl(var(--success))" },
];
