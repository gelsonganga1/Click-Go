// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Dados recebidos no backend:", body);

    const { full_name, email, password, tel, birth_date } = body;

    if (!full_name || !email || !password || !tel) {
      console.log("Erro: algum campo obrigatório está vazio");
      return NextResponse.json(
        { error: "Todos os campos obrigatórios" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Senha hasheada:", hashedPassword);

    const user = await prisma.user.create({
      data: {
        full_name,
        email,
        password: hashedPassword,
        tel,
        birth_date: birth_date ? new Date(birth_date) : undefined,
      },
    });

    console.log("Usuário criado:", user);
    return NextResponse.json({ message: "Conta criada com sucesso", user });
  } catch (err: any) {
    console.error("Erro no backend:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
