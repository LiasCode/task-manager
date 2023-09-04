"use client";
import { FormEvent, useState } from "react";
import taskStyles from "./task.module.css";

type Task = { text: string; id: string; success: boolean };

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTaskHandler = async (
    e: FormEvent<HTMLFormElement>,
    taskValue: string
  ) => {
    e.preventDefault();
    try {
      const text = taskValue;
      console.log({ text });
      if (!text) throw new Error("Invalid note");
      setTasks((prevTasks) => [
        ...prevTasks,
        { text, id: Math.random().toString(), success: false },
      ]);
    } catch (error) {
      console.error({ error });
    }
  };
  return (
    <>
      <CreateTask addTaskHandler={addTaskHandler} />
      <TasksVisualitation tasks={tasks.reverse()} />
    </>
  );
};

const CreateTask = ({
  addTaskHandler,
}: {
  addTaskHandler: (
    e: FormEvent<HTMLFormElement>,
    taskValue: string
  ) => Promise<void>;
}) => {
  const [newTask, setNewTask] = useState("");

  return (
    <form
      onSubmit={(e) => addTaskHandler(e, newTask)}
      className={taskStyles.createTask}
    >
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

const TasksVisualitation = ({ tasks }: { tasks: Task[] }) => {
  return (
    <div className={taskStyles.taskVisualitation}>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input type="checkbox" />
            <span>{task.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
