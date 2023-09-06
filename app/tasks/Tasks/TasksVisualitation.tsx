import { Task } from "@/models/Task";
import taskStyles from "./task.module.css";
import { useSessionContext } from "@/components/SessionContext";

export const TasksVisualitation = ({ tasks }: { tasks: Task[] }) => {
  const sessionContext = useSessionContext();

  const updateTask = async (data: Task) => {
    try {
      console.log({ data });
      const result = await fetch("/api/tasks", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = (await result.json()) as {
        success: boolean;
        data: Task;
      };
      if (!response.success) {
        throw new Error("Error to Update Task");
      }
      const prevTasks = sessionContext?.sessionStore.tasks;

      const targetTask = prevTasks?.find((t) => t.id === response.data.id);

      if (targetTask === undefined) {
        throw new Error("Error to Update Task");
      }
      targetTask.success = response.data.success;
      targetTask.text = response.data.text;

      sessionContext?.actions.setTasks(prevTasks as Task[]);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <div className={taskStyles.taskVisualitation}>
      {tasks.length === 0 && <span>...empty tasks</span>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.success}
              onChange={() => updateTask({ ...task, success: !task.success })}
            />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
