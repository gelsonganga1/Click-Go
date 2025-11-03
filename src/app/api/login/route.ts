import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json(
        { error: "Email e senha obrigatórios" },
        { status: 400 }
      );

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return NextResponse.json({ error: "Senha incorreta" }, { status: 401 });

    // Remove senha antes de retornar
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ message: "Login realizado com sucesso", user: userWithoutPassword });
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}

