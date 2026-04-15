import './TaskCard.css';

interface TaskProps {
    text: string;
    done: boolean;
    onToggle: () => void;
    onDelete: () => void;
}

function TaskCard({ text, done, onToggle, onDelete }: TaskProps) {
    return (
        <li className="task-card">
            <input
                type="checkbox"
                className="task-checkbox"
                checked={done}
                onChange={onToggle}
            />
            <span className={`task-text ${done ? 'completed' : ''}`}>
                {text}
            </span>
            <button className="delete-button" onClick={onDelete}>
                 Eliminar
            </button>
        </li>
    );
}

export default TaskCard;