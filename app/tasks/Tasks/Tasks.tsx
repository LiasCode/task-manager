"use client";
import { FormEvent, useState } from "react";
import taskStyles from "./task.module.css";

type Task = { text: string; id: string; success: boolean };

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const addNewTask = async (taskValue: string) => {
    try {
      const text = taskValue;
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
      <CreateTask addNewTask={addNewTask} />
      <TasksVisualitation tasks={tasks.reverse()} />
    </>
  );
};

type CreateTaskProps = { addNewTask: (taskValue: string) => Promise<void> };

const CreateTask = ({ addNewTask }: CreateTaskProps) => {
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
