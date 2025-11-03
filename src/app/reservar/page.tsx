"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, Clock, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const horariosDisponiveis = [
  "08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30",
  "13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00"
];

const servicosInfo = {
  bancario: { label: "Atendimento Bancário", icon: "🏦" },
  ministerio: { label: "Ministério", icon: "🏛️" },
  consulado: { label: "Consulado", icon: "🌍" },
  cartorio: { label: "Cartório", icon: "📋" },
  outros: { label: "Outros Serviços", icon: "📌" },
};

export default function Agendar() {
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [formData, setFormData] = useState({
    nome_completo: "",
    email: "",
    telefone: "",
    documento: "",
    tipo_servico: "",
    data_agendamento: "",
    horario: "",
    observacoes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simula o processo de reserva localmente
    setTimeout(() => {
      setLoading(false);
      setSucesso(true);
      setFormData({
        nome_completo: "",
        email: "",
        telefone: "",
        documento: "",
        tipo_servico: "",
        data_agendamento: "",
        horario: "",
        observacoes: "",
      });

      setTimeout(() => setSucesso(false), 5000);
    }, 1500);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-900 mb-3">Agende seu Atendimento</h1>
          <p className="text-slate-600 text-lg">Escolha o melhor horário para ser atendido</p>
        </motion.div>

        <AnimatePresence mode="wait">
          {sucesso ? (
            <motion.div key="sucesso" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="text-center py-16">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-3">Agendamento Realizado!</h2>
              <p className="text-slate-600 text-lg mb-6">Seu agendamento foi registrado com sucesso.</p>
              <Button onClick={() => setSucesso(false)} className="bg-blue-900 hover:bg-blue-800">Fazer Novo Agendamento</Button>
            </motion.div>
          ) : (
            <motion.div key="formulario" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Card className="border-none shadow-2xl">
                <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50/50 pb-6">
                  <CardTitle className="text-2xl flex items-center gap-2"><Calendar className="w-6 h-6 text-blue-900" /> Dados do Agendamento</CardTitle>
                  <CardDescription className="text-base">Preencha seus dados e escolha data e horário</CardDescription>
                </CardHeader>
                <CardContent className="pt-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Informações Pessoais */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">👤 Informações Pessoais</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome Completo *</Label>
                          <Input id="nome" value={formData.nome_completo} onChange={(e) => handleChange("nome_completo", e.target.value)} placeholder="Seu nome completo" required className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="documento">CPF/RG/Passaporte</Label>
                          <Input id="documento" value={formData.documento} onChange={(e) => handleChange("documento", e.target.value)} placeholder="Número do documento" className="h-11" />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input id="email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} placeholder="seu@email.com" required className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="telefone">Telefone *</Label>
                          <Input id="telefone" value={formData.telefone} onChange={(e) => handleChange("telefone", e.target.value)} placeholder="(00) 00000-0000" required className="h-11" />
                        </div>
                      </div>
                    </div>

                    {/* Tipo de serviço */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">🎯 Tipo de Atendimento</h3>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {Object.entries(servicosInfo).map(([key, info]) => (
                          <button key={key} type="button" onClick={() => handleChange("tipo_servico", key)} className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${formData.tipo_servico === key ? "border-blue-900 bg-blue-50 shadow-lg" : "border-slate-200 hover:border-slate-300"}`}>
                            <div className="text-3xl mb-2">{info.icon}</div>
                            <div className="text-xs font-medium text-slate-700">{info.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Data e Horário */}
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900 text-lg flex items-center gap-2">📅 Data e Horário</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="data">Data *</Label>
                          <Input id="data" type="date" value={formData.data_agendamento} onChange={(e) => handleChange("data_agendamento", e.target.value)} min={new Date().toISOString().split("T")[0]} required className="h-11" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="horario">Horário *</Label>
                          <Select value={formData.horario} onValueChange={(value) => handleChange("horario", value)} required>
                            <SelectTrigger className="h-11">
                              <SelectValue placeholder="Selecione o horário" />
                            </SelectTrigger>
                            <SelectContent>
                              {horariosDisponiveis.map((hora) => (
                                <SelectItem key={hora} value={hora}>
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    {hora}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>

                    {/* Observações */}
                    <div className="space-y-2">
                      <Label htmlFor="obs">Observações</Label>
                      <Textarea id="obs" value={formData.observacoes} onChange={(e) => handleChange("observacoes", e.target.value)} placeholder="Informações adicionais..." rows={4} className="resize-none" />
                    </div>

                    {/* Botão */}
                    <Button type="submit" disabled={loading} className="w-full h-12 bg-blue-900 hover:bg-blue-800 text-lg font-semibold shadow-lg">
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processando...
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-5 h-5 mr-2" />
                          Confirmar Agendamento
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

