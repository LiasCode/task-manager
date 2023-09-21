import { ServicesResponse } from "../Service";
import { ITaskRepository, ITaskService, Task } from "../Task";
import { randomUUID } from "crypto";

export class TaskService implements ITaskService {
  private taskRepo: ITaskRepository;

  constructor({ taskRepo }: { taskRepo: ITaskRepository }) {
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

  async create(data: Omit<Task, "id">): Promise<ServicesResponse<Task>> {
    const newTask: Task = {
      text: data.text,
      success: data.success,
      id: randomUUID(),
    };

    const { data: newTaskCreated } = await this.taskRepo.create(newTask);

    return {
      data: newTaskCreated,
      success: true,
      error: null,
    };
  }

  async delete({ id }: { id: Task["id"] }): Promise<ServicesResponse<Task>> {
    const { data: targetTask } = await this.taskRepo.getOne({ id });

    const { error } = await this.taskRepo.delete({ id });

    if (error) {
      return {
        data: null,
        success: false,
        error: {
          code: 404,
          message: "Problems when deleting task",
        },
      };
    }

    return {
      data: {
        id: targetTask.id,
        success: targetTask.success,
        text: targetTask.text,
      },
      success: true,
      error: null,
    };
  }
}
