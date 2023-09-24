import { TaskItem } from "./TaskItem";
import { TaskWithNotRequiredId } from "../sessionContext.types";

type TaskVisualizationProps = {
  tasks: TaskWithNotRequiredId[];
  deleteTask: (indexTask: number) => Promise<void>;
  updateTask: (
    indexTask: number,
    data: { text: string; success: boolean }
  ) => Promise<void>;
};

export const TasksVisualitation = (props: TaskVisualizationProps) => {
  return (
    <div className="w-full h-max flex flex-col items-center justify-center max-w-[600px] p-2">
      <ul className="list-none list-inside flex flex-col items-center justify-center w-full">
        {props.tasks.map((task, index) => {
          if (task.action === "delete") return null;
          return (
            <TaskItem
              key={index}
              updateTask={props.updateTask}
              task={task}
              deleteTask={props.deleteTask}
              index={index}
            />
          );
        })}
      </ul>
    </div>
  );
};
