import { client } from "../db.js";
import  jwt  from "jsonwebtoken";

export function  addUsers(userInfo){
    return client
    .db("student-and-mentors")
    .collection("users")
    .insertOne(userInfo)
}

export function  getUser(userEmail){
    return client
    .db("student-and-mentors")
    .collection("users")
    .findOne({email:userEmail})
}

export function  generateJwtToken(id){
    return jwt.sign({id}, process.env.SECRETKEY, {expiresIn:"30d"})   
}