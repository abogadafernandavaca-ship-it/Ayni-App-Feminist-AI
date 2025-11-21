// Tipos de Dominio para J-MÓVIL

export enum Role {
  CITIZEN = 'CIUDADANA',
  MANAGER = 'GESTORA',
}

export interface CaseReport {
  id: string;
  timestamp: string;
  narrative: string;
  category: 'Física' | 'Psicológica' | 'Patrimonial' | 'Sexual' | 'Digital';
  riskLevel: 'Bajo' | 'Medio' | 'Alto' | 'Crítico';
  location: string; // Generalizado para anonimidad
  status: 'Pendiente' | 'En Proceso' | 'Archivado';
  tags: string[];
}

export interface IGIData {
  month: string;
  budgetAllocated: number; // Presupuesto asignado
  budgetExecuted: number; // Presupuesto ejecutado realmente
  reportedCases: number;
  unresolvedCases: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isVoice?: boolean;
}
