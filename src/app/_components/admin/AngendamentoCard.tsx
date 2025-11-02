import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Appointment, StatusConfig } from "@/types/admin";
import { Clock } from "lucide-react";

interface AgendamentoCardProps {
  agendamento: Appointment;
  onAtualizarStatus: (id: string, novoStatus: Appointment["status"]) => void;
  onVerDetalhes: (agendamento: Appointment) => void;
  statusConfig: StatusConfig;
}

export default function AgendamentoCard({
  agendamento,
  onAtualizarStatus,
  onVerDetalhes,
  statusConfig,
}: AgendamentoCardProps) {
  const status = statusConfig[agendamento.status];
  const StatusIcon = status.icon;

  return (
    <Card className={`border ${status.cor}`}>
      <CardHeader className="flex justify-between items-center">
        <CardTitle>{agendamento.title}</CardTitle>
        <StatusIcon className="w-5 h-5" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Clock className="w-4 h-4" />
          <span>{new Date(agendamento.date).toLocaleString()}</span>
        </div>
        <div className="flex gap-2 mt-2">
          {agendamento.status !== "confirmado" && (
            <Button size="sm" variant="outline" onClick={() => onAtualizarStatus(agendamento.id, "confirmado")}>
              Confirmar
            </Button>
          )}
          {agendamento.status !== "cancelado" && (
            <Button size="sm" variant="destructive" onClick={() => onAtualizarStatus(agendamento.id, "cancelado")}>
              Cancelar
            </Button>
          )}
          <Button size="sm" onClick={() => onVerDetalhes(agendamento)}>
            Detalhes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
