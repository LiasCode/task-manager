import { NextRequest, NextResponse } from "next/server";
import { sign } from "jsonwebtoken";

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const data: { userName: string; password: string } = await req.json();
    if (
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
    return NextResponse.json({
      success: true,
      jwt: token,
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message });
  }
};
