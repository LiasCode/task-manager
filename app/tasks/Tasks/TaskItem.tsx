import { TaskWithNotRequiredId } from "@/components/SessionContext";

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
      className="animate__animated animate__bounceIn animate__faster"
    >
      <label
        style={{
          backgroundColor: task.success ? "#8cda8c" : "#f56060",
        }}
        title="add/remove if task is success"
      >
        <input
          type="checkbox"
          checked={task.success}
          onChange={() =>
            updateTask(index, { success: !task.success, text: task.text })
          }
        />
      </label>

      <input
        type={"text"}
        value={task.text}
        style={{
          textDecoration: task.success ? "line-through" : "",
        }}
        onChange={(e) =>
          updateTask(index, {
            success: task.success,
            text: e.currentTarget.value,
          })
        }
      />

      <button title={"delete Task"} onClick={() => deleteTask(index)}>
        X
      </button>
    </li>
  );
};
