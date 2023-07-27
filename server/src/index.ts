import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { json } from "express";
import exerciseRoutes from "./routes/exerciseRoutes";
import planRoutes from "./routes/planRoutes";
import userRoutes from "./routes/userRoutes";

export const prisma = new PrismaClient();

const app = express();

app.use(json(), cors());
app.use(userRoutes);
app.use(planRoutes);
app.use(exerciseRoutes);

app.all("*", (req, res) => {
	res.status(404).json({ code: 404, message: "Not found" });
});

const port = 4000;

app.listen(4000, () => console.log(`Server is running on port: ${port}`));
