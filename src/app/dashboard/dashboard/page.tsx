"use client";
import React, { useState, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext"; // 👈 garante que pegas o user logado

import StatsCards from "../dashboard/dashboard/StatsCards";
import AgendamentoCard from "../components/admin/AgendamentoCard";
import DetalhesModal from "../components/admin/DetalhesModal";

const statusConfig = {
  pendente: {
    label: "Pendente",
    cor: "bg-yellow-100 text-yellow-800 border-yellow-300",
    icon: Clock,
  },
  confirmado: {
    label: "Confirmado",
    cor: "bg-blue-100 text-blue-800 border-blue-300",
    icon: CheckCircle2,
  },
  concluido: {
    label: "Concluído",
    cor: "bg-green-100 text-green-800 border-green-300",
    icon: CheckCircle2,
  },
  cancelado: {
    label: "Cancelado",
    cor: "bg-red-100 text-red-800 border-red-300",
    icon: XCircle,
  },
};

export default function PainelAdmin() {
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [modalAberto, setModalAberto] = useState(false);
  const [agendamentoSelecionado, setAgendamentoSelecionado] = useState(null);
  const queryClient = useQueryClient();
  const { user, loading } = useAuth();

  // Aguarda o user carregar
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-slate-600">
        Verificando acesso...
      </div>
    );
  }

  // Protege o painel — só empresa e admin podem ver
  if (!user || (user.role !== "empresa" && user.role !== "admin")) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-center">
        <h2 className="text-xl font-semibold text-red-600">
          Acesso negado ❌
        </h2>
        <p className="text-slate-600 mt-2">
          Apenas empresas ou administradores podem acessar este painel.
        </p>
      </div>
    );
  }

  // Busca os agendamentos
  const { data: agendamentos = [], isLoading } = useQuery({
    queryKey: ["agendamentos", user?.empresa?.id],
    queryFn: () => base44.entities.Agendamento.list("-created_date"),
  });

  // Atualiza status
  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Agendamento.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agendamentos"] });
    },
  });

  // 🔹 Filtra agendamentos por empresa
  const agendamentosPorEmpresa = useMemo(() => {
    if (user.role === "admin") return agendamentos;
    return agendamentos.filter(
      (a) => a.empresa?.id === user?.empresa?.id
    );
  }, [user, agendamentos]);

  // 🔹 Filtro de status
  const agendamentosFiltrados = useMemo(() => {
    if (filtroStatus === "todos") return agendamentosPorEmpresa;
    return agendamentosPorEmpresa.filter((a) => a.status === filtroStatus);
  }, [filtroStatus, agendamentosPorEmpresa]);

  // 🔹 Estatísticas
  const stats = useMemo(
    () => ({
      total: agendamentosPorEmpresa.length,
      pendentes: agendamentosPorEmpresa.filter(
        (a) => a.status === "pendente"
      ).length,
      confirmados: agendamentosPorEmpresa.filter(
        (a) => a.status === "confirmado"
      ).length,
      concluidos: agendamentosPorEmpresa.filter(
        (a) => a.status === "concluido"
      ).length,
    }),
    [agendamentosPorEmpresa]
  );

  const atualizarStatus = (id, novoStatus) => {
    updateMutation.mutate({ id, data: { status: novoStatus } });
  };

  const abrirDetalhes = (agendamento) => {
    setAgendamentoSelecionado(agendamento);
    setModalAberto(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          {user.role === "admin"
            ? "Painel Administrativo"
            : "Painel da Empresa"}
        </h1>
        <p className="text-slate-600">
          {user.role === "admin"
            ? "Gerencie todos os agendamentos do sistema"
            : "Gerencie os seus agendamentos"}
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCards
          titulo="Total"
          valor={stats.total}
          icon={Calendar}
          cor="from-slate-500 to-slate-600"
        />
        <StatsCards
          titulo="Pendentes"
          valor={stats.pendentes}
          icon={Clock}
          cor="from-yellow-500 to-yellow-600"
        />
        <StatsCards
          titulo="Confirmados"
          valor={stats.confirmados}
          icon={CheckCircle2}
          cor="from-blue-500 to-blue-600"
        />
        <StatsCards
          titulo="Concluídos"
          valor={stats.concluidos}
          icon={CheckCircle2}
          cor="from-green-500 to-green-600"
        />
      </div>

      {/* Filtros e Agendamentos */}
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Agendamentos</span>
            <Tabs value={filtroStatus} onValueChange={setFiltroStatus}>
              <TabsList className="bg-slate-100">
                <TabsTrigger value="todos">Todos</TabsTrigger>
                <TabsTrigger value="pendente">Pendentes</TabsTrigger>
                <TabsTrigger value="confirmado">Confirmados</TabsTrigger>
                <TabsTrigger value="concluido">Concluídos</TabsTrigger>
                <TabsTrigger value="cancelado">Cancelados</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-900" />
            </div>
          ) : agendamentosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500 text-lg">
                Nenhum agendamento encontrado
              </p>
            </div>
          ) : (
            <div className="grid gap-4">
              {agendamentosFiltrados.map((agendamento) => (
                <AgendamentoCard
                  key={agendamento.id}
                  agendamento={agendamento}
                  onAtualizarStatus={atualizarStatus}
                  onVerDetalhes={abrirDetalhes}
                  statusConfig={statusConfig}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modal de Detalhes */}
      {modalAberto && (
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
