const express = require('express');
const router = express.Router();

const Application = require('../models/application');
const { protect } = require('../middleware/authMiddleware');


// ========================================
// APPLY FOR JOB
// ========================================
router.post('/', protect, async (req, res) => {

  try {

    const { job } = req.body;

    console.log('===== APPLY JOB =====');
    console.log('Logged in user:', req.user);
    console.log('Job ID:', job);

    // Student comes from logged-in user
    const student = req.user._id;

    if (!student) {
      return res.status(401).json({
        message: 'Student not authenticated'
      });
    }

    if (!job) {
      return res.status(400).json({
        message: 'Job is required'
      });
    }


    // Check duplicate application
    const existingApplication =
      await Application.findOne({
        student,
        job
      });

    if (existingApplication) {
      return res.status(400).json({
        message: 'You have already applied for this job'
      });
    }


    // Create application
    const application =
      await Application.create({
        student,
        job,
        status: 'Applied'
      });


    console.log(
      'Application created:',
      application._id
    );


    return res.status(201).json({

      message:
        'Application submitted successfully',

      application

    });

  } catch (error) {

    console.error(
      'APPLY ERROR:',
      error
    );

    return res.status(500).json({
      message: 'Application failed',
      error: error.message
    });

  }

});


// ========================================
// GET MY APPLICATIONS
// ========================================
router.get('/my', protect, async (req, res) => {

  try {

    const student =
      req.user._id;

    console.log(
      '===== GET MY APPLICATIONS ====='
    );

    console.log(
      'Student:',
      student
    );


    const applications =
      await Application.find({
        student
      })
      .populate(
        'job',
        'title companyName location jobType salaryMin salaryMax deadline'
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
      message:
        'Failed to fetch applications',

      error: error.message
    });

  }

});


module.exports = router;