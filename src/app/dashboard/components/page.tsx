"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";

import StatsCards from "../../_components/admin/StatsCards";
import AgendamentoCard from "../../_components/admin/AngendamentoCard";
import DetalhesModal from "../../_components/admin/DetalhesModal";
import { Appointment, statusConfig } from "@/types/admin";

export default function PainelAdmin() {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Appointment | null>(null);

  // Mock de usuário e agendamentos
  const user = { role: "admin", empresa: { id: "1", nome: "Minha Empresa" } };
  const agendamentos: Appointment[] = [
    { id: "1", title: "Reunião 1", status: "pendente", date: new Date().toISOString(), empresa: { id: "1", nome: "Minha Empresa" } },
    { id: "2", title: "Reunião 2", status: "confirmado", date: new Date().toISOString() },
  ];

  const agendamentosFiltrados = useMemo(() => {
    if (filtroStatus === "todos") return agendamentos;
    return agendamentos.filter(a => a.status === filtroStatus);
  }, [filtroStatus]);

  const atualizarStatus = (id: string, novoStatus: Appointment["status"]) => {
    const index = agendamentos.findIndex(a => a.id === id);
    if (index !== -1) agendamentos[index].status = novoStatus;
    setAgendamentoSelecionado({ ...agendamentos[index] });
  };

  const abrirDetalhes = (a: Appointment) => { setAgendamentoSelecionado(a); setModalAberto(true); };

  return (
    <div className="space-y-8 p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">{user.role === "admin" ? "Painel Administrativo" : "Painel da Empresa"}</h1>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards titulo="Total" valor={agendamentos.length} icon={Calendar} cor="from-slate-500 to-slate-600" />
        <StatsCards titulo="Pendentes" valor={agendamentos.filter(a => a.status === "pendente").length} icon={Clock} cor="from-yellow-500 to-yellow-600" />
      </div>

      <div className="grid gap-4">
        {agendamentosFiltrados.map(a => (
          <AgendamentoCard key={a.id} agendamento={a} onAtualizarStatus={atualizarStatus} onVerDetalhes={abrirDetalhes} statusConfig={statusConfig} />
        ))}
      </div>

      {modalAberto && agendamentoSelecionado && (
        <DetalhesModal agendamento={agendamentoSelecionado} onClose={() => setModalAberto(false)} onAtualizarStatus={atualizarStatus} statusConfig={statusConfig} />
      )}
    </div>
  );
}
