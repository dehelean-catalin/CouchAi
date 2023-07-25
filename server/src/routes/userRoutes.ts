import { Router } from "express";
import { prisma } from "..";

const router = Router();

router.get("/user/:id", async (req, res, next) => {
	const { id } = req.params;
	try {
		const user = await prisma.user.findUnique({ where: { id } });
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

router.post("/user", async (req, res, next) => {
	const { name, email, password } = req.body;
	try {
		const user = await prisma.user.create({
			data: { name, email, password },
		});
		res.status(200).json(user);
	} catch (error) {
		next(error);
	}
});

export default router;
