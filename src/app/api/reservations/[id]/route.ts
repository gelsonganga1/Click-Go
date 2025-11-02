import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // ou o caminho correto do teu client Prisma

export async function PATCH(
  req: Request,
  context: { params: { id: string } } // ✅ tipagem nova e correta
) {
  try {
    const { id } = context.params;
    const { status } = await req.json();

    const updated = await prisma.reservation.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Erro ao atualizar reserva:", error);
    return NextResponse.json(
      { error: "Erro ao atualizar reserva" },
      { status: 500 }
    );
  }
}

