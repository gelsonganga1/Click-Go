import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { full_name, email, password, tel, birth_date } = await req.json();

    if (!full_name || !email || !password || !tel)
      return NextResponse.json({ error: "Todos os campos obrigatórios" }, { status: 400 });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password: hashedPassword,
        tel,
        birth_date: birth_date ? new Date(birth_date) : undefined,
      },
    });

    return NextResponse.json({ message: "Conta criada com sucesso", user });
  } catch (err: any) {
    if (err.code === "P2002") {
      // erro de unique constraint
      return NextResponse.json({ error: "Email ou telefone já cadastrado" }, { status: 400 });
    }
    console.error(err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
