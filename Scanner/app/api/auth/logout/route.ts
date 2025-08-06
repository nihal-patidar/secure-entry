import { NextResponse } from "next/server";

export async function GET() {
  const response = NextResponse.json({ message: "Logout successful" });

  // Clear the token cookie
  response.cookies.set("token", "", { maxAge: 0 });

  return response;
}
