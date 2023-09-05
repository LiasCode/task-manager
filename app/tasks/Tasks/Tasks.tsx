"use client";
import { useEffect, useState } from "react";
import { Task } from "@/models/Task";
import { useSessionContext } from "@/components/SessionContext";
import { CreateTask } from "./CreateTask";
import { TasksVisualitation } from "./TasksVisualitation";

export const Tasks = () => {
  const sessionContext = useSessionContext();
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
      sessionContext?.actions.setTasks(taskData.data);
      setLoading(false);
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
      sessionContext?.actions.setTasks([
        ...(sessionContext.sessionStore.tasks || []),
        response.data,
      ]);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <>
      <CreateTask addNewTask={addNewTask} />
      {!loading && (
        <TasksVisualitation
          tasks={sessionContext?.sessionStore.tasks?.reverse() || []}
        />
      )}
      {loading && <span>Loading Tasks...</span>}
    </>
  );
};
