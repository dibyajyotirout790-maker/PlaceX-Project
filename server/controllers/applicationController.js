const Application = require('../models/application');
const Job = require('../models/job');


// ========================================
// APPLY FOR JOB
// ========================================

const applyForJob = async (req, res) => {

  try {

    const jobId = req.params.jobId;
    const studentId = req.user._id;

    console.log('========== APPLY FOR JOB ==========');
    console.log('Student:', studentId);
    console.log('Job:', jobId);

    // Check job
    const job = await Job.findById(jobId);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    // Check duplicate application
    const existingApplication =
      await Application.findOne({
        student: studentId,
        job: jobId
      });

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job'
      });
    }

    // Create application
    const application =
      await Application.create({
        student: studentId,
        job: jobId,
        status: 'Applied'
      });

    console.log('Application created:', application._id);

    return res.status(201).json({
      message: 'Application submitted successfully',
      application
    });

  } catch (error) {

    console.error('APPLICATION ERROR:', error);

    // Duplicate MongoDB index
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'You have already applied for this job'
      });
    }

    return res.status(500).json({
      message: 'Application failed',
      error: error.message
    });
  }
};


// ========================================
// GET MY APPLICATIONS
// ========================================

const getMyApplications = async (req, res) => {

  try {

    const studentId = req.user._id;

    console.log('========== MY APPLICATIONS ==========');
    console.log('Student:', studentId);

    const applications =
      await Application.find({
        student: studentId
      })
      .populate(
        'job',
        'title companyName location jobType salaryMin salaryMax description skills'
      )
      .sort({
        createdAt: -1
      });

    console.log(
      'Applications found:',
      applications.length
    );

    return res.status(200).json(
      applications
    );

  } catch (error) {

    console.error(
      'GET APPLICATIONS ERROR:',
      error
    );

    return res.status(500).json({
      message: 'Failed to fetch applications',
      error: error.message
    });
  }
};


module.exports = {
  applyForJob,
  getMyApplications
};