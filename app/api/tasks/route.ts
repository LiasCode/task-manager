import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import supabase from "@/database/client";

export const GET = async (_req: NextRequest): Promise<NextResponse> => {
  try {
    const nextCookies = cookies();
    const jwt = nextCookies.get("jwt");

    console.log({ jwt })

    if (!jwt) {
      throw new Error("Invalid Credentials");
    }

    const token = verify(jwt.value, process.env.JWT_SECRET as string);

    if (!token) {
      throw new Error("Invalid Credentials");
    }

    let { data: tasks, error } = await supabase.from("tasks").select("*");

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
