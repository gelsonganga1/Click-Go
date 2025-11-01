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
    if (user && (await bcrypt.compare(password, user.password)))
      return NextResponse.json({ message: "Login bem-sucedido", tipo: "usuario", user });

    const inst = await prisma.institution.findUnique({ where: { email } });
    if (inst && (await bcrypt.compare(password, inst.password)))
      return NextResponse.json({ message: "Login bem-sucedido", tipo: "instituicao", instituicao: inst });

    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
