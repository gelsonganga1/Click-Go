-- CreateTable Users
CREATE TABLE "Users" (
    "id" INTEGER PRIMARY KEY,
    "full_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "birth_date" DATETIME,
    "avatar_url" TEXT,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable Institution
CREATE TABLE "Institution" (
    "id" INTEGER PRIMARY KEY,
    "nome_instituicao" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "tel" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "servicos" TEXT,
    "avatar_url" TEXT,
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable Reservation
CREATE TABLE "Reservation" (
    "id" INTEGER PRIMARY KEY,
    "nome_completo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "documento" TEXT,
    "tipo_servico" TEXT NOT NULL,
    "data_agendamento" DATETIME NOT NULL,
    "horario" TEXT NOT NULL,
    "observacoes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "criado_em" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex Users
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
CREATE UNIQUE INDEX "Users_tel_key" ON "Users"("tel");

-- CreateIndex Institution
CREATE UNIQUE INDEX "Institution_email_key" ON "Institution"("email");
CREATE UNIQUE INDEX "Institution_tel_key" ON "Institution"("tel");
