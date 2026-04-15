import TaskCard from "./TaskCard";

type Task = {
  id: number;
  text: string;
  done: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
};

function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          text={task.text}
          done={task.done}
          onToggle={() => onToggle(task.id)}
          onDelete={() => onDelete(task.id)}
        />
      ))}
    </ul>
  );
}

export default TaskList;
