export type Task = {
  id: string;
  text: string;
  success: boolean;
};

export interface ITaskService {
  getAll(): Promise<ServicesResponse<Task[]>>;
  getOne(data: { id: Task["id"] }): Promise<ServicesResponse<Task>>;
  create(data: Omit<Task, "id" | "success">): Promise<ServicesResponse<Task>>;
  update(data: Task): Promise<ServicesResponse<Task>>;
}
