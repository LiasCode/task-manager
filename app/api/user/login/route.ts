import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";
import { isUserLoginFormatValid } from "@/validation/userLoginData";
import { TaskService } from "@/models/task/task.service";
import { SupabaseTaskRepository } from "@/database/supabase/task/tasks.repo";
import { LocalTaskRepository } from "@/database/local/task/taskRepo";

let TaskServiceInstance: TaskService;

if (process.env.NODE_ENV === "production") {
  TaskServiceInstance = new TaskService({
    taskRepo: new SupabaseTaskRepository(),
  });
} else {
  TaskServiceInstance = new TaskService({
    taskRepo: new LocalTaskRepository(),
  });
}

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const data: { userName: string; password: string } = await req.json();

    if (
      !isUserLoginFormatValid(data) ||
      data.userName !== process.env.ADMIN_USER ||
      data.password !== process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid credentials",
        },
        {
          status: 401,
        }
      );
    }

    const token = sign(
      { userName: data.userName },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
        algorithm: "HS256",
      }
    );

    const { data: tasksData, error } = await TaskServiceInstance.getAll();

    if (error) {
      return NextResponse.json({
        success: false,
        user: null,
        tasks: null,
      });
    }

    const response = NextResponse.json({
      success: true,
      user: {
        name: process.env.ADMIN_USER,
        id: 1,
      },
      tasks: tasksData,
    });

    response.cookies.set({
      name: "jwt",
      value: token,
      httpOnly: true,
      maxAge: 60 * 60,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
