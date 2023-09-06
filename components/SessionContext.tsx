"use client";
import { Task } from "@/models/Task";
import { UserWhithoutPassword } from "@/models/User";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from "react";

type SessionStore = {
  token: string | null;
  user: UserWhithoutPassword | null;
  tasks: Task[] | null;
};

type SessionStoreActions = {
  loginUser(data: {
    token: string;
    user: UserWhithoutPassword;
  }): Promise<boolean>;
  setTasks(data: Task[]): Promise<boolean>;
};

const SessionContext = createContext<{
  sessionStore: SessionStore;
  actions: SessionStoreActions;
} | null>(null);

export const SessionContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const [sessionStore, setSessionStore] = useState<SessionStore>({
    tasks: null,
    user: null,
    token: null,
  });

  const actions: SessionStoreActions = {
    async loginUser(data): Promise<boolean> {
      setSessionStore((session) => {
        return {
          ...session,
          token: data.token,
          user: data.user,
        };
      });
      return true;
    },
    async setTasks(tasks): Promise<boolean> {
      setSessionStore((session) => {
        return {
          ...session,
          tasks: tasks,
        };
      });
      return true;
    },
  };

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
