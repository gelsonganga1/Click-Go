import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Salva no banco
    const reserva = await prisma.reservation.create({
      data: {
        nome_completo: data.nome_completo,
        email: data.email,
        telefone: data.telefone,
        documento: data.documento,
        tipo_servico: data.tipo_servico,
        data_agendamento: data.data_agendamento,
        horario: data.horario,
        observacoes: data.observacoes,
        status: "pendente",
        criado_em: new Date(),
      },
    });

    return NextResponse.json(reserva);
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return NextResponse.json({ error: "Erro ao criar reserva" }, { status: 500 });
  }
}

