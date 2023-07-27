import { RequestHandler } from "express";
import { prisma } from "..";

export const getAllExercises: RequestHandler = async (req, res, next) => {
	try {
		const data = await prisma.exercise.findMany();

		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

export const createExercise: RequestHandler = async (req, res, next) => {
	console.log(req.body);
	try {
		const data = await prisma.exercise.create({ data: req.body });
		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
};
