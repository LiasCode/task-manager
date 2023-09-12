export type Task = {
  id: string;
  text: string;
  success: boolean;
};

export interface ITaskRepository {
  getAll(): Promise<{ data: Task[] }>;
  getOne(data: { id: Task["id"] }): Promise<{ data: Task }>;
  create(data: Omit<Task, "id" | "success">): Promise<{ data: Task }>;
  update(data: Task): Promise<{ data: Task }>;
}

export interface ITaskService {
  getAll(): Promise<ServicesResponse<Task[]>>;
  getOne(data: { id: Task["id"] }): Promise<ServicesResponse<Task>>;
  create(data: Omit<Task, "id" | "success">): Promise<ServicesResponse<Task>>;
  update(data: Task): Promise<ServicesResponse<Task>>;
}
