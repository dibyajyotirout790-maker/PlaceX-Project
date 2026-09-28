const express = require("express");

const {
    createJob,
    getJobs,
    getJob
} = require(
    "../controllers/jobController"
);

const {
    protect
} = require(
    "../middleware/authMiddleware"
);

const authorize =
    require(
        "../middleware/roleMiddleware"
    );

const router = express.Router();


// Recruiter creates job
router.post(
    "/",
    protect,
    authorize("recruiter"),
    createJob
);


// Students/recruiters can view jobs
router.get(
    "/",
    protect,
    getJobs
);


// Single job
router.get(
    "/:id",
    protect,
    getJob
);

module.exports = router;