import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });

    // Buscar usuário normal
    const user = await prisma.user.findUnique({ where: { email } });

    if (user && user.password && (await bcrypt.compare(password, user.password))) {
      return NextResponse.json({
        message: "Login bem-sucedido",
        tipo: "usuario",
        user,
      });
    }

    // Buscar instituição
    const inst = await prisma.institution.findUnique({ where: { email } });

    if (inst && inst.password && (await bcrypt.compare(password, inst.password))) {
      return NextResponse.json({
        message: "Login bem-sucedido",
        tipo: "instituicao",
        instituicao: inst,
      });
    }

    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  } catch (err: any) {
    console.error("💥 Erro detalhado:", err);
    return NextResponse.json(
      { error: "Erro interno do servidor", detalhe: err.message },
      { status: 500 }
    );
  }
}
