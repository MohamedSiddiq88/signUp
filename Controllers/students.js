import { ObjectId } from "bson";
import { client } from "../db.js";

export function getAllStudents(req) {
    return client
        .db("student-and-mentors")
        .collection("students")
        .find(req.query)
        .toArray();
}

export function getFilteredStudents(filter) {
    return client
      .db("student-and-mentors")
      .collection("students")
      .find({batch:"Hindi batch"})
      .toArray();
  }
  

export function getStudentById(id) {
    return client
        .db("student-and-mentors")
        .collection("students")
        .findOne({ _id: new ObjectId(id) });
}

export function addStudentData(data) {
    return client
        .db("student-and-mentors")
        .collection("students")
        .insertOne(data);
}

export function addStudentsData(data) {
    return client
      .db("student-and-mentors")
      .collection("students")
      .insertMany(data);
  }

export function updateStudentData(id, updatedData) {
    return client
        .db("student-and-mentors")
        .collection("students")
        .findOneAndUpdate({ _id: new ObjectId(id) }, { $set: updatedData });
}



export function deleteStudentData() {
    return client
        .db("student-and-mentors")
        .collection("students")
        .deleteMany({});
}
