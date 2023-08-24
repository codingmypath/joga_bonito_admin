
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from "uuid";
import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import crypto from "crypto"

const s3Client = new S3Client({
  region: process.env.MY_AWS_REGION,
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');



export async function POST(request, response) {
  try {
    
    const formData = await request.formData();
    // console.log(formData, "Form data")
    const file = formData.get("file");

    //trying to create array
    let fileArray = [];
    fileArray.push(file);
    // console.log("file::", fileArray);
    // console.log("length:", fileArray.length)

    if (!file) {
      return NextResponse.json(
        { error: "File blob is required." },
        { status: 400 }
      );
    }

    const links = []
    let trimUrl = "";
    for(const file of fileArray) {

      const mimeType = file.type;

      // console.log('MIMETYPE:', mimeType)
      const fileExtension = mimeType.split("/")[1];
      // console.log("fileEXT:", fileExtension)
      
      const buffer = Buffer.from(await file.arrayBuffer());
      
      //   const resizedImageBuffer = await sharp(file)
      //     .resize(400, 500) // Specify your desired width or height for resizing
      //     .toBuffer();

      // Key: `${Date.now()}-${uuid() + "." + fileExtension}`,
      const params = {
            Bucket: process.env.MY_AWS_BUCKET_NAME,
            Key: `${Date.now()}-${uuid() + "." + fileExtension}`,
            Body: buffer,
            ContentType: mimeType // Change the content type accordingly
      }

      const command = new PutObjectCommand(params);

      const res = await s3Client.send(command);
    
      const getCommand = new GetObjectCommand(params);
      // const url = await getSignedUrl(s3Client, getCommand, { expiresIn: 3600 });
      const url = await getSignedUrl(s3Client, getCommand);
      trimUrl = url.split('?')[0]
      links.push(trimUrl);
      // console.log("links url:", links)
    }

    // console.log('URL:', links)

    return NextResponse.json( {links} );
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}
