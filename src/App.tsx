import './App.css';
import { useEffect, useState } from 'react';
import Header from './componentes/Header';
import TaskList from './componentes/TaskList';
import TaskInput from './componentes/TaskInput';
import EmptyState from './componentes/EmptyState';
import Footer from './componentes/Footer';

type Task = {
  id: number;
  text: string;
  done: boolean;
};

const API = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  // GET — carga las tareas desde el backend (fuente de verdad)
  const fetchTasks = () => {
    fetch(`${API}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((error) => console.log("Error al obtener tareas:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // POST — crea la tarea en el backend y recarga la lista
  const addTask = (text: string): void => {
    const newTask = { id: Date.now(), text, done: false };

    fetch(`${API}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((error) => console.log("Error al crear tarea:", error));
  };

  // PUT — actualiza el estado 'done' en el backend y recarga la lista
  const toggleTask = (id: number): void => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    fetch(`${API}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ done: !task.done }),
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((error) => console.log("Error al actualizar tarea:", error));
  };

  // DELETE — elimina la tarea del backend y recarga la lista
  const deleteTask = (id: number): void => {
    fetch(`${API}/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => fetchTasks())
      .catch((error) => console.log("Error al eliminar tarea:", error));
  };

  return (
    <div>
      <Header />
      <TaskInput onAdd={addTask} />
      {tasks.length === 0
        ? <EmptyState />
        : <TaskList tasks={tasks} onToggle={toggleTask} onDelete={deleteTask} />
      }
      <Footer total={tasks.length} done={tasks.filter((t) => t.done).length} />
    </div>
  );
}

export default App;