import './EmptyState.css';

interface EmptyStateProps {
    message?: string;
}

function EmptyState({ message = "No hay tareas aún" }: EmptyStateProps) {
    return (
        <div className="empty-state">
            <h3>{message}</h3>
        </div>
    );
}

export default EmptyState;