import { ITaskService, Task } from "@/models/Task";
import { randomUUID } from "crypto";

const tasks: Task[] = [];

export class TaskService implements ITaskService {
  async getAll(): Promise<ServicesResponse<Task[]>> {
    return {
      data: tasks,
      success: true,
      error: null,
    };
  }

  async getOne({ id }: { id: Task["id"] }): Promise<ServicesResponse<Task>> {
    const task = tasks.find((t) => t.id === id);

    if (!task) {
      return {
        data: null,
        success: false,
        error: {
          code: 404,
          message: "Task not found",
        },
      };
    }

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
    const indexTask = tasks.findIndex((t) => t.id === data.text);

    if (indexTask === -1) {
      return {
        data: null,
        success: false,
        error: {
          message: "Task do not exist",
          code: 404,
        },
      };
    }

    tasks[indexTask].text = data.text ?? tasks[indexTask].text;
    tasks[indexTask].success = data.success ?? tasks[indexTask].success;

    return {
      data: tasks[indexTask],
      success: true,
      error: null,
    };
  }

  async create(data: Omit<Task, "id" | "success">): Promise<ServicesResponse<Task>> {
    const newTask: Task = {
      text: data.text,
      success: false,
      id: randomUUID(),
    };

    tasks.push(newTask);

    return {
      data: newTask,
      success: true,
      error: null,
    };
  }
}
