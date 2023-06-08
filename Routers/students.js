import express from "express";
import { addStudentData, addStudentsData, deleteStudentData, getAllStudents, getFilteredStudents, getStudentById, updateStudentData } from "../Controllers/students.js";
import { getMentorById } from "../Controllers/mentors.js";

const router = express.Router();




router.get("/all", async (req, res) => {
    try {
        

        if (req.query.taskcompletion) {
            req.query.taskcompletion = parseInt(req.query.taskcompletion);
        }
        const students = await getAllStudents(req);
        if (students.length <= 0) {
            res.status(400).send("user not found");
            return;
        }
        res.status(200).json({ data: students });
    } catch (error) {
        res.status(500).json("internal server error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const student = await getStudentById(id);
        if (!student) {
            res.status(400).send("user not found");
            return;
        }
        res.status(200).json({ data: student });
    } catch (error) {
        res.status(500).json("internal server error");
    }
});

router.post("/add", async (req, res) => {
    try {
        const newStudent = req.body;
        if (!newStudent) {
            return res.status(400).send({ data: "No details provided" });
        }
        const result = await addStudentData(newStudent);
        res.status(200).send({ data: { result: result, message: "New student added successfully" } });
    } catch (error) {
        res.status(500).send({ data: "Internal server error" });
    }   
});

router.post("/addmany", async (req, res) => {
    try {
      const newStudents = req.body;
      if (!newStudents || !Array.isArray(newStudents)) {
        return res.status(400).send({ data: "No student details provided" });
      }
      const result = await addStudentsData(newStudents);
      res.status(200).send({ data: { result: result, message: "New students added successfully" } });
    } catch (error) {
      res.status(500).send({ data: "Internal server error" });
    }
  });

router.put("/assign-mentor/:studentId", async (req, res) => {
    try {
        const { studentId } = req.params;
        const { mentorId } = req.body;

        // Check if both studentId and mentorId are provided
        if (!studentId || !mentorId) {
            return res.status(400).json({ error: "Incomplete data provided" });
        }

        // Retrieve the student and mentor from the database
        const student = await getStudentById(studentId);
        const mentor = await getMentorById(mentorId);

        // Check if the student and mentor exist
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }

        let previousMentor="";
        let previousMentorId="";

        if(student.mentor!==""){
            previousMentor=student.mentor;
            previousMentorId=student.mentorId;
        }

        // Update the student with the new mentor
        const updatedData = { mentorId: mentorId, mentor: mentor.name, previousMentor: previousMentor, previousMentorId:previousMentorId};

        const result = await updateStudentData(studentId, updatedData);

        res.status(200).json({
            message: "Mentor assigned successfully",
            data: {
                student: result,
                mentor: mentor,
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});



router.put("/assign-mentor-by-batch/:mentorId", async (req, res) => {
    try {
        const { mentorId } = req.params;
        const { batch } = req.body;

        // Check if mentorId and batch are provided
        if (!mentorId || !batch) {
            return res.status(400).json({ error: "Incomplete data provided" });
        }

        // Retrieve the mentor from the database
        const mentor = await getMentorById(mentorId);
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }

        // Retrieve the students with the specified batch and no mentor assigned
        const students = await getFilteredStudents({ batch: batch, mentor: "" });

        if (!(students.length)) {
            return res.status(404).json({ error: "Already assigned" })
        }

        // Update the students with the new mentor
        const updatedData = { mentorId: mentorId, mentor: mentor.name };
        const results = await Promise.all(students.map(student => updateStudentData(student._id, updatedData)));

        res.status(200).json({
            message: "Students assigned to mentor successfully",
            data: {
                mentor: mentor,
                students: results.map(result => result.value),
            },
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/filtered-by-mentor/:mentorId", async (req, res) => {
    try {
        const { mentorId } = req.params;
        if (!mentorId) {
            return res.status(400).json({ error: "no data provided" });
        }
        const result = await getFilteredStudents({ mentorId: mentorId });
        res.status(200).json({ data: { result: result } })
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});


router.get("/previous-mentor/:studentId", async (req, res) => {
    try {
        const { studentId }=req.params;
        if(!studentId){
            return res.status(400).json({error:"no data provided"});
        }
        const result=await getStudentById(studentId);
        if(result.previousMentor===""){
            return res.status(400).json({message:"no Previous Mentor"})
        }
        res.status(200).json({data:{result:result.previousMentor}});
    } catch (error) {

    }
})


router.delete("/delete", async (req, res) => {
    try {
        // const { id } = req.params;
        // if (!id) {
        //     return res.status(400).json({ data: "No details provided" });
        // }
        const result = await deleteStudentData();
        res.status(200).json({ data: { result: result, message: "Deleted successfully" } });
    } catch (error) {
        res.status(500).json({ data: "Internal server error" });
    }
});

export const studentsRouter = router;



























