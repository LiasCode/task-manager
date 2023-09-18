"use client";
import { Task } from "@/models/Task";
import { UserWhithoutPassword } from "@/models/User";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

export type SessionStore = {
  user: UserWhithoutPassword | null;
  tasks: Array<
    Partial<Omit<Task, "text" | "success">> & {
      text: Task["text"];
      success: Task["success"];
    }
  >;
};

export type TaskWithNotRequiredId = Partial<Omit<Task, "text" | "success">> & {
  text: Task["text"];
  success: Task["success"];
};

export type loginUserProps = {
  user: UserWhithoutPassword;
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

  const actions: SessionStoreActions = {
    async login({ user }): Promise<boolean> {
      setSessionStore((session) => {
        return {
          ...session,
          user,
        };
      });
      return true;
    },

    async logout(): Promise<boolean> {
      setSessionStore((session) => {
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
        session.tasks.push({
          text: taskText,
          success: false,
        });
        return {
          ...session,
          tasks: Array.from(session.tasks),
        };
      });
      return true;
    },

    async removeTask({ index }): Promise<boolean> {
      if (index < 0) {
        return false;
      }

      setSessionStore((session) => {
        session.tasks.splice(index, 1);
        return {
          ...session,
          tasks: Array.from(session.tasks),
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

        return {
          ...session,
          tasks: Array.from(session.tasks),
        };
      });
      return true;
    },
  };

  useEffect(() => {
    console.log({ sessionStore });
  }, [sessionStore])

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
