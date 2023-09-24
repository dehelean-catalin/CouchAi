import { Router } from "express";
import {
	createExercise,
	getAllExercises,
} from "../controllers/exerciseController";
import upload from "../middleware/fileUpload";

const router = Router();

router.get("/exercises", getAllExercises);
router.get("/exercises/:id");
router.post("/exercises", upload.single("file"), createExercise);
router.put("/exercises/:id");
router.delete("/exercises/:id");

export default router;
