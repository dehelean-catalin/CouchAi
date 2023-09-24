import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express, { json } from "express";
import path from "path";
import exerciseRoutes from "./routes/exerciseRoutes";
import planRoutes from "./routes/planRoutes";
import userRoutes from "./routes/userRoutes";

export const prisma = new PrismaClient();

const app = express();

app.use(json(), cors());

app.use(exerciseRoutes);
app.use(userRoutes);
app.use(planRoutes);

app.use(express.static(path.join(__dirname, "uploads")));

app.all("*", (req, res) => {
	res.status(404).json({ code: 404, message: "Not found" });
});

const port = 5000;

app.listen(5000, () => console.log(`Server is running on port: ${port}`));
