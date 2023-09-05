export type Task = {
  text: string;
  id: string;
  success: boolean;
};

export interface ITaskService {
  getAll(): Promise<ServicesResponse<Task[]>>;
  getOne(data: { id: Task["id"] }): Promise<ServicesResponse<Task>>;
  create(data: Omit<Task, "id">): Promise<ServicesResponse<Task>>;
  update(data: Omit<Task, "id">): Promise<ServicesResponse<Task>>;
}
