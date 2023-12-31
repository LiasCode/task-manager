import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/models/Task";
import { TaskService } from "@/models/task/task.service";
import { SupabaseTaskRepository } from "@/database/supabase/task/tasks.repo";
import { LocalTaskRepository } from "@/database/local/task/taskRepo";
import { throwIfUserCookiesNotAuth } from "../thowIfUserCookiesNotAuth";

let TaskServiceInstance: TaskService;

if (process.env.NODE_ENV !== "development") {
  TaskServiceInstance = new TaskService({
    taskRepo: new SupabaseTaskRepository(),
  });
} else {
  TaskServiceInstance = new TaskService({
    taskRepo: new LocalTaskRepository(),
  });
}

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    throwIfUserCookiesNotAuth(req.cookies);

    const { error, data: tasks } = await TaskServiceInstance.getAll();

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 }
    );
  }
};

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    throwIfUserCookiesNotAuth(req.cookies);

    const body = (await req.json()) as Task;

    const { error, data: newTask } = await TaskServiceInstance.create(body);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      data: newTask,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 }
    );
  }
};

export const PUT = async (req: NextRequest): Promise<NextResponse> => {
  try {
    throwIfUserCookiesNotAuth(req.cookies);

    const body = (await req.json()) as Task;

    const { error, data: updatedTask } = await TaskServiceInstance.update(body);

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      data: updatedTask,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 }
    );
  }
};

export const DELETE = async (req: NextRequest): Promise<NextResponse> => {
  try {
    throwIfUserCookiesNotAuth(req.cookies);

    const { id } = (await req.json()) as { id: Task["id"] };

    const { error, data: deletedTask } = await TaskServiceInstance.delete({
      id,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({
      success: true,
      data: deletedTask,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 }
    );
  }
};
