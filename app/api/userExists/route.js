import User from "@/app/models/User";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await mongooseConnect();
        const { email } = await req.json();
        const user = await User.findOne({email}).select("_id");
        console.log("user:", user)
        return NextResponse.json({user})
    } catch(error) {
        console.log(error)
    }
}