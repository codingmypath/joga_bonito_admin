import { NextResponse } from "next/server";
// export default function handler(req, res) {
//     // Get data submitted in request's body.
//     const body = req.body
   
//     // Optional logging to see the responses
//     // in the command line where next.js app is running.
//     console.log('body: ', body)
   
//     // Guard clause checks for first and last name,
//     // and returns early if they are not found
//     if (!body.description || !body.price) {
//       // Sends a HTTP bad request error code
//       return res.status(400).json({ data: 'First or last name not found' })
//     }
   
//     // Found the name.
//     // Sends a HTTP success code
//     res.status(200).json({ data: `${body.title} ${body.price}` })
//   }


// export default function handler(req, res) {
//     console.log("ENTER")
//     res.status(200).json({name: 'John Doe'})
// }


// export default function handle(req, res) {
//         console.log("res.json(req.body)");
//         res.json(req.method);
// }

export async function POST(request) {
    // ...
    return NextResponse.json(request.method);
    // return NextResponse.json({ message: "Hello World" });
}