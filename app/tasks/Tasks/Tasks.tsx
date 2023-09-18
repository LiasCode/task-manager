"use client";
import { useState } from "react";
import { useSessionContext } from "@/components/SessionContext";
import { CreateTask } from "./CreateTask";
import { TasksVisualitation } from "./TasksVisualitation";

export const Tasks = () => {
  const sessionContext = useSessionContext();
  const [loading, setLoading] = useState<boolean>(false);

  const addNewTask = async (taskValue: string) => {
    sessionContext?.actions.addTask(taskValue);
  };

  const deleteTask = async (indexTask: number) => {
    sessionContext?.actions.removeTask({ index: indexTask });
  };

  const updateTask = async (
    indexTask: number,
    data: { text: string; success: boolean }
  ) => {
    sessionContext?.actions.updateTask(indexTask, data);
  };

  return (
    <>
      <CreateTask addNewTask={addNewTask} />
      {!loading && (
        <TasksVisualitation
          tasks={sessionContext?.sessionStore.tasks || []}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      )}
    </>
  );
};
