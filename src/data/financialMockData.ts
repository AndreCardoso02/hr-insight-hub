// Mock data for Financial Dashboard

export const payrollKPIs = {
  currentPayroll: {
    value: 5847320,
    previousMonth: 5692150,
    changePercent: 2.73,
    byDepartment: [
      { name: "Produção", value: 1850000, percent: 31.6 },
      { name: "Comercial", value: 1120000, percent: 19.2 },
      { name: "TI", value: 890000, percent: 15.2 },
      { name: "Logística", value: 680000, percent: 11.6 },
      { name: "Financeiro", value: 520000, percent: 8.9 },
      { name: "Marketing", value: 380000, percent: 6.5 },
      { name: "RH", value: 280000, percent: 4.8 },
      { name: "Jurídico", value: 127320, percent: 2.2 },
    ],
    trend: [5420000, 5510000, 5580000, 5650000, 5692150, 5847320],
    trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    insights: [
      "Aumento de 2.73% devido a reajuste coletivo aplicado em Dezembro",
      "Departamento de Produção representa 31.6% da massa salarial total",
      "Custo por colaborador aumentou €125 em média",
    ],
  },
  socialCharges: {
    value: 1462830,
    previousMonth: 1423038,
    changePercent: 2.8,
    breakdown: [
      { name: "Segurança Social (TSU)", value: 876500, percent: 59.9 },
      { name: "IRS Retido", value: 438230, percent: 30.0 },
      { name: "Seguro de Trabalho", value: 87600, percent: 6.0 },
      { name: "Outros Encargos", value: 60500, percent: 4.1 },
    ],
    trend: [1380000, 1395000, 1410000, 1418000, 1423038, 1462830],
    trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    insights: [
      "Encargos representam 25% do custo total com pessoal",
      "TSU mantém taxa de 23.75% conforme legislação",
      "Aumento proporcional ao crescimento da massa salarial",
    ],
  },
  allowances: {
    value: 234560,
    previousMonth: 198340,
    changePercent: 18.3,
    breakdown: [
      { name: "Subsídio de Alimentação", value: 145200, percent: 61.9 },
      { name: "Ajudas de Custo (Viagens)", value: 52800, percent: 22.5 },
      { name: "Subsídio de Transporte", value: 24560, percent: 10.5 },
      { name: "Outros Subsídios", value: 12000, percent: 5.1 },
    ],
    trend: [185000, 190000, 195000, 202000, 198340, 234560],
    trendLabels: ["Jul", "Ago", "Set", "Out", "Nov", "Dez"],
    insights: [
      "Aumento significativo de 18.3% devido a deslocações comerciais",
      "Subsídio de alimentação subiu €0.50/dia conforme acordo",
      "Revisar política de ajudas de custo para viagens",
    ],
  },
  totalCost: {
    value: 7544710,
    previousMonth: 7313528,
    changePercent: 3.16,
    budget: 7600000,
    budgetVariance: -0.73,
  },
};

export const payrollEvolution = [
  { month: "Jan", salarios: 5280000, encargos: 1320000, ajudas: 175000 },
  { month: "Fev", salarios: 5310000, encargos: 1327500, ajudas: 178000 },
  { month: "Mar", salarios: 5350000, encargos: 1337500, ajudas: 182000 },
  { month: "Abr", salarios: 5380000, encargos: 1345000, ajudas: 180000 },
  { month: "Mai", salarios: 5420000, encargos: 1355000, ajudas: 185000 },
  { month: "Jun", salarios: 5480000, encargos: 1370000, ajudas: 188000 },
  { month: "Jul", salarios: 5420000, encargos: 1380000, ajudas: 185000 },
  { month: "Ago", salarios: 5510000, encargos: 1395000, ajudas: 190000 },
  { month: "Set", salarios: 5580000, encargos: 1410000, ajudas: 195000 },
  { month: "Out", salarios: 5650000, encargos: 1418000, ajudas: 202000 },
  { month: "Nov", salarios: 5692150, encargos: 1423038, ajudas: 198340 },
  { month: "Dez", salarios: 5847320, encargos: 1462830, ajudas: 234560 },
];

export const costDistribution = [
  { name: "Salários Base", value: 4200000, fill: "hsl(var(--chart-1))" },
  { name: "Subsídios Fixos", value: 1647320, fill: "hsl(var(--chart-2))" },
  { name: "Encargos Sociais", value: 1462830, fill: "hsl(var(--chart-3))" },
  { name: "Ajudas de Custo", value: 234560, fill: "hsl(var(--chart-4))" },
];

export const budgetComparison = [
  { month: "Jan", orcamento: 6800000, realizado: 6775000 },
  { month: "Fev", orcamento: 6850000, realizado: 6815500 },
  { month: "Mar", orcamento: 6900000, realizado: 6869500 },
  { month: "Abr", orcamento: 6950000, realizado: 6905000 },
  { month: "Mai", orcamento: 7000000, realizado: 6960000 },
  { month: "Jun", orcamento: 7100000, realizado: 7038000 },
  { month: "Jul", orcamento: 7200000, realizado: 6985000 },
  { month: "Ago", orcamento: 7300000, realizado: 7095000 },
  { month: "Set", orcamento: 7400000, realizado: 7185000 },
  { month: "Out", orcamento: 7500000, realizado: 7270000 },
  { month: "Nov", orcamento: 7550000, realizado: 7313528 },
  { month: "Dez", orcamento: 7600000, realizado: 7544710 },
];

export const payrollProcessing = {
  completed: {
    count: 1189,
    amount: 5692150,
    percent: 95.4,
  },
  pending: {
    count: 42,
    amount: 132680,
    percent: 3.4,
    reasons: [
      { reason: "Dados bancários em validação", count: 18 },
      { reason: "Aguardando aprovação", count: 15 },
      { reason: "Documentação pendente", count: 9 },
    ],
  },
  error: {
    count: 16,
    amount: 22490,
    percent: 1.2,
    reasons: [
      { reason: "IBAN inválido", count: 8 },
      { reason: "Erro de cálculo", count: 5 },
      { reason: "Dados incompletos", count: 3 },
    ],
  },
};

export const assetManagement = {
  totalAssets: 3456,
  totalValue: 12840000,
  depreciationYear: 1284000,
  byStatus: [
    { status: "Em Uso", count: 3120, value: 11200000, color: "hsl(var(--success))" },
    { status: "Em Manutenção", count: 186, value: 892000, color: "hsl(var(--warning))" },
    { status: "Danificado", count: 98, value: 548000, color: "hsl(var(--destructive))" },
    { status: "Abatido/Perdido", count: 52, value: 200000, color: "hsl(var(--muted-foreground))" },
  ],
  byCategory: [
    { category: "Equipamento Informático", count: 1245, value: 4500000 },
    { category: "Mobiliário", count: 890, value: 2100000 },
    { category: "Veículos", count: 45, value: 3200000 },
    { category: "Equipamento Industrial", count: 320, value: 1840000 },
    { category: "Outros", count: 956, value: 1200000 },
  ],
  recentMovements: [
    { asset: "Laptop Dell XPS 15", action: "Atribuído", employee: "João Silva", date: "2026-01-30" },
    { asset: "Viatura Toyota Corolla", action: "Em Manutenção", employee: "-", date: "2026-01-29" },
    { asset: "Monitor LG 27\"", action: "Danificado", employee: "Maria Costa", date: "2026-01-28" },
    { asset: "Impressora HP LaserJet", action: "Abatido", employee: "-", date: "2026-01-27" },
  ],
};

export const financialFilters = {
  periods: [
    { value: "current-month", label: "Mês Atual" },
    { value: "last-month", label: "Mês Anterior" },
    { value: "quarter", label: "Trimestre" },
    { value: "year", label: "Ano" },
    { value: "custom", label: "Personalizado" },
  ],
  costTypes: [
    { value: "all", label: "Todos os Custos" },
    { value: "salarios", label: "Salários" },
    { value: "encargos", label: "Encargos Sociais" },
    { value: "ajudas", label: "Ajudas de Custo" },
    { value: "patrimonio", label: "Patrimônio" },
  ],
};
