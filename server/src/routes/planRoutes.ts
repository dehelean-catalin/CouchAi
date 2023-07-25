import { Router } from "express";
import { createPlan, getAllPlans } from "../controllers/planController";

const router = Router();

router.get("/plan", getAllPlans);
router.post("/plan", createPlan);

export default router;
