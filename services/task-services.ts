import { TaskWithNotRequiredId } from "@/components/sessionContext.types";
import { ServicesResponse } from "@/models/Service";
import { Task } from "@/models/Task";

export async function getTasks(): Promise<Task[]> {
  const response = await fetch("/api/tasks");
  const task = (await response.json()) as ServicesResponse<Task[]>;

  if (task.error) {
    throw new Error(task.error.message);
  }
  if (!task.data) {
    throw new Error("Task not created");
  }
  return task.data;
}

export async function createTask(data: {
  task: TaskWithNotRequiredId;
}): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.task),
  });
  const task = (await response.json()) as ServicesResponse<Task>;

  if (task.error) {
    throw new Error(task.error.message);
  }
  if (!task.data) {
    throw new Error("Task not created");
  }
  return task.data;
}

export async function updateTask(data: { task: Task }): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data.task),
  });
  const task = (await response.json()) as ServicesResponse<Task>;

  if (task.error) {
    throw new Error(task.error.message);
  }
  if (!task.data) {
    throw new Error("Task not updated");
  }
  return task.data;
}

export async function deleteTask(data: { id: Task["id"] }): Promise<Task> {
  const response = await fetch("/api/tasks", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: data.id }),
  });
  const task = (await response.json()) as ServicesResponse<Task>;

  if (task.error) {
    throw new Error(task.error.message);
  }
  if (!task.data) {
    throw new Error("Task not delete");
  }
  return task.data;
}
