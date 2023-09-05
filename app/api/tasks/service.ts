import { ITaskService, Task } from "@/models/Task";

export class TaskService implements ITaskService {
  async getAll(): Promise<ServicesResponse<Task[]>> {
    return {
      data: [],
      success: true,
      error: null,
    };
  }
  async getOne({ id }: { id: Task["id"] }): Promise<ServicesResponse<Task>> {
    return {
      data: {
        id: id,
        success: false,
        text: "hola mundo",
      },
      success: true,
      error: null,
    };
  }
  async update(data: Omit<Task, "id">): Promise<ServicesResponse<Task>> {
    return {
      data: {
        id: "alkskasdlk-alskdjlaksd-alskdjlaksdj-alskdjsldkj",
        success: data.success,
        text: data.text,
      },
      success: true,
      error: null,
    };
  }
  async create(data: Omit<Task, "id">): Promise<ServicesResponse<Task>> {
    return {
      data: {
        id: "alkskasdlk-alskdjlaksd-alskdjlaksdj-alskdjsldkj",
        success: data.success,
        text: data.text,
      },
      success: true,
      error: null,
    };
  }
}
