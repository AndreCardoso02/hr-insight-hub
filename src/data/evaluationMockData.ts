// Mock data for Performance Evaluation Module

export type EvaluationStatus = 
  | "pending_self" 
  | "self_completed" 
  | "pending_supervisor" 
  | "pending_director" 
  | "pending_general_director"
  | "pending_feedback" 
  | "completed";

export type CycleStatus = "draft" | "open" | "in_progress" | "closed";

export interface ApprovalStep {
  role: string;
  name: string;
  status: "pending" | "approved" | "rejected" | "skipped";
  date?: string;
  comment?: string;
}

export interface EvaluationCriteria {
  name: string;
  selfScore: number;
  supervisorScore?: number;
  maxScore: number;
}

export interface Evaluation {
  id: string;
  cycleId: string;
  employeeId: string;
  employeeName: string;
  employeePhoto?: string;
  department: string;
  position: string;
  selfEvaluationScore: number | null;
  supervisorScore: number | null;
  finalScore: number | null;
  status: EvaluationStatus;
  selfEvaluationDate?: string;
  criteria: EvaluationCriteria[];
  approvalFlow: ApprovalStep[];
  employeeFeedback?: string;
  feedbackDate?: string;
}

export interface EvaluationCycle {
  id: string;
  name: string;
  year: number;
  semester: number;
  status: CycleStatus;
  startDate: string;
  endDate: string;
  totalEmployees: number;
  evaluatedCount: number;
  inProgressCount: number;
  pendingCount: number;
  createdBy: string;
}

export interface DepartmentEvaluation {
  department: string;
  totalEmployees: number;
  evaluated: number;
  inProgress: number;
  pending: number;
  avgScore: number;
}

// Evaluation cycles
export const evaluationCycles: EvaluationCycle[] = [
  {
    id: "cycle-2026-1",
    name: "Avaliação 1º Semestre 2026",
    year: 2026,
    semester: 1,
    status: "open",
    startDate: "2026-01-15",
    endDate: "2026-03-31",
    totalEmployees: 1189,
    evaluatedCount: 743,
    inProgressCount: 289,
    pendingCount: 157,
    createdBy: "Ana Rodrigues (RH)",
  },
  {
    id: "cycle-2025-2",
    name: "Avaliação 2º Semestre 2025",
    year: 2025,
    semester: 2,
    status: "closed",
    startDate: "2025-07-01",
    endDate: "2025-09-30",
    totalEmployees: 1156,
    evaluatedCount: 1156,
    inProgressCount: 0,
    pendingCount: 0,
    createdBy: "Ana Rodrigues (RH)",
  },
  {
    id: "cycle-2025-1",
    name: "Avaliação 1º Semestre 2025",
    year: 2025,
    semester: 1,
    status: "closed",
    startDate: "2025-01-15",
    endDate: "2025-03-31",
    totalEmployees: 1120,
    evaluatedCount: 1120,
    inProgressCount: 0,
    pendingCount: 0,
    createdBy: "Carlos Mendes (RH)",
  },
];

// Department evaluations for active cycle
export const departmentEvaluations: DepartmentEvaluation[] = [
  { department: "TI", totalEmployees: 156, evaluated: 112, inProgress: 31, pending: 13, avgScore: 4.5 },
  { department: "Comercial", totalEmployees: 234, evaluated: 148, inProgress: 56, pending: 30, avgScore: 4.3 },
  { department: "Financeiro", totalEmployees: 89, evaluated: 67, inProgress: 15, pending: 7, avgScore: 4.1 },
  { department: "RH", totalEmployees: 45, evaluated: 38, inProgress: 5, pending: 2, avgScore: 4.4 },
  { department: "Marketing", totalEmployees: 67, evaluated: 52, inProgress: 10, pending: 5, avgScore: 4.2 },
  { department: "Produção", totalEmployees: 312, evaluated: 178, inProgress: 98, pending: 36, avgScore: 3.9 },
  { department: "Logística", totalEmployees: 178, evaluated: 105, inProgress: 48, pending: 25, avgScore: 4.0 },
  { department: "Jurídico", totalEmployees: 28, evaluated: 23, inProgress: 3, pending: 2, avgScore: 4.6 },
  { department: "Administrativo", totalEmployees: 80, evaluated: 20, inProgress: 23, pending: 37, avgScore: 4.1 },
];

// Top 5 employees
export const topEmployees = [
  { name: "Mariana Costa", department: "Jurídico", score: 4.95, position: "Analista Jurídica Sénior" },
  { name: "Pedro Almeida", department: "TI", score: 4.92, position: "Engenheiro de Software" },
  { name: "Sofia Ribeiro", department: "RH", score: 4.88, position: "Gestora de Talentos" },
  { name: "Lucas Ferreira", department: "Marketing", score: 4.85, position: "Diretor Criativo" },
  { name: "Ana Beatriz Santos", department: "TI", score: 4.82, position: "Arquiteta de Dados" },
];

// Employee of the month
export const employeeOfMonth = {
  name: "Mariana Costa",
  department: "Jurídico",
  position: "Analista Jurídica Sénior",
  score: 4.95,
  highlights: [
    "Liderou projeto de compliance com 100% de sucesso",
    "Reduziu tempo médio de análise contratual em 35%",
    "Mentoria de 3 estagiários com avaliações exemplares",
  ],
  previousScores: [4.7, 4.8, 4.85, 4.9, 4.95],
};

// Evaluations for the active cycle with varied statuses
export const evaluations: Evaluation[] = [
  {
    id: "eval-001",
    cycleId: "cycle-2026-1",
    employeeId: "emp-001",
    employeeName: "Carlos Santos",
    department: "TI",
    position: "Desenvolvedor Full Stack",
    selfEvaluationScore: 4.3,
    supervisorScore: 4.5,
    finalScore: 4.4,
    status: "completed",
    selfEvaluationDate: "2026-01-20",
    criteria: [
      { name: "Competências Técnicas", selfScore: 4.5, supervisorScore: 4.7, maxScore: 5 },
      { name: "Trabalho em Equipa", selfScore: 4.2, supervisorScore: 4.3, maxScore: 5 },
      { name: "Proatividade", selfScore: 4.0, supervisorScore: 4.5, maxScore: 5 },
      { name: "Comunicação", selfScore: 4.3, supervisorScore: 4.2, maxScore: 5 },
      { name: "Cumprimento de Prazos", selfScore: 4.5, supervisorScore: 4.8, maxScore: 5 },
    ],
    approvalFlow: [
      { role: "Autoavaliação", name: "Carlos Santos", status: "approved", date: "2026-01-20", comment: "Autoavaliação concluída." },
      { role: "Chefe Direto", name: "Ricardo Lima", status: "approved", date: "2026-01-25", comment: "Excelente desempenho técnico. Recomendo promoção." },
      { role: "Diretor de Área", name: "Marta Vieira", status: "approved", date: "2026-01-28", comment: "Concordo com a avaliação. Colaborador exemplar." },
      { role: "Diretor Geral", name: "António Ferreira", status: "approved", date: "2026-02-01", comment: "Aprovado." },
    ],
    employeeFeedback: "Concordo com a avaliação. Agradeço o reconhecimento e pretendo continuar a evoluir na área de arquitetura de software.",
    feedbackDate: "2026-02-03",
  },
  {
    id: "eval-002",
    cycleId: "cycle-2026-1",
    employeeId: "emp-002",
    employeeName: "Ana Silva",
    department: "Comercial",
    position: "Gestora de Contas",
    selfEvaluationScore: 4.1,
    supervisorScore: 4.0,
    finalScore: null,
    status: "pending_director",
    selfEvaluationDate: "2026-01-22",
    criteria: [
      { name: "Competências Técnicas", selfScore: 4.0, supervisorScore: 4.0, maxScore: 5 },
      { name: "Trabalho em Equipa", selfScore: 4.3, supervisorScore: 4.2, maxScore: 5 },
      { name: "Proatividade", selfScore: 3.8, supervisorScore: 3.9, maxScore: 5 },
      { name: "Comunicação", selfScore: 4.5, supervisorScore: 4.3, maxScore: 5 },
      { name: "Cumprimento de Prazos", selfScore: 3.9, supervisorScore: 3.8, maxScore: 5 },
    ],
    approvalFlow: [
      { role: "Autoavaliação", name: "Ana Silva", status: "approved", date: "2026-01-22" },
      { role: "Chefe Direto", name: "Bruno Costa", status: "approved", date: "2026-01-27", comment: "Bom desempenho geral." },
      { role: "Diretor de Área", name: "Joana Pereira", status: "pending" },
      { role: "Diretor Geral", name: "António Ferreira", status: "pending" },
    ],
  },
  {
    id: "eval-003",
    cycleId: "cycle-2026-1",
    employeeId: "emp-003",
    employeeName: "Maria Oliveira",
    department: "Financeiro",
    position: "Analista Financeira",
    selfEvaluationScore: 4.6,
    supervisorScore: null,
    finalScore: null,
    status: "pending_supervisor",
    selfEvaluationDate: "2026-02-01",
    criteria: [
      { name: "Competências Técnicas", selfScore: 4.8, maxScore: 5 },
      { name: "Trabalho em Equipa", selfScore: 4.5, maxScore: 5 },
      { name: "Proatividade", selfScore: 4.4, maxScore: 5 },
      { name: "Comunicação", selfScore: 4.5, maxScore: 5 },
      { name: "Cumprimento de Prazos", selfScore: 4.7, maxScore: 5 },
    ],
    approvalFlow: [
      { role: "Autoavaliação", name: "Maria Oliveira", status: "approved", date: "2026-02-01" },
      { role: "Chefe Direto", name: "Fernando Alves", status: "pending" },
      { role: "Diretor de Área", name: "Catarina Nunes", status: "pending" },
      { role: "Diretor Geral", name: "António Ferreira", status: "pending" },
    ],
  },
  {
    id: "eval-004",
    cycleId: "cycle-2026-1",
    employeeId: "emp-004",
    employeeName: "João Pereira",
    department: "RH",
    position: "Técnico de Recrutamento",
    selfEvaluationScore: null,
    supervisorScore: null,
    finalScore: null,
    status: "pending_self",
    criteria: [],
    approvalFlow: [
      { role: "Autoavaliação", name: "João Pereira", status: "pending" },
      { role: "Chefe Direto", name: "Sofia Ribeiro", status: "pending" },
      { role: "Diretor de Área", name: "Ana Rodrigues", status: "pending" },
      { role: "Diretor Geral", name: "António Ferreira", status: "pending" },
    ],
  },
  {
    id: "eval-005",
    cycleId: "cycle-2026-1",
    employeeId: "emp-005",
    employeeName: "Beatriz Costa",
    department: "Marketing",
    position: "Designer Gráfica",
    selfEvaluationScore: 4.4,
    supervisorScore: 4.6,
    finalScore: 4.5,
    status: "pending_feedback",
    selfEvaluationDate: "2026-01-19",
    criteria: [
      { name: "Competências Técnicas", selfScore: 4.5, supervisorScore: 4.7, maxScore: 5 },
      { name: "Trabalho em Equipa", selfScore: 4.3, supervisorScore: 4.5, maxScore: 5 },
      { name: "Proatividade", selfScore: 4.2, supervisorScore: 4.6, maxScore: 5 },
      { name: "Comunicação", selfScore: 4.5, supervisorScore: 4.5, maxScore: 5 },
      { name: "Cumprimento de Prazos", selfScore: 4.5, supervisorScore: 4.7, maxScore: 5 },
    ],
    approvalFlow: [
      { role: "Autoavaliação", name: "Beatriz Costa", status: "approved", date: "2026-01-19" },
      { role: "Chefe Direto", name: "Lucas Ferreira", status: "approved", date: "2026-01-24", comment: "Excelente criatividade e dedicação." },
      { role: "Diretor de Área", name: "Helena Martins", status: "approved", date: "2026-01-28", comment: "Concordo. Merece destaque." },
      { role: "Diretor Geral", name: "António Ferreira", status: "approved", date: "2026-02-02", comment: "Aprovado." },
    ],
  },
  {
    id: "eval-006",
    cycleId: "cycle-2026-1",
    employeeId: "emp-006",
    employeeName: "Ricardo Alves",
    department: "Produção",
    position: "Supervisor de Linha",
    selfEvaluationScore: 3.8,
    supervisorScore: 3.6,
    finalScore: 3.7,
    status: "completed",
    selfEvaluationDate: "2026-01-21",
    criteria: [
      { name: "Competências Técnicas", selfScore: 4.0, supervisorScore: 3.8, maxScore: 5 },
      { name: "Trabalho em Equipa", selfScore: 3.7, supervisorScore: 3.5, maxScore: 5 },
      { name: "Proatividade", selfScore: 3.5, supervisorScore: 3.4, maxScore: 5 },
      { name: "Comunicação", selfScore: 3.8, supervisorScore: 3.6, maxScore: 5 },
      { name: "Cumprimento de Prazos", selfScore: 4.0, supervisorScore: 3.7, maxScore: 5 },
    ],
    approvalFlow: [
      { role: "Autoavaliação", name: "Ricardo Alves", status: "approved", date: "2026-01-21" },
      { role: "Chefe Direto", name: "Manuel Dias", status: "approved", date: "2026-01-26", comment: "Precisa melhorar comunicação interpessoal." },
      { role: "Diretor de Área", name: "Jorge Sousa", status: "approved", date: "2026-01-30" },
      { role: "Diretor Geral", name: "António Ferreira", status: "approved", date: "2026-02-03" },
    ],
    employeeFeedback: "Aceito a avaliação. Vou trabalhar para melhorar a comunicação com a equipa.",
    feedbackDate: "2026-02-05",
  },
];

// Monthly evaluation progress for charts
export const evaluationProgressByMonth = [
  { month: "Jan", completed: 120, inProgress: 280, pending: 789 },
  { month: "Fev", completed: 485, inProgress: 347, pending: 357 },
  { month: "Mar", completed: 743, inProgress: 289, pending: 157 },
];

// Score distribution
export const scoreDistribution = [
  { range: "1.0 - 2.0", count: 12, label: "Insuficiente" },
  { range: "2.1 - 3.0", count: 45, label: "Regular" },
  { range: "3.1 - 4.0", count: 234, label: "Bom" },
  { range: "4.1 - 4.5", count: 312, label: "Muito Bom" },
  { range: "4.6 - 5.0", count: 140, label: "Excelente" },
];

// Status labels in Portuguese
export const statusLabels: Record<EvaluationStatus, string> = {
  pending_self: "Aguarda Autoavaliação",
  self_completed: "Autoavaliação Concluída",
  pending_supervisor: "Aguarda Chefe Direto",
  pending_director: "Aguarda Diretor",
  pending_general_director: "Aguarda Diretor Geral",
  pending_feedback: "Aguarda Feedback",
  completed: "Concluída",
};

export const statusColors: Record<EvaluationStatus, string> = {
  pending_self: "bg-muted text-muted-foreground",
  self_completed: "bg-info-muted text-info",
  pending_supervisor: "bg-warning-muted text-warning",
  pending_director: "bg-warning-muted text-warning",
  pending_general_director: "bg-warning-muted text-warning",
  pending_feedback: "bg-accent text-accent-foreground",
  completed: "bg-success-muted text-success",
};
