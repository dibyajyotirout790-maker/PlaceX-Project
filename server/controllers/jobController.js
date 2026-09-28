const Job = require("../models/job");


// CREATE JOB
const createJob = async (req, res) => {

    try {

        const job = await Job.create({

            ...req.body,

            recruiterId: req.user._id

        });

        res.status(201).json({

            message:
                "Job created successfully",

            job

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to create job"
        });
    }
};


// GET JOBS
const getJobs = async (req, res) => {

    try {

        const {
            search,
            location,
            jobType
        } = req.query;

        let filter = {
            status: "approved"
        };


        if (search) {

            filter.title = {
                $regex: search,
                $options: "i"
            };
        }


        if (location) {

            filter.location = {
                $regex: location,
                $options: "i"
            };
        }


        if (jobType) {

            filter.jobType = jobType;
        }


        const jobs =
            await Job.find(filter)
                .sort({
                    createdAt: -1
                });


        res.json(jobs);

    } catch (error) {

        res.status(500).json({
            message:
                "Failed to fetch jobs"
        });
    }
};


// GET SINGLE JOB
const getJob = async (req, res) => {

    try {

        const job =
            await Job.findById(
                req.params.id
            );

        if (!job) {

            return res.status(404).json({
                message: "Job not found"
            });
        }

        res.json(job);

    } catch (error) {

        res.status(500).json({
            message:
                "Failed to fetch job"
        });
    }
};


module.exports = {
    createJob,
    getJobs,
    getJob
};