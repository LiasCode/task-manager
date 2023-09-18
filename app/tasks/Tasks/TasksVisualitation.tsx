import { TaskItem } from "./TaskItem";
import taskStyles from "./task.module.css";
import { TaskWithNotRequiredId } from "@/components/SessionContext";

export const TasksVisualitation = ({
  tasks,
  deleteTask,
  updateTask,
}: {
  tasks: TaskWithNotRequiredId[];
  deleteTask: (indexTask: number) => Promise<void>;
  updateTask: (
    indexTask: number,
    data: { text: string; success: boolean }
  ) => Promise<void>;
}) => {
  return (
    <div className={taskStyles.taskVisualitation}>
      {tasks.length === 0 && <span>...empty tasks</span>}
      <ul>
        {tasks.map((task, index) => (
          <TaskItem
            updateTask={updateTask}
            task={task}
            deleteTask={deleteTask}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};
