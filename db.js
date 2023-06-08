import {MongoClient} from "mongodb";
import Obj from "mongodb"


const MongoURL="mongodb+srv://siddiq:siddiq12345@cluster0.4ghwomw.mongodb.net/?retryWrites=true&w=majority";
async function createConnection(){
    const client=new MongoClient(MongoURL);
    await client.connect();
    console.log("connected successfully");
    return client;
}

export var ObjectId=Obj.ObjectId;
export const client=await createConnection();