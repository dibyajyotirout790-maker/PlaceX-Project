require("dotenv").config();

const connectDB = require("./config/db");
const Job = require("./models/job");

const seedJobs = async () => {
    try {

        // Connect to MongoDB
        await connectDB();

        console.log("Connected to MongoDB");

        // Remove existing jobs
        await Job.deleteMany({});

        console.log("Old jobs deleted");

        // Add sample jobs
        const jobs = await Job.insertMany([

            {
                title: "Software Developer",
                description:
                    "We are looking for a Software Developer to join our development team and work on web applications.",
                skills: [
                    "Java",
                    "JavaScript",
                    "HTML",
                    "CSS",
                    "MongoDB"
                ],
                salaryMin: 400000,
                salaryMax: 700000,
                location: "Bangalore",
                jobType: "Full Time",
                experience: "0-2 years",
                deadline: new Date("2026-12-31"),
                companyName: "Tech Solutions India",
                status: "approved"
            },

            {
                title: "Frontend Developer",
                description:
                    "Join our frontend team and build modern responsive web applications using Angular and JavaScript.",
                skills: [
                    "Angular",
                    "HTML",
                    "CSS",
                    "JavaScript",
                    "TypeScript"
                ],
                salaryMin: 350000,
                salaryMax: 650000,
                location: "Hyderabad",
                jobType: "Full Time",
                experience: "0-2 years",
                deadline: new Date("2026-11-30"),
                companyName: "WebTech Solutions",
                status: "approved"
            },

            {
                title: "Full Stack Developer Intern",
                description:
                    "Internship opportunity for students interested in full stack web development.",
                skills: [
                    "Node.js",
                    "Express",
                    "MongoDB",
                    "Angular",
                    "JavaScript"
                ],
                salaryMin: 15000,
                salaryMax: 25000,
                location: "Remote",
                jobType: "Internship",
                experience: "Fresher",
                deadline: new Date("2026-10-31"),
                companyName: "InnovateTech",
                status: "approved"
            },

            {
                title: "Java Developer",
                description:
                    "Entry-level Java developer position for candidates interested in backend development.",
                skills: [
                    "Java",
                    "Spring Boot",
                    "SQL",
                    "REST API"
                ],
                salaryMin: 450000,
                salaryMax: 800000,
                location: "Pune",
                jobType: "Full Time",
                experience: "0-1 years",
                deadline: new Date("2026-12-15"),
                companyName: "CodeWorks India",
                status: "approved"
            },

            {
                title: "Software Engineering Intern",
                description:
                    "Work with experienced engineers on real-world software development projects.",
                skills: [
                    "C++",
                    "Java",
                    "Python",
                    "Data Structures",
                    "Git"
                ],
                salaryMin: 20000,
                salaryMax: 30000,
                location: "Chennai",
                jobType: "Internship",
                experience: "Fresher",
                deadline: new Date("2026-11-15"),
                companyName: "NextGen Technologies",
                status: "approved"
            }

        ]);

        console.log(`${jobs.length} jobs inserted successfully`);

        jobs.forEach((job) => {
            console.log(
                `${job.title} - ${job.companyName} - ${job.status}`
            );
        });

        process.exit(0);

    } catch (error) {

        console.error("SEED JOB ERROR:");
        console.error(error);

        process.exit(1);
    }
};

seedJobs();