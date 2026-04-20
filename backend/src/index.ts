//cargando variables del archivo .env
require("dotenv").config();

console.log("INDEX TS EJECUTADO");
// importando express
const express = require("express");

// Importando cors — permite que el frontend (React) se comunique con el backend
const cors = require("cors");

const {PrismaClient} = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

//creamos el adaptador
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter});

const app = express();
//const PORT = 3000;
const PORT = process.env.PORT || 3000;

// Activamos CORS para permitir peticiones desde el frontend
app.use(cors());

// Middleware para leer JSON del body
app.use(express.json());

/*let tasks = [
  { id: 1, text: "Study Express", done: false },
  { id: 2, text: "Build backend", done: true },
];*/



app.get("/", (req: any, res: any) => {
  res.send("Backend is working!");
});
app.get("/tasks", async( req: any, res:any) => {
  try{
    const tasks = await prisma.task.findMany();
    res.json(tasks);
  }catch (error){
    console.log("Error en get /tasks", error);
     res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// GET — retorna todas las tareas almacenadas en el servidor
/*app.get("/tasks", (req: any, res: any) => {
  res.json(tasks);
});*/

// POST — crea una nueva tarea y la agrega a la lista
/*app.post("/tasks", (req: any, res: any) => {
  const newTask = {
    id: req.body.id,
    text: req.body.text,
    done: req.body.done,
  };
  tasks.push(newTask);
  res.json(newTask);
});*/
app.post("/tasks", async (req: any, res: any) => {
  try {
    const newTask = await prisma.task.create({
      data: {
        text: req.body.text,
        done: false
      }
    });
    res.json(newTask);
  } catch(error) {
    console.log("Error en post /tasks:", error);
  }
});

// DELETE — elimina la tarea con el id indicado
/*app.delete("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const exists = tasks.some((t) => t.id === id);

  if (!exists) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: "Tarea eliminada", id });
});*/

// DELETE — elimina una tarea de la base de datos por id
app.delete("/tasks/:id", async (req: any, res: any) => {
  try {
    const id = Number(req.params.id);

    await prisma.task.delete({
      where: { id },
    });

    res.json({ message: "Tarea eliminada", id });
  } catch (error: any) {
    // Prisma lanza P2025 cuando el registro no existe
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Tarea no encontrada" });
    }
    console.log("Error en delete /tasks/:id:", error);
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

// PUT — actualiza el campo 'done' de una tarea existente
/*app.put("/tasks/:id", (req: any, res: any) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: "Tarea no encontrada" });
  }

  task.done = req.body.done;
  res.json(task);
});*/

app.put("/tasks/:id", async (req: any, res: any) => {
  try{
    const taskId = Number(req.params.id);
    const updatedTask = await prisma.task.update({
      where: {id: taskId},
      data: {
        done:req.body.done
      }
    });
    res.json(updatedTask);
  }catch(error){

  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
