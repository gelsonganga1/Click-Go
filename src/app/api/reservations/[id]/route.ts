import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * PATCH /api/reservations/[id]
 * Atualiza o status de uma reserva
 */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { error: "O campo 'status' é obrigatório." },
        { status: 400 }
      );
    }

    const updated = await prisma.reservation.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error: any) {
    console.error("Erro ao atualizar reserva:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Reserva não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao atualizar reserva" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/reservations/[id]
 * Retorna uma reserva específica
 */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reserva = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!reserva) {
      return NextResponse.json(
        { error: "Reserva não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(reserva);
  } catch (error) {
    console.error("Erro ao buscar reserva:", error);
    return NextResponse.json(
      { error: "Erro ao buscar reserva" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/reservations/[id]
 * Exclui uma reserva
 */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await prisma.reservation.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Reserva excluída com sucesso" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Erro ao excluir reserva:", error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Reserva não encontrada" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erro ao excluir reserva" },
      { status: 500 }
    );
  }
}




