import { RequestHandler } from "express";
import path from "path";
import { prisma } from "..";
import { Exercise } from "../models/exerciseModels";

export const getAllExercises: RequestHandler = async (req, res, next) => {
	try {
		const data = await prisma.exercise.findMany();

		res.status(200).json(data);
	} catch (error) {
		next(error);
	}
};

export const createExercise: RequestHandler<any, any, {data:Exercise}> = async (
	req,
	res,
	next
) => {
	try {
		console.log(req.body, req.file);
		prisma.exercise.create({ data: {
			instructions:"",
		} });

		res.status(200).json("hehe");
	} catch (error) {
		next(error);
	}
};

export const uploadFile: RequestHandler = async (req, res, next) => {
	try {
		console.log(req.file);
		res.status(200).json(req.file);
	} catch (error) {
		next(error);
	}
};

export const getFile: RequestHandler = async (req, res, next) => {
	try {
		const { path: filename } = req.params;
		const parentDir = path.join(__dirname, "..");
		const uploadsFolder = path.join(parentDir, "uploads");
		const filePath = path.join(uploadsFolder, filename);
		res.sendFile(filePath);
	} catch (error) {
		next(error);
	}
};
