const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    salaryMin: {
      type: Number,
      default: 0
    },

    salaryMax: {
      type: Number,
      default: 0
    },

    location: {
      type: String,
      default: ''
    },

    jobType: {
      type: String,
      enum: ['Full Time', 'Internship', 'Part Time'],
      default: 'Full Time'
    },

    experience: {
      type: String,
      default: ''
    },

    deadline: {
      type: Date
    },

    companyName: {
      type: String,
      default: ''
    },

    recruiterId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },

    status: {
      type: String,
      enum: ['pending', 'approved', 'closed'],
      default: 'approved'
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.Job ||
  mongoose.model('Job', jobSchema);