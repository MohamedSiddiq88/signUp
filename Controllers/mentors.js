import { ObjectId } from "bson";
import { client } from "../db.js";

export function getAllMentors(req) {
    return client
        .db("student-and-mentors")
        .collection("mentors")
        .find(req.query)
        .toArray();
}

export function getMentorById(id) {
    return client
        .db("student-and-mentors")
        .collection("mentors")
        .findOne({ _id: new ObjectId(id) });
}

export function addMentorData(data) {
    return client
        .db("student-and-mentors")
        .collection("mentors")
        .insertOne(data);
}

export function updateMentorData(id, updatedData) {
    return client
        .db("student-and-mentors")
        .collection("mentors")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedData });
}

export function deleteMentorData(id) {
    return client
        .db("student-and-mentors")
        .collection("mentors")
        .deleteOne({ _id: new ObjectId(id) });
}
