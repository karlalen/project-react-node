// backend/src/app.ts
import "dotenv/config";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

console.log("APP TS EJECUTADO");

const app = express();

const SECRET_KEY = process.env.SECRET_KEY || "mi_clave_secreta";

// Activamos CORS para permitir peticiones desde el frontend
app.use(cors());

// Middleware para leer JSON del body
app.use(express.json());

// Rutas públicas

app.get("/", (req: Request, res: Response) => {
  res.send("Backend is working!");
});

app.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
});

// Middleware JWT

const verifyToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: "Token requerido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};

// Ruta protegida -------------------------------------------------------

app.get("/private", verifyToken, (req: Request, res: Response) => {
  res.json({ message: "Acceso permitido" });
});

// Rutas /tasks (sin protección, como indica la consigna)
app.get("/tasks", async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  } catch (error) {
    console.log("Error en get /tasks", error);
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

app.post("/tasks", async (req: Request, res: Response) => {
  try {
    const { text } = req.body;
    const tieneRepetidos = /(.)\1{2,}/.test(text || "");

    if (!text || !text.trim() || tieneRepetidos) {
      return res.status(400).json({ error: "Texto de tarea inválido" });
    }
    
    const newTask = await prisma.task.create({
      data: {
        text: req.body.text,
        done: false,
      },
    });
    res.json(newTask);
  } catch (error) {
    console.log("Error en post /tasks:", error);
  }
});

// DELETE — elimina una tarea de la base de datos por id
app.delete("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Tarea eliminada", id });
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    console.log("Error en delete /tasks/:id:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

app.put("/tasks/:id", async (req: Request, res: Response) => {
  try {
    const taskId = Number(req.params.id);
    const updatedTask = await prisma.task.update({
      where: { id: taskId },
      data: {
        done: req.body.done,
      },
    });
    res.json(updatedTask);
  } catch {
    // error ignorado intencionalmente
  }
});

export default app;