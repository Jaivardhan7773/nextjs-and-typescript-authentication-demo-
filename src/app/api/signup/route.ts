import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json();

        await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 401 });
    }


        const saltRound = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, saltRound)



    const newUser = await User.create({
      name,
      email,
      password: hashedPass,
    });

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET as string, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Signup successful",
            user: { email: newUser.email, name: newUser.name },
        });

        // Set cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
            path: "/",
        });

        // ✅ Add CORS headers
        response.headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
        response.headers.set("Access-Control-Allow-Credentials", "true");

        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
