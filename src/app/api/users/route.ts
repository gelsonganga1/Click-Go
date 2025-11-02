// src/app/api/users/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { fullName, email, password, tel, birthDate } = await req.json();

    if (!fullName || !email || !password || !tel) {
      return NextResponse.json({ error: "Todos os campos obrigatórios" }, { status: 400 });
    }

    // Hash da senha com trim para evitar espaços extras
    const hashedPassword = await bcrypt.hash(password.trim(), 10);

    const user = await prisma.user.create({
      data: {
        full_name: fullName.trim(),
        email: email.trim(),
        password: hashedPassword,
        tel: tel.trim(),
        birth_date: birthDate ? new Date(birthDate) : undefined,
      },
    });

    // Remover senha antes de retornar
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({ message: "Conta criada com sucesso", user: userWithoutPassword });
  } catch (err: any) {
    if (err.code === "P2002") {
      return NextResponse.json({ error: "Email ou telefone já cadastrado" }, { status: 400 });
    }
    console.error("Register error:", err);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
