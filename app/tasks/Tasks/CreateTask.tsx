import { FormEvent, useState } from "react";
import taskStyles from "./task.module.css";

type CreateTaskProps = { addNewTask: (taskValue: string) => Promise<void> };

export const CreateTask = ({ addNewTask }: CreateTaskProps) => {
  const [newTask, setNewTask] = useState("");

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setNewTask("");
      await addNewTask(newTask);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <form onSubmit={submitHandler} className={taskStyles.createTask}>
      <input
        type="text"
        name="newTask"
        placeholder="new task"
        required
        onChange={(e) => setNewTask(e.target.value)}
        value={newTask}
      />
      <button type="submit">Add</button>
    </form>
  );
};
