import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const reservas = await prisma.reservation.findMany({
      orderBy: { criado_em: "desc" }, // ✅ usa o campo certo
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


