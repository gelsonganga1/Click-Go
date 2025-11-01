import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const data = await req.json();
  const { nome_instituicao, email, tel, password, servicos } = data;

  if (!nome_instituicao || !email || !tel || !password)
    return NextResponse.json({ error: "Campos obrigatórios em falta" }, { status: 400 });

  const existing = await prisma.institution.findUnique({ where: { email } });
  if (existing)
    return NextResponse.json({ error: "Email já registado" }, { status: 400 });

  const hash = crypto.createHash("md5").update(email.trim().toLowerCase()).digest("hex");
  const avatar_url = `https://www.gravatar.com/avatar/${hash}?d=identicon`;

  const newInst = await prisma.institution.create({
    data: {
      nome_instituicao,
      email,
      tel,
      password: await bcrypt.hash(password, 10),
      servicos: servicos?.length ? servicos.join(",") : null,
      avatar_url,
    },
  });

  return NextResponse.json({ message: "Instituição criada com sucesso", instituicao: newInst }, { status: 201 });
}
