"use client";
import { FormEvent, useEffect, useState } from "react";
import taskStyles from "./task.module.css";
import { Task } from "@/models/Task";

export const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      await syncTasks();
    })();
  }, []);

  const syncTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/tasks");
      const taskData = (await res.json()) as {
        success: boolean;
        data: Task[];
      };
      if (!taskData.success) {
        throw new Error("Error Trying get Tasks");
      }
      setTasks(taskData.data);
      setLoading(false);
      console.log({ taskData });
    } catch (error) {
      setLoading(false);
      console.error({ error });
    }
  };

  const addNewTask = async (taskValue: string) => {
    try {
      const text = taskValue;
      if (!text) throw new Error("Invalid note");
      const result = await fetch("/api/tasks", {
        method: "POST",
        body: JSON.stringify({ text: text }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = (await result.json()) as {
        success: boolean;
        data: Task;
      };
      if (!response.success) {
        throw new Error("Error to Create new Task");
      }
      setTasks((t) => [...t, response.data]);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      <CreateTask addNewTask={addNewTask} />
      {!loading && <TasksVisualitation tasks={tasks.reverse()} />}
      {loading && <span>Loading Tasks...</span>}
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
      {tasks.length === 0 && <span>...empty tasks</span>}
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
