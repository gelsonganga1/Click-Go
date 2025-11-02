"use client";

import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import StatsCards from "../../_components/admin/StatsCards";
import AgendamentoCard from "../../_components/admin/AngendamentoCard";
import DetalhesModal from "../../_components/admin/DetalhesModal";
import { Appointment, statusConfig } from "@/types/admin";

// ✅ Hook customizado para atualizar status
function useUpdateStatus() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Appointment["status"] }) => {
      const res = await fetch(`/api/reservations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error("Erro ao atualizar status");
      return res.json() as Promise<Appointment>;
    },
    onSuccess: (_, variables) => {
      queryClient.setQueryData<Appointment[]>(["agendamentos"], old =>
        old?.map(a => (a.id === variables.id ? { ...a, status: variables.status } : a)) || []
      );
    },
  });

  return mutation;
}

export default function PainelAdmin() {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState<Appointment | null>(null);

  // Mock de usuário — substitua pelo seu useAuth
  const user = { role: "admin", empresa: { id: "1", nome: "Minha Empresa" } };

  // 🔹 Query de agendamentos
  const { data: agendamentos = [], isLoading } = useQuery<Appointment[]>({
    queryKey: ["agendamentos"],
    queryFn: async () => {
      const res = await fetch("/api/reservations");
      if (!res.ok) throw new Error("Erro ao buscar agendamentos");
      return res.json();
    },
  });

  const updateStatusMutation = useUpdateStatus();

  const atualizarStatus = (id: string, novoStatus: Appointment["status"]) => {
    updateStatusMutation.mutate({ id, status: novoStatus });
  };

  const abrirDetalhes = (agendamento: Appointment) => {
    setAgendamentoSelecionado(agendamento);
    setModalAberto(true);
  };

  const agendamentosFiltrados = useMemo(() => {
    if (filtroStatus === "todos") return agendamentos;
    return agendamentos.filter(a => a.status === filtroStatus);
  }, [filtroStatus, agendamentos]);

  const stats = useMemo(() => ({
    total: agendamentos.length,
    pendentes: agendamentos.filter(a => a.status === "pendente").length,
    confirmados: agendamentos.filter(a => a.status === "confirmado").length,
    concluidos: agendamentos.filter(a => a.status === "concluido").length,
  }), [agendamentos]);

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold">
          {user.role === "admin" ? "Painel Administrativo" : "Painel da Empresa"}
        </h1>
      </motion.div>

      {/* Cards de estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards titulo="Total" valor={stats.total} icon={Calendar} cor="from-slate-500 to-slate-600" />
        <StatsCards titulo="Pendentes" valor={stats.pendentes} icon={Clock} cor="from-yellow-500 to-yellow-600" />
        <StatsCards titulo="Confirmados" valor={stats.confirmados} icon={Clock} cor="from-blue-500 to-blue-600" />
        <StatsCards titulo="Concluídos" valor={stats.concluidos} icon={Clock} cor="from-green-500 to-green-600" />
      </div>

      {/* Lista de agendamentos */}
      <div className="grid gap-4">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500">Carregando...</div>
        ) : agendamentosFiltrados.length === 0 ? (
          <div className="text-center py-12 text-gray-500">Nenhum agendamento encontrado</div>
        ) : (
          agendamentosFiltrados.map(a => (
            <AgendamentoCard
              key={a.id}
              agendamento={a}
              onAtualizarStatus={atualizarStatus}
              onVerDetalhes={abrirDetalhes}
              statusConfig={statusConfig}
            />
          ))
        )}
      </div>

      {/* Modal de detalhes */}
      {modalAberto && agendamentoSelecionado && (
        <DetalhesModal
          agendamento={agendamentoSelecionado}
          onClose={() => setModalAberto(false)}
          onAtualizarStatus={atualizarStatus}
          statusConfig={statusConfig}
        />
      )}
    </div>
  );
}
