import supabase from "@/database/supabase/client";
import { ITaskRepository, Task } from "@/models/Task";
import { randomUUID } from "crypto";

export class LocalTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];

  async getAll(): Promise<{ data: Task[] }> {
    return { data: this.tasks };
  }

  async getOne({ id }: { id: Task["id"] }): Promise<{ data: Task }> {
    const task = this.tasks.find((t) => t.id === id);

    if (!task) {
      throw new Error("Task not found");
    }

    return {
      data: task,
    };
  }

  async update(data: Task): Promise<{ data: Task }> {
    const task = this.tasks.find((t) => t.id === data.id);

    if (!task) {
      throw new Error("Task not updated");
    }
    task.text = data.text;
    task.success = data.success;

    return {
      data: task,
    };
  }

  async create(data: Omit<Task, "id" | "success">): Promise<{ data: Task }> {
    const newTask: Task = {
      text: data.text,
      success: false,
      id: randomUUID(),
    };

    if (!newTask) {
      throw new Error("Taks dont created");
    }

    this.tasks.push(newTask);

    return {
      data: newTask,
    };
  }

  async delete({ id }: { id: Task["id"] }): Promise<{ error: boolean }> {
    const taskIndex = this.tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) {
      return { error: true };
    }

    this.tasks.splice(taskIndex, 1);

    return { error: false };
  }
}
