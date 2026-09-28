const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true
    },

    role: {
      type: String,
      enum: ['student', 'recruiter', 'admin'],
      default: 'student'
    },

    phone: {
      type: String,
      default: ''
    },

    college: {
      type: String,
      default: ''
    },

    branch: {
      type: String,
      default: ''
    },

    graduationYear: {
      type: String,
      default: ''
    },

    cgpa: {
      type: Number,
      default: null
    },

    skills: {
      type: [String],
      default: []
    },

    resume: {
      type: String,
      default: ''
    },

    bio: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports =
  mongoose.models.User ||
  mongoose.model('User', userSchema);