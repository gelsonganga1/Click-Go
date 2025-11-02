import { Clock, CheckCircle2, XCircle } from "lucide-react";

// Configuração de status
export const statusConfig = {
  pendente: { label: "Pendente", cor: "bg-yellow-100 text-yellow-800 border-yellow-300", icon: Clock },
  confirmado: { label: "Confirmado", cor: "bg-blue-100 text-blue-800 border-blue-300", icon: CheckCircle2 },
  concluido: { label: "Concluído", cor: "bg-green-100 text-green-800 border-green-300", icon: CheckCircle2 },
  cancelado: { label: "Cancelado", cor: "bg-red-100 text-red-800 border-red-300", icon: XCircle },
} as const;

// Tipos derivados
export type StatusConfig = typeof statusConfig;
export type StatusKey = keyof StatusConfig;

// Tipagem do agendamento
export type Appointment = {
  id: string;
  title: string;
  status: StatusKey;
  date: string;
  empresa?: { id: string; nome: string };
};
