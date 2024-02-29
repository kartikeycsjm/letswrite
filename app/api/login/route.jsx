import connectDB from "@/app/db/connectDB";
import User from "@/app/db/userSchema";
import { NextResponse } from "next/server";

const POST = async (req) => {
    try {
        const { email, password } = await req.json();
        console.log(email, password);
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json('User not found');
        }

        if (user.password !== password) {
            return NextResponse.json('Invalid password');
        }
        return NextResponse.json({status:'Login successful',user});
    } catch (error) {
        console.log(error);
        return NextResponse.json('Login failed');
    }
};

export { POST};
