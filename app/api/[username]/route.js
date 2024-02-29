import User from "@/app/db/userSchema";
import postsc from "@/app/db/postSchem";
import { NextResponse } from "next/server";
import connectDB from "@/app/db/connectDB";
const GET=async(req,{params})=>{
    try {
        const {username}=params;
        console.log(username);
        await connectDB();
        const details=await User.findOne({username})
        const posts=await postsc.find({username})
        return NextResponse.json({msg:true,details,posts})
    } catch (error) {
        console.log(error);
        return NextResponse.json({msg:false})
    }
}
export {GET};