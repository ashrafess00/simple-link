import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";
import { NextResponse } from "next/server";
export async function GET(req, {params}) {
    const {client, bucket } = await dbConnect();
    const {data} = params;
    
    try {
        const files = await bucket.find({filename: data}).toArray();
        const file = files[0];

        console.log(files);
        const stream = bucket.openDownloadStreamByName(file.filename);

        return new NextResponse(stream, {
            Headers: {'Content-Type': file.contentType},
        })

        return Response.json({file});
    }
    catch(error) {
        return Response.json({error})
    }
}