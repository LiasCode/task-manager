import supabase from "@/database/supabase/client";
import { ITaskRepository, Task } from "@/models/Task";
import { randomUUID } from "crypto";

export class SupabaseTaskRepository implements ITaskRepository {
  async getAll(): Promise<{ data: Task[] }> {
    let { data: tasks, error } = await supabase.from("tasks").select("*");

    if (error || tasks === null) {
      throw new Error("No tasks founded");
    }

    return {
      data: tasks,
    };
  }

  async getOne({ id }: { id: Task["id"] }): Promise<{ data: Task }> {
    let { data: task, error } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", id);

    if (error || task === null) {
      throw new Error("Task not found");
    }

    return {
      data: {
        id: task[0].id,
        success: task[0].success,
        text: task[0].text,
      },
    };
  }

  async update(data: Task): Promise<{ data: Task }> {
    const { data: updatedTask, error } = await supabase
      .from("tasks")
      .update({ success: data.success, text: data.text })
      .eq("id", data.id)
      .select();

    if (error || updatedTask === null) {
      throw new Error("Task not updated");
    }

    return {
      data: updatedTask[0],
    };
  }

  async create(data: Omit<Task, "id" | "success">): Promise<{ data: Task }> {
    const newTask: Task = {
      text: data.text,
      success: false,
      id: randomUUID(),
    };

    const { data: newTaskCreated, error } = await supabase
      .from("tasks")
      .insert([newTask])
      .select();

    if (error || newTaskCreated === null) {
      throw new Error("Taks dont created");
    }

    return {
      data: newTaskCreated[0],
    };
  }

  async delete({ id }: { id: Task["id"] }): Promise<{error : boolean}> {
    let { error } = await supabase
      .from("tasks")
      .delete()
      .eq("id", id);

    if (error) {
      return {error : true};
    }

    return {error : false};
  }
}

