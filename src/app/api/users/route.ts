import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  const data = await req.json();
  const { full_name, email, tel, password, birth_date } = data;

  if (!full_name || !email || !tel || !password)
    return NextResponse.json({ error: "Campos obrigatórios em falta" }, { status: 400 });

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "Email já registado" }, { status: 400 });

  const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
  const avatar_url = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

  const newUser = await prisma.user.create({
    data: {
      full_name,
      email,
      tel,
      password: await bcrypt.hash(password, 10),
      birth_date: birth_date ? new Date(birth_date) : null,
      avatar_url,
    },
  });

  return NextResponse.json({ message: "Conta criada com sucesso", user: newUser }, { status: 201 });
}
