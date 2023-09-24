import { Task } from "../models/Task"
import { UserWhithoutPassword } from "../models/User"

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
