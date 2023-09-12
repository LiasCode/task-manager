import { TaskRepository } from "@/database/supabase/taskSupabase.repo";
import { ITaskRepository, ITaskService, Task } from "../Task";
import { randomUUID } from "crypto";

export class TaskService implements ITaskService {
  private taskRepo: ITaskRepository;

  constructor({ taskRepo }: { taskRepo: TaskRepository }) {
    this.taskRepo = taskRepo;
  }

  async getAll(): Promise<ServicesResponse<Task[]>> {
    let { data: tasks } = await this.taskRepo.getAll();

    return {
      data: tasks,
      success: true,
      error: null,
    };
  }

  async getOne({ id }: { id: Task["id"] }): Promise<ServicesResponse<Task>> {
    const { data: task } = await this.taskRepo.getOne({ id });

    return {
      data: {
        id: task.id,
        success: task.success,
        text: task.text,
      },
      success: true,
      error: null,
    };
  }

  async update(data: Task): Promise<ServicesResponse<Task>> {
    const { data: updatedTask } = await this.taskRepo.update(data);

    return {
      data: updatedTask,
      success: true,
      error: null,
    };
  }

  async create(
    data: Omit<Task, "id" | "success">
  ): Promise<ServicesResponse<Task>> {
    const newTask: Task = {
      text: data.text,
      success: false,
      id: randomUUID(),
    };

    const { data: newTaskCreated } = await this.create(newTask);

    return {
      data: newTaskCreated,
      success: true,
      error: null,
    };
  }
}
