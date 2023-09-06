import { Task } from "@/models/Task";
import taskStyles from "./task.module.css";

export const TasksVisualitation = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className={taskStyles.taskVisualitation}>
      {tasks.length === 0 && <span>...empty tasks</span>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" checked={task.success} />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
