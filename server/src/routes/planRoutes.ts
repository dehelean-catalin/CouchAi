import { Router } from "express";
import {
	createPlan,
	getAllPlans,
	updatePlan,
} from "../controllers/planController";

const router = Router();

router.get("/plan", getAllPlans);
router.post("/plan", createPlan);
router.put("/plan", updatePlan);

export default router;
