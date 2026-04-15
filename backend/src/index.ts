const express = require("express");

// Importando cors — permite que el frontend (React) se comunique con el backend
const cors = require("cors");

const {PrismaClient} = require("@prisma/client");

const app = express();
const PORT = 3000;

// Activamos CORS para permitir peticiones desde el frontend
app.use(cors());

// Middleware para leer JSON del body
app.use(express.json());

let tasks = [
  { id: 1, text: "Study Express", done: false },
  { id: 2, text: "Build backend", done: true },
];

app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});

// GET — retorna todas las tareas almacenadas en el servidor
app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});

// POST — crea una nueva tarea y la agrega a la lista
app.post("/tasks", (req: any, res: any) => {
  const newTask = {
    id: req.body.id,
    text: req.body.text,
    done: req.body.done,
  };
  tasks.push(newTask);
  res.json(newTask);
});

// DELETE — elimina la tarea con el id indicado
app.delete("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const exists = tasks.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: "Tarea eliminada", id });
});

// PUT — actualiza el campo 'done' de una tarea existente
app.put("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  task.done = req.body.done;
  res.json(task);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});