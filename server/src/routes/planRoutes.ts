import { Router } from "express";
import { prisma } from "..";

const router = Router();

router.get("/plan", async (req, res, next) => {
	try {
		const data = await prisma.plan.findMany({
			orderBy: { updated_at: "desc" },
		});
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

router.post("/plan", async (req, res, next) => {
	const currentDate = new Date().toISOString();
	try {
		const data = await prisma.plan.create({
			data: {
				name: "test",
				created_at: currentDate,
				updated_at: currentDate,
				user_id: 1,
			},
		});
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
