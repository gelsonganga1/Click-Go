import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * GET /api/reservations
 * Retorna todas as reservas
 */
export async function GET() {
  try {
    const reservas = await prisma.reservation.findMany({
      orderBy: { createdAt: "desc" }, // opcional: ordena da mais recente
    });

    return NextResponse.json(reservas);
  } catch (error) {
    console.error("Erro ao buscar reservas:", error);
    return NextResponse.json(
      { error: "Erro ao buscar reservas" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/reservations
 * Cria uma nova reserva
 */
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const {
      nome_completo,
      email,
      telefone,
      tipo_servico,
      data_agendamento,
      horario,
      documento,
      observacoes,
    } = data;

    if (
      !nome_completo ||
      !email ||
      !telefone ||
      !tipo_servico ||
      !data_agendamento ||
      !horario
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios em falta" },
        { status: 400 }
      );
    }

    const reserva = await prisma.reservation.create({
      data: {
        nome_completo,
        email,
        telefone,
        documento: documento || "",
        tipo_servico,
        data_agendamento: new Date(data_agendamento),
        horario,
        observacoes: observacoes || "",
      },
    });

    return NextResponse.json(
      { message: "Reserva criada com sucesso", reserva },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro ao criar reserva:", error);
    return NextResponse.json(
      { error: "Erro ao criar reserva" },
      { status: 500 }
    );
  }
}

