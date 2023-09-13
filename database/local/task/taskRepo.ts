import { ITaskRepository, Task } from "@/models/Task";
import { randomUUID } from "crypto";
import fs from "node:fs";
import path from "node:path";

export class LocalTaskRepository implements ITaskRepository {
  private tasks: Task[] = [];
  private filePath = path.resolve(
    path.join(process.cwd(), "database", "mock", "task.json")
  );

  constructor() {
    const fileExist = fs.existsSync(this.filePath);

    if (fileExist) {
      const file = fs.readFileSync(this.filePath, { encoding: "utf-8" });
      if (!file) {
        console.error("Missing task.json file");
      }
      const fileParsedToJson = JSON.parse(file) as Task[];
      this.tasks = fileParsedToJson;
    } else {
      fs.writeFileSync(this.filePath, JSON.stringify([]), {
        encoding: "utf-8",
        flag: "w",
      });
    }
  }

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

    await this.hardSave();

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
    await this.hardSave();

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
    await this.hardSave();

    return { error: false };
  }

  async hardSave() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.tasks), {
      encoding: "utf-8",
      flag: "w",
    });
  }
}
