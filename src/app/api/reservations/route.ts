import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const reservas = await prisma.reservation.findMany();
  return NextResponse.json({ reservas });
}

export async function POST(req: Request) {
  const data = await req.json();
  const { nome_completo, email, telefone, tipo_servico, data_agendamento, horario, documento, observacoes } = data;

  if (!nome_completo || !email || !telefone || !tipo_servico || !data_agendamento || !horario)
    return NextResponse.json({ error: "Campos obrigatórios em falta" }, { status: 400 });

  const reserva = await prisma.reservation.create({
    data: {
      nome_completo,
      email,
      telefone,
      documento,
      tipo_servico,
      data_agendamento: new Date(data_agendamento),
      horario,
      observacoes,
    },
  });

  return NextResponse.json({ message: "Reserva criada com sucesso", reserva }, { status: 201 });
}
