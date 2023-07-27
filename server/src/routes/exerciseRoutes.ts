import { Router } from "express";
import { createExercise } from "../controllers/exerciseController";
import { getAllPlans } from "../controllers/planController";

const router = Router();

router.get("/exercise", getAllPlans);
router.post("/exercise", createExercise);

export default router;
