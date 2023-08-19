import mongoose from "mongoose";
import {mongooseConnect} from "@/../lib/mongoose"
import { NextResponse } from "next/server";
import clientPromise from "@/../lib/mongodb";
import { Product } from "../../models/Product";


// export default async function handle(req, res) {
//     console.log('Method!')
//     const {method} = req;
//     mongooseConnect()
//     if (method === 'POST') {
//         const {title, description, price} = req.body
//         const productDoc = await mongoose.model("Product").create({
//             title, description, price,
//         })
//         res.json(productDoc);
//     }
// }





// export default function handle(req, res) {
//     const {method} = req;
//     mongoose.connect(clientPromise.url)
//     if (method === 'POST') {
//         res.json('post');
//     }
// }


// export default function handle(req, res) {
//         res.json(req);
    
// }


// export default function handler(req, res) {
//     console.log("ENTER")
//     res.status(200).json({name: 'John Doe'})
// }


// export default function handle(req, res) {
//         console.log("res.json(req.body)");
//         res.json(req.method);
// }



//youtube comment
// import { Product } from '@/../models/Product';
// import { mongooseConnect } from '@/../lib/mongodb';
// import { NextResponse } from 'next/server';


// export async function POST(request, response) {

//   try {
//     await mongooseConnect();
//     const { title, description, price } =  await request.json();
//     console.log(title, description, price);

//     const productDoc = await Product.create({
//       title,
//       description,
//       price
//     });

//     const res = {
//       success: true,
//       message: 'Product created successfully',
//       data: productDoc
//     };
//     return NextResponse.json(res);

//   } catch (error) {
//     return NextResponse.error(error);

//   }
// } 



// import { NextResponse } from "next/server";

// const handler = (req, res) => {
//     const body = req.body
//     console.log(body)

//     res.status(200).end()
//     res.json(req);
//     return NextResponse.json({ message: "Hello World" });
// }
// export default handler



// import { NextResponse } from 'next/server'
 
// export async function POST(request) {
//   const res = await request.json()
//   return NextResponse.json({ res })
// }



// import { NextResponse } from 'next/server'
 
// export async function POST(request) {
//   console.log("ENTER")
//   const formData = await request.formData()
//   const title = formData.get('title')
//   const description = formData.get('description')
//   const price = formData.get('price')
//   return NextResponse.json({ title, description, price})
// }



// export default function handler(req, res) {
//     if (req.method === 'POST') {
//       // Process a POST request
//       res.json(req.method)
//     } else {
//       // Handle any other HTTP method
//     }
// }

// export async function handle(req, res) {
//     res.json(req.method);
// }



//Solution that worked
// export async function POST(request) {
//         // ...
//         return NextResponse.json(request.method);
//         // return NextResponse.json({ message: "Hello World" });
// }


// export async function POST(req) {
//         // ...
//         const {method} = req;
//         await mongooseConnect();
//         if (method === 'POST') {
//                 const {title, description, price} = req.body
//                 const productDoc = await Product.create({
//                         title, description, price,
//                 })
//                 return NextResponse.json(productDoc)
//         }
//         // return NextResponse.json(req.method);
//         // return NextResponse.json({ message: "Hello World" });
// }





// export async function POST(req) {
//         // ...
//         const {method} = req;
//         await mongooseConnect();
//         if (method === 'POST') {
//                 const {title, description, price} = req.body
//                 const productDoc = await mongoose.model("Product").create({
//                         title, description, price,
//                 })
//                 return NextResponse.json(productDoc)
//         }
//         return NextResponse.json(req.method);
//         return NextResponse.json({ message: "Hello World" });
// }






//--------------------------------------GET------------------------


// export async function GET(request) {
//   await mongooseConnect();
//   const res = await fetch(Product.find());
//   const data = await res.json()
 
//  return NextResponse.json(data)
// }



// export async function GET(response) {
//   response = await Product.find();
//   return NextResponse.json(response);
// }


// export async function getServerSideProps(response) {
//   await mongooseConnect();	

//   const product = await Product.find()
//   const data = await product.json()
//   return data;
// }


// export async function GET(response) { 
//   try {
//     await mongooseConnect();	
//     response.json(await Product.find(title, description, price))
//   } catch (error) {
//     return NextResponse.error(error);
//   }
// }

// export async function GET(response) { 
//   await mongooseConnect();

//   if (request.query?.di) {
//     return NextResponse.json(await Product.findOne({_id: request.query.id}))
//   } else {
//     return NextResponse.json(await Product.find())
//   }
// }

//https://stackoverflow.com/questions/74889841/how-to-get-query-params-using-server-component-next-13

export async function GET(request, response) { 
  await mongooseConnect();

  const yourParamName = request.nextUrl.searchParams.get('id');

  
    console.log("idk: " + yourParamName)
    console.log("idk1: " + request.params)
    if (yourParamName) {
      console.log("ENTERED")
      // console.log(NextResponse.json(await Product.findOne({_id:context.params.id})))
      return NextResponse.json(await Product.findOne({_id:yourParamName} ));
    } else {
      console.log("ENTERED HERE")
    return NextResponse.json(await Product.find())
    }
}



//---------------------------------------------------------------------



//from youtube comments
export async function POST(request, response) {
        // try {

          await mongooseConnect();	
          const { title, description, price, images, category,properties } =  await request.json();
          console.log(title, description, price);
      
      
          const productDoc = await Product.create({
            title,description,price,images,category, properties,
          });
      
        //   const res = {
        //     data: productDoc
        //   };
      
      
          return NextResponse.json(productDoc);
        // } catch (error) {
        //   return NextResponse.error(error);
        // }
}



// export async function POST(request, response) {

//         try {
//           await mongooseConnect();	
//           const { title, description, price } =  await request.json();
//           console.log(title, description, price);
      
//           const productDoc = await mongoose.model("Product").create({
//             title,
//             description,
//             price
//           });
      
//           const res = {
//             success: true,
//             message: 'Product created successfully',
//             data: productDoc
//           };
      
      
//           return NextResponse.json(res);
//         } catch (error) {
//           return NextResponse.error(error);
//         }
// }



// export async function GET(request, response) {
//     const res = await fetch('https://data.mongodb-api.com/...', {
//       headers: {
//         'Content-Type': 'application/json',
//         'API-Key': process.env.DATA_API_KEY,
//       },
//     })
//     const data = await res.json()
   
//     return NextResponse.json({ data })
// }


 
export  async function PUT(request, response) {
  await mongooseConnect();	

  const { title, description, price, images, category,properties, _id } =  await request.json();
  
  await Product.updateOne({_id}, {title, description, price, images, category, properties})
  return NextResponse.json(true)

}


export async function DELETE(request) {
  await mongooseConnect();

  const yourParamName = request.nextUrl.searchParams.get('id');
  console.log('DELETE: ' + yourParamName)

  if (yourParamName) {
    return NextResponse.json(await Product.deleteOne({_id:yourParamName}))
    // return NextResponse.json;
  }
  
}
