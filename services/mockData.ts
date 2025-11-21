import { CaseReport, IGIData } from '../types';

export const MOCK_REPORTS: CaseReport[] = [
  {
    id: 'CS-2024-001',
    timestamp: '2024-05-10T09:30:00',
    narrative: 'Reporte verbal sobre agresión física en el hogar tras discusión económica.',
    category: 'Física',
    riskLevel: 'Alto',
    location: 'Guayaquil - Sector Norte',
    status: 'En Proceso',
    tags: ['violencia económica', 'agresión física']
  },
  {
    id: 'CS-2024-002',
    timestamp: '2024-05-11T14:15:00',
    narrative: 'Acoso digital persistente por expareja a través de redes sociales.',
    category: 'Digital',
    riskLevel: 'Medio',
    location: 'Quito - Centro',
    status: 'Pendiente',
    tags: ['ciberacoso', 'redes sociales']
  },
  {
    id: 'CS-2024-003',
    timestamp: '2024-05-12T08:00:00',
    narrative: 'Negación de pensión alimenticia y amenazas.',
    category: 'Patrimonial',
    riskLevel: 'Bajo',
    location: 'Cuenca',
    status: 'Archivado',
    tags: ['manutención', 'amenazas verbales']
  },
    {
    id: 'CS-2024-004',
    timestamp: '2024-05-12T18:30:00',
    narrative: 'Intento de agresión sexual en transporte público.',
    category: 'Sexual',
    riskLevel: 'Crítico',
    location: 'Esmeraldas',
    status: 'Pendiente',
    tags: ['transporte público', 'emergencia']
  }
];

export const MOCK_IGI_DATA: IGIData[] = [
  { month: 'Ene', budgetAllocated: 5000, budgetExecuted: 1200, reportedCases: 45, unresolvedCases: 40 },
  { month: 'Feb', budgetAllocated: 5000, budgetExecuted: 1500, reportedCases: 52, unresolvedCases: 48 },
  { month: 'Mar', budgetAllocated: 5000, budgetExecuted: 1100, reportedCases: 60, unresolvedCases: 55 },
  { month: 'Abr', budgetAllocated: 5000, budgetExecuted: 2000, reportedCases: 48, unresolvedCases: 30 },
  { month: 'May', budgetAllocated: 5000, budgetExecuted: 900, reportedCases: 70, unresolvedCases: 65 },
];
