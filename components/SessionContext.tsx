"use client";

import { Task } from "@/models/Task";
import { UserWhithoutPassword } from "@/models/User";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as TaskServices from "../services/task-services";
import { useRouter } from "next/navigation";

export type TaskWithNotRequiredId = Partial<Omit<Task, "text" | "success">> & {
  text: Task["text"];
  success: Task["success"];
  action?: "create" | "delete" | "update";
};

export type SessionStore = {
  user: UserWhithoutPassword | null;
  tasks: TaskWithNotRequiredId[];
};

export type loginUserProps = {
  user: UserWhithoutPassword;
  tasks: TaskWithNotRequiredId[];
};

export type SessionStoreActions = {
  login(data: loginUserProps): Promise<boolean>;
  logout(): Promise<boolean>;
  addTask(taskText: string): Promise<boolean>;
  removeTask(data: { index: number }): Promise<boolean>;
  updateTask(
    index: number,
    data: { success?: boolean; text?: string }
  ): Promise<boolean>;
  saveTasksOnServer(): Promise<boolean>;
};

const SessionContext = createContext<{
  sessionStore: SessionStore;
  actions: SessionStoreActions;
} | null>(null);

export const SessionContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [sessionStore, setSessionStore] = useState<SessionStore>({
    user: null,
    tasks: [],
  });
  const router = useRouter();

  const actions: SessionStoreActions = {
    async login({ user, tasks }): Promise<boolean> {
      const newTasks = [...sessionStore.tasks, ...tasks];
      setSessionStore(() => {
        return {
          tasks: newTasks,
          user,
        };
      });
      return true;
    },

    async logout(): Promise<boolean> {
      setSessionStore(() => {
        return {
          user: null,
          tasks: [],
        };
      });
      return true;
    },

    async addTask(taskText): Promise<boolean> {
      if (!taskText) {
        return false;
      }
      setSessionStore((session) => {
        return {
          ...session,
          tasks: [
            ...session.tasks,
            {
              text: taskText,
              success: false,
              action: "create",
            },
          ],
        };
      });
      return true;
    },

    async removeTask({ index }): Promise<boolean> {
      if (index < 0) {
        return false;
      }

      setSessionStore((session) => {
        session.tasks[index].action = "delete";
        return {
          ...session,
          tasks: [...session.tasks],
        };
      });
      return true;
    },

    async updateTask(
      index: number,
      data: { success: boolean; text: string }
    ): Promise<boolean> {
      if (index < 0 || !data) {
        return false;
      }
      setSessionStore((session) => {
        session.tasks[index].success = data.success;
        session.tasks[index].text = data.text;

        if (session.tasks[index].id) {
          session.tasks[index].action = "update";
        } else {
          session.tasks[index].action = "create";
        }

        return {
          ...session,
          tasks: [...session.tasks],
        };
      });
      return true;
    },

    async saveTasksOnServer(): Promise<boolean> {
      if (!sessionStore.user) {
        router.push("/login");
        return false;
      }

      const nextTasks: TaskWithNotRequiredId[] = [];

      for (const task of sessionStore.tasks) {
        const { action } = task;
        if (!action) {
          nextTasks.push(task);
          continue;
        }
        if (action === "create") {
          const newTask = await TaskServices.createTask({ task: task });
          nextTasks.push(newTask);
        }
        if (action === "update") {
          if (!task.id) {
            continue;
          }
          const updatedTask = await TaskServices.updateTask({
            task: task as Task,
          });
          nextTasks.push(updatedTask);
        }
        if (action === "delete") {
          if (!task.id) {
            continue;
          }
          await TaskServices.deleteTask({ id: task.id });
        }
      }
      setSessionStore((prevSession) => {
        return {
          ...prevSession,
          tasks: nextTasks,
        };
      });
      return true;
    },
  };

  useEffect(() => {
    console.log({ sessionStore });
  }, [sessionStore]);

  return (
    <SessionContext.Provider
      value={{ sessionStore: sessionStore, actions: actions }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  if (!SessionContext) {
    throw new Error("Session Context Missing");
  }
  return useContext(SessionContext);
};
