import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Appointment, StatusConfig } from "@/types/admin";

interface DetalhesModalProps {
  agendamento: Appointment;
  onClose: () => void;
  onAtualizarStatus: (id: string, novoStatus: Appointment["status"]) => void;
  statusConfig: StatusConfig;
}

export default function DetalhesModal({ agendamento, onClose, onAtualizarStatus, statusConfig }: DetalhesModalProps) {
  const status = statusConfig[agendamento.status];
  const StatusIcon = status.icon;

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{agendamento.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <StatusIcon className="w-4 h-4" />
            <span>Status: {status.label}</span>
          </div>
          <div className="text-sm text-slate-600">Data e hora: {new Date(agendamento.date).toLocaleString()}</div>
          {agendamento.empresa && <div className="text-sm text-slate-600">Empresa: {agendamento.empresa.nome}</div>}
        </div>

        <DialogFooter className="flex gap-2 mt-4">
          {agendamento.status !== "confirmado" && (
            <Button onClick={() => onAtualizarStatus(agendamento.id, "confirmado")}>Confirmar</Button>
          )}
          {agendamento.status !== "cancelado" && (
            <Button variant="destructive" onClick={() => onAtualizarStatus(agendamento.id, "cancelado")}>
              Cancelar
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
