import { TaskWithNotRequiredId } from "@/components/sessionContext.types";

type TaskItemProps = {
  task: TaskWithNotRequiredId;
  deleteTask: (indexTask: number) => Promise<void>;
  updateTask: (
    indexTask: number,
    data: { text: string; success: boolean }
  ) => Promise<void>;
  index: number;
};

export const TaskItem = ({
  updateTask,
  task,
  deleteTask,
  index,
}: TaskItemProps) => {
  return (
    <li
      key={index}
      className="
      flex flex-row items-center w-full h-12 border
      m-2
      justify-between pr-1 pl-1
      outline hover:outline-primaryDetail outline-offset-2
      border-none rounded bg-primaryText text-primaryBackground
      animate__animated animate__bounceIn animate__faster"
    >
      <label
        className={`rounded-md w-6 cursor-pointer  ${
          task.success ? "bg-green-500" : "bg-red-400"
        }`}
        title="add/remove if task is success"
      >
        <input
          type="checkbox"
          className="invisible"
          checked={task.success}
          onChange={() =>
            updateTask(index, { success: !task.success, text: task.text })
          }
        />
      </label>

      <input
        type={"text"}
        value={task.text}
        className={`
        flex-1 bg-transparent outline-none pl-2
          ${task.success ? "line-through" : ""}
        `}
        onChange={(e) =>
          updateTask(index, {
            success: task.success,
            text: e.currentTarget.value,
          })
        }
      />

      <button
        className="
        flex items-center justify-center
        hover:bg-red-400 rounded-md w-7 h-7
        cursor-pointer hover:text-primaryText"
        title={"delete Task"}
        onClick={() => deleteTask(index)}
      >
        X
      </button>
    </li>
  );
};
