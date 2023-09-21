import { ServicesResponse } from "./Service";

export type Task = {
  id: string;
  text: string;
  success: boolean;
};

export interface ITaskRepository {
  getAll(): Promise<{ data: Task[] }>;
  getOne(data: { id: Task["id"] }): Promise<{ data: Task }>;
  create(data: Omit<Task, "id">): Promise<{ data: Task }>;
  update(data: Task): Promise<{ data: Task }>;
  delete(data: { id: Task["id"] }): Promise<{ error: boolean }>;
}

export interface ITaskService {
  getAll(): Promise<ServicesResponse<Task[]>>;
  getOne(data: { id: Task["id"] }): Promise<ServicesResponse<Task>>;
  create(data: Omit<Task, "id">): Promise<ServicesResponse<Task>>;
  update(data: Task): Promise<ServicesResponse<Task>>;
  delete(data: { id: Task["id"] }): Promise<ServicesResponse<Task>>;
}
