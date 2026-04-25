/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "phone" TEXT;

-- CreateTable
CREATE TABLE "conversations" (
    "id" UUID NOT NULL,
    "client_id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "conversations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notes_po" (
    "id" UUID NOT NULL,
    "client_id" TEXT NOT NULL,
    "contenu" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notes_po_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_stories" (
    "id" UUID NOT NULL,
    "client_id" TEXT NOT NULL,
    "titre" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "criteres_acceptance" TEXT,
    "contexte" TEXT,
    "hors_scope" TEXT,
    "dependances" TEXT,
    "type" VARCHAR(20),
    "specs_techniques" TEXT,
    "us_parent_id" UUID,
    "statut" TEXT NOT NULL DEFAULT 'backlog',
    "priorite" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "livrables" (
    "id" UUID NOT NULL,
    "client_id" TEXT NOT NULL,
    "audit" TEXT,
    "roadmap" TEXT,
    "v1" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "livrables_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "conversations_client_id_idx" ON "conversations"("client_id");

-- CreateIndex
CREATE INDEX "notes_po_client_id_idx" ON "notes_po"("client_id");

-- CreateIndex
CREATE INDEX "user_stories_client_id_idx" ON "user_stories"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "livrables_client_id_key" ON "livrables"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
