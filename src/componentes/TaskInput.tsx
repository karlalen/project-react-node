import './TaskInput.css';
import { useState } from "react";

type TaskInputProps = {
  onAdd: (text: string) => void;
};

function TaskInput({ onAdd }: TaskInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);


  const handleAdd = () => {
    if (!value.trim()) {
      alert("Tarea no valida");
      return;
    }
     setError(false);
    onAdd(value.trim());
    setValue("");
  };

  return (
     <div className="task-input-container">
            <input
                className="task-input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
                placeholder=" Escribe una nueva tarea..."
            />
            <button className="add-button" onClick={handleAdd}>
                 Agregar
            </button>
        </div>
  );
}

export default TaskInput;