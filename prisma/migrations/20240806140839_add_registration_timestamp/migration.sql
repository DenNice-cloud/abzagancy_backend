/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Positions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "registrationTimestamp" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Positions_id_key" ON "Positions"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
