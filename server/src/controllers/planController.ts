import { RequestHandler } from "express";
import { prisma } from "..";

export const getAllPlans: RequestHandler = async (req, res, next) => {
	const { id } = req.params;
	try {
		const yourPlans = await prisma.plan.findMany({
			where: { user_id: id },
			orderBy: { updated_at: "desc" },
		});
		const mostPopular = await prisma.plan.findMany({
			orderBy: { like_count: "desc" },
			take: 6,
		});

		res.status(200).json({ yourPlans, mostPopular });
	} catch (error) {
		next(error);
	}
};

export const createPlan: RequestHandler<
	any,
	any,
	{ name: string; user_id: string }
> = async (req, res, next) => {
	const { name, user_id } = req.body;
	const currentDate = new Date().toISOString();
	try {
		const data = await prisma.plan.create({
			data: {
				name,
				created_at: currentDate,
				updated_at: currentDate,
				user_id,
			},
		});
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

export const updatePlan: RequestHandler<
	any,
	any,
	{ name: string; user_id: string }
> = async (req, res, next) => {
	const { name, user_id } = req.body;
	const currentDate = new Date().toISOString();
	try {
		const data = await prisma.plan.create({
			data: {
				name,
				updated_at: currentDate,
				user_id,
			},
		});
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
};
