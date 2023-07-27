/*
  Warnings:

  - Added the required column `day` to the `PlanItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlanItem" ADD COLUMN     "day" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "PlanExercise" (
    "id" TEXT NOT NULL,
    "exercise_id" INTEGER NOT NULL,

    CONSTRAINT "PlanExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanSet" (
    "id" TEXT NOT NULL,
    "min_reps" INTEGER NOT NULL DEFAULT 0,
    "max_reps" INTEGER NOT NULL DEFAULT 0,
    "rest_time" TIME NOT NULL,
    "planexercise_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SetInProgress" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "dificulty" TEXT NOT NULL,

    CONSTRAINT "SetInProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlanSet_id_key" ON "PlanSet"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSet" ADD CONSTRAINT "PlanSet_planexercise_id_fkey" FOREIGN KEY ("planexercise_id") REFERENCES "PlanExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
