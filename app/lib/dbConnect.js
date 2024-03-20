import mongoose, { mongo } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error ("couldn't access mongodb_url");
}



let client = null;
let bucket = null;

async function dbConnect() {
    if (client) {
        return {client, bucket};
    }

    await mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    client = mongoose.connection;
    const db = mongoose.connection;
    bucket = new mongoose.mongo.GridFSBucket(db, {
        bucketName: 'images',
    })

    return {client, bucket};
}

export default dbConnect;