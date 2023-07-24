import { Router } from "express";
import { prisma } from "..";

const router = Router();

router.get("/user", async (req, res, next) => {
	try {
		await prisma.user.findUnique({ where: { id: 1 } });
	} catch (error) {
		next(error);
	}
});

router.post("/user", async (req, res, next) => {
	try {
		const data = await prisma.user.create({
			data: { name: "anrei", email: "doru@gmail.com", password: "ticu" },
		});
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
});

export default router;
