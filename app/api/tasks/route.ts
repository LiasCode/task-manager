import { NextRequest, NextResponse } from "next/server";
import { TaskService } from "./service";
import { Task } from "@/models/Task";
import { verify } from "jsonwebtoken";

const TaskServiceInstance = new TaskService();

export const GET = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const token = req.cookies.get("jwt");

    if (!token) {
      throw new Error("Invalid Credentials");
    }

    const jwt = verify(token.value, process.env.JWT_SECRET as string);

    if (!jwt) {
      throw new Error("Invalid Credentials");
    }

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
    const token = req.cookies.get("jwt");

    if (!token) {
      throw new Error("Invalid Credentials");
    }

    const jwt = verify(token.value, process.env.JWT_SECRET as string);

    if (!jwt) {
      throw new Error("Invalid Credentials");
    }

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
