"use client";
import { useState } from "react";
import { useSessionContext } from "../SessionContext";
import { CreateTask } from "./CreateTask";
import { TasksVisualitation } from "./TasksVisualitation";
import { SaveTasksBox } from "./SaveTaskBox";

export const Tasks = () => {
  const sessionContext = useSessionContext();

  const [isSuccessfullyTaskSave, setIsSuccessfullyTaskSave] = useState<
    boolean | null
  >(null);

  if (!sessionContext) {
    throw new Error("Session Context Missing");
  }
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
    setIsSuccessfullyTaskSave(null);
    const res = await sessionContext.actions.saveTasksOnServer();
    setIsSuccessfullyTaskSave(res);
  };

  return (
    <>
      <SaveTasksBox
        saveTasks={saveTasks}
        isSuccessfullyTaskSave={isSuccessfullyTaskSave}
      />

      <CreateTask addNewTask={addNewTask} />

      <TasksVisualitation
        tasks={sessionContext.sessionStore.tasks}
        deleteTask={deleteTask}
        updateTask={updateTask}
      />
    </>
  );
};
