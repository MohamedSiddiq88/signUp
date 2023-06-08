import express from "express";
import { addMentorData, deleteMentorData, getAllMentors, getMentorById, updateMentorData } from "../Controllers/mentors.js";

const router = express.Router();

router.get("/all", async (req, res) => {
    try {
        if (req.query.experience) {
            req.query.experience = parseInt(req.query.experience);
        }
        const mentors = await getAllMentors(req);
        if (mentors.length <= 0) {
            res.status(400).send("mentor not found");
            return;
        }
        res.status(200).json({ data: mentors });
    } catch (error) {
        res.status(500).json("internal server error");
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const mentor = await getMentorById(id);
        if (!mentor) {
            res.status(400).send("mentor not found");
            return;
        }
        res.status(200).json({ data: mentor });
    } catch (error) {
        res.status(500).json("internal server error");
    }
});

router.post("/add", async (req, res) => {
    try {
        const newMentor = req.body;
        if (!newMentor) {
            return res.status(400).send({ data: "No details provided" });
        }
        const result = await addMentorData(newMentor);
        res.status(200).send({ data: { result: result, message: "New Mentor added successfully" } });
    } catch (error) {
        res.status(500).send({ data: "Internal server Error" });
    }
});

router.put("/edit/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        if (!id || !updatedData) {
            return res.status(400).json({ data: "No details provided" });
        }
        const result = await updateMentorData(id, updatedData);
        res.status(200).json({ data: { result: result, message: "Updated successfully" } });

    } catch (error) {
        res.status(500).json({ data: "Internal server Error" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ data: "No details provided" });
        }
        const result = await deleteMentorData(id);
        res.status(200).json({ data: { result: result, message: "Deleted successfully" } });


    } catch (error) {
        res.status(500).json({ data: "Internal server Error" });
    }
});

export const mentorsRouter = router;
