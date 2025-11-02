import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password)
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });

    const senhaValida = await bcrypt.compare(password, user.password);
    if (!senhaValida)
      return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });

    // Aqui você pode criar um JWT ou sessão se quiser
    return NextResponse.json({ message: "Login bem-sucedido", user });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
