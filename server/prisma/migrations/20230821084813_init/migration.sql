-- CreateEnum
CREATE TYPE "TargetMuscle" AS ENUM ('Neck', 'Traps', 'Shoulders', 'Biceps', 'Triceps', 'Forearms', 'Chest', 'Abs', 'Lats', 'MiddleBack', 'LowerBack', 'Glutes', 'Aductors', 'Qudriceps', 'Hamstring', 'Calves', 'Cardio');

-- CreateEnum
CREATE TYPE "ExerciseCategory" AS ENUM ('WeightAndReps', 'Reps', 'DistanceAndTime', 'Time');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" VARCHAR(30) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exercise" (
    "id" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "instructions" VARCHAR(200) NOT NULL,
    "category" "ExerciseCategory" NOT NULL DEFAULT 'WeightAndReps',
    "target_muscle" "TargetMuscle" NOT NULL,
    "author_id" TEXT,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT DEFAULT 'private',
    "user_id" TEXT NOT NULL,
    "like_count" INTEGER NOT NULL DEFAULT 0,
    "picture" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanItem" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(60) NOT NULL,
    "planId" TEXT NOT NULL,
    "day" INTEGER NOT NULL,

    CONSTRAINT "PlanItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanExercise" (
    "id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,

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
CREATE TABLE "SetInProgress" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "notes" TEXT NOT NULL,
    "dificulty" TEXT NOT NULL,

    CONSTRAINT "SetInProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Exercise_id_key" ON "Exercise"("id");

-- CreateIndex
CREATE UNIQUE INDEX "PlanSet_id_key" ON "PlanSet"("id");

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanItem" ADD CONSTRAINT "PlanItem_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanExercise" ADD CONSTRAINT "PlanExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlanSet" ADD CONSTRAINT "PlanSet_planexercise_id_fkey" FOREIGN KEY ("planexercise_id") REFERENCES "PlanExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
