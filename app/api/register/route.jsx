import connectDB from "@/app/db/connectDB";
import User from "@/app/db/userSchema";
import { NextResponse } from "next/server";

const POST = async (req) => {
    try {
        const { name, email, phone, username, password } = await req.json();
        console.log(name, email, phone, username, password);
        
        await connectDB();
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            if (existingUser.email === email) {
                return NextResponse.json('Email already in use');
            }
            if (existingUser.username === username) {
                return NextResponse.json('Username already in use');
            }
        }

        await User.create({ name, email, phone, username, password });
        return NextResponse.json('User registered successfully');
    } catch (error) {
        console.log(error);
        return NextResponse.json('Failed to register user');
    }
};

export { POST };
