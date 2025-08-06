import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Validator from "@/app/models/validatorModel";
import { signToken } from "@/app/lib/auth";

export async function POST(req: Request) {
    await connectToDatabase();
    const body = await req.json();
    const { email, password } = body;

    //console.log('Here', body);

    // Validate input
    if (!email || !password) {
        return NextResponse.json({ message: "Email and password are required", success: false });
    }

    try {
        const user = await Validator.findOne({ validator_email: email }, { validator_password: 1 });
        if (!user) {
            return NextResponse.json({ message: "Invalid email or password", success: false });
        }

        const isPasswordValid = password === user.validator_password;
        if (!isPasswordValid) {
            return NextResponse.json({ message: "Invalid email or password", success: false });
        }

        const user1 = await Validator.findOne({ validator_email: email }, { validator_password: 0 });
        const token = await signToken({ user : user1 })

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            user: user1,
            token
        });
        // response.cookies.set("token", token, { httpOnly: true, secure: true });

        return response ;
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error, success: false });
    }
}
