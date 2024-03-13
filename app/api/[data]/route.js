import dbConnect from "@/app/lib/dbConnect";
import User from "@/app/models/User";

export async function GET(req, {params}) {
    const {client, bucket } = await dbConnect();
    const {data} = params;

    try {
        // const userJwt = cookies().get("access-token")?.value;
        // const { userId } = await verifyToken(userJwt);

        

        // const files = await bucket.find({filename: "bird_with_dog_face.jpg"}).toArray();
        // console.log(files);


        return Response.json({data});
    }
    catch(error) {
        return Response.json({error})
    }
}