import connectDB from "@/app/db/connectDB";
import User from "@/app/db/userSchema";
import postsc from "@/app/db/postSchem";
import { NextResponse } from "next/server";

const GET = async (req) => {
    try {
        let email=req.nextUrl.searchParams.get('email')
        let password=req.nextUrl.searchParams.get('password')
        await connectDB();
        const user=await User.findOne({email,password})
        const textpost=await postsc.find()
        return NextResponse.json({user,textpost});
    } catch (error) {
        return NextResponse.json({msg:'error'})
    }
};
const POST = async (req) => {
    try {
        const { username, post } = await req.json();
        console.log(username, post);
        await connectDB();
        await postsc.create({ username, post })
        return NextResponse.json({ msg: 'posted' })
    } catch (error) {
        return NextResponse.json({ msg: 'error occured' })
    }

}
const DELETE = async (req) => {
    try {
        let id = req.nextUrl.searchParams.get('id');
        console.log(id);
        await connectDB();
        // Use the deleteOne method to delete a post based on its id
        await postsc.deleteOne({ _id: id });
        return NextResponse.json({ msg: 'deleted' });
    } catch (error) {
        return NextResponse.json({ msg: 'error occurred' });
    }
}
export {GET,POST,DELETE};
