import { NextResponse } from "next/server";
import {mongooseConnect} from "@/../lib/mongoose"
import { Category } from "../../models/Category";
import { getServerSession } from "next-auth";
// import { handler } from "../../api/auth/[...nextauth]";


export async function GET(request, response) { 
    await mongooseConnect();
    // const session = await getServerSession(request, response, handler);
    // console.log(session);

    console.log("ENTERED HERE");
    return NextResponse.json(await Category.find().populate('parent'))
}


export async function POST(request, response) {
    try {	
        await mongooseConnect();	
        const { name, parentCategory, properties } =  await request.json();
        console.log(name);
    
        const categoryDoc = await Category.create({name, 
          parent: parentCategory || undefined, 
          properties:properties,
        });
        
        return NextResponse.json(categoryDoc);
      } catch (error) {
        return NextResponse.error(error);
      }
}


export  async function PUT(request, response) {
    try {	
    await mongooseConnect();	
  
    const { name, parentCategory, properties, _id } =  await request.json();
    
    const categoryDoc = await Category.updateOne({_id}, {
      name, 
      parent:parentCategory || undefined, 
      properties,
    })
    return NextResponse.json(true)
} catch (error) {
    return NextResponse.error(error);
  }
}


export async function DELETE(request) {
    await mongooseConnect();
    
    const yourParamName = request.nextUrl.searchParams.get('_id');
    console.log('DELETE: ' + yourParamName)
  
    
    return NextResponse.json(await Category.deleteOne({_id:yourParamName}))

}
