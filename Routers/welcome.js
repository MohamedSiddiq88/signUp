import express from "express";
import { addStudentData, addStudentsData, deleteStudentData, getAllStudents, getFilteredStudents, getStudentById, updateStudentData } from "../Controllers/students.js";
import { getMentorById } from "../Controllers/mentors.js";

const router = express.Router();

router.get("/", (req, res) => {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              padding: 20px;
            }
            
            h1 {
              color: #333;
              text-align: center;
            }
            
            p {
              margin-bottom: 10px;
            }
            
            a {
              color: #007bff;
              text-decoration: none;
            }
            
            a:hover {
              text-decoration: underline;
            }
            
            .container {
              max-width: 80%;
              margin: 0 auto;
            }
            
            .endpoint {
              background-color: #f9f9f9;
              border: 1px solid #ccc;
              padding: 10px;
              margin-bottom: 20px;
            }
            
            .code {
              background-color: #eee;
              padding: 5px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Welcome to the Students and Mentors Data Portal</h1>
            <p>Click <a href="/mentors/all">here</a> to view all Mentors data.</p>
            <p>Click <a href="/students/all">here</a> to view all student data.</p>

            <div class="endpoint">
              <p>1. Endpoint to add a mentor: <span class="code">/mentors/add</span></p>
              <p>Description: you should include the details of the new mentor in the request body</p>
            </div>

            <div class="endpoint">
              <p>2. Endpoint to add a student: <span class="code">/students/add</span></p>
              <p>Description: you should include the details of the new student in the request body</p>
            </div>

            <div class="endpoint">
              <p>3. Endpoint to assign a mentor to students by batch: <span class="code">/students/assign-mentor-by-batch/:mentorId</span></p>
              <p>Description: you should include the batch in the request body</p>
            </div>

            <div class="endpoint">
              <p>4. Endpoint to assign a mentor to a student: <span class="code">/students/assign-mentor/:studentId</span></p>
              <p>Description: you should include the mentorId in the request body</p>
            </div>
            
            <div class="endpoint">
              <p>5. Endpoint to show all students for a particular mentor: <span class="code">/students/filtered-by-mentor/:mentorId</span></p>
            </div>

            <div class="endpoint">
              <p>6. Endpoint to show previously assigned mentor for a particular student: <span class="code">/students/previous-mentor/:studentId</span></p>
            </div>
          </div>
        </body>
      </html>
    `;
    res.send(htmlContent);
});

export const welcomeRouter = router;
