import User from "@/app/models/User";
import { mongooseConnect } from "@/lib/mongoose";
const { NextResponse } = require("next/server");
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const {name, email, password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        await mongooseConnect();
        await User.create({name, email, password: hashedPassword})
    
        console.log("Name:", name)
        console.log("Email:", email)
        console.log("Password:", password)
        return NextResponse.json({message: "User Registered"}, {status: 201})
    } catch(error) {
        return NextResponse.json({message: "Error accured while registering user."}, {status: 500})
    }
}