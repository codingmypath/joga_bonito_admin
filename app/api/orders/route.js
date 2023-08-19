import { Order } from "@/app/models/Order";
import { mongooseConnect } from "@/lib/mongoose";
import { NextResponse } from "next/server";

// export default async function handler(req, res) {
//     await mongooseConnect();
//     res.json(await Order.find().sort({createdAt:-1}));
// }


export async function GET(request, response) {
    await mongooseConnect();
    return NextResponse.json(await Order.find().sort({createdAt:-1}));
}