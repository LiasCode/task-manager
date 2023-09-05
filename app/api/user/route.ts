import { NextRequest, NextResponse } from "next/server";

export const GET = async (_req: NextRequest): Promise<NextResponse> => {
  try {
    return NextResponse.json({
      success: true,
      data: [],
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 404 }
    );
  }
};
