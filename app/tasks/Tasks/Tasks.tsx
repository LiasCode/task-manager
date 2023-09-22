"use client";
import { useState } from "react";
import { useSessionContext } from "@/components/SessionContext";
import { CreateTask } from "./CreateTask";
import { TasksVisualitation } from "./TasksVisualitation";

export const Tasks = () => {
  const sessionContext = useSessionContext();

  if (!sessionContext) {
    throw new Error("Session Context Missing");
  }
  const [loading, _setLoading] = useState<boolean>(false);

  const addNewTask = async (taskValue: string) => {
    sessionContext.actions.addTask(taskValue);
  };

  const deleteTask = async (indexTask: number) => {
    sessionContext.actions.removeTask({ index: indexTask });
  };

  const updateTask = async (
    indexTask: number,
    data: { text: string; success: boolean }
  ) => {
    sessionContext.actions.updateTask(indexTask, data);
  };

  const saveTasks = async () => {
    await sessionContext.actions.saveTasksOnServer();
  };

  return (
    <>
      <button
        type="button"
        style={{
          display: "inline",
          padding: "10px",
          backgroundColor: "transparent",
          outline: "none",
          border: "1px solid var(--primary-detail)",
        }}
        onClick={saveTasks}
      >
        Save
      </button>
      <CreateTask addNewTask={addNewTask} />

      {!loading && (
        <TasksVisualitation
          tasks={sessionContext.sessionStore.tasks}
          deleteTask={deleteTask}
          updateTask={updateTask}
        />
      )}
    </>
  );
};
