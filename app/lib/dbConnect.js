import mongoose, { mongo } from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error ("couldn't access mongodb_url");
}

// let cached = global.mogoose;

// if (!cached)
//     cached = global.mongoose = { conn: null, promise: null};


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

    console.log("connected to the Database");
    return {client, bucket};
}

async function isAvatarExists(filename) {
    try {
        const file = await bucket.find({filename}).toArray();

        return file.length > 0;
    }
    catch (error) {
        return false;
    }
}

export default dbConnect;