// import { NextRequest, NextResponse } from "next/server";
// import { verifyToken } from "@/app/lib/auth";

// export async function GET(req: NextRequest) {
//   const token = req.cookies.get("token")?.value;

//   if (!token) {
//     return NextResponse.json({ message: "Unauthorized: No Token" }, { status: 401 });
//   }

//   try {
//     const user = await verifyToken(token);

//     if (!user) {
//       return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
//     }

//     return NextResponse.json({ message: "Protected content", user });
//   } catch (error) {
//     console.error("Error verifying token:", error);
//     return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export async function GET(req: NextRequest) {
  // ✅ Extract token from Authorization header
  const authHeader = req.headers.get("authorization");
  console.log('authHeader',authHeader);
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;

  if (!token) {
    return NextResponse.json({ message: "Unauthorized: No Token" }, { status: 401 });
  }

  try {
    const user = await verifyToken(token);

    if (!user) {
      return NextResponse.json({ message: "Invalid Token" }, { status: 401 });
    }

    return NextResponse.json({ message: "Protected content", user });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
