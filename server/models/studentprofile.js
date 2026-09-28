const mongoose = require("mongoose");

const studentProfileSchema =
    new mongoose.Schema(
        {
            userId: {
                type:
                    mongoose.Schema.Types.ObjectId,
                ref: "User",
                unique: true,
                required: true
            },

            phone: String,

            college: String,

            degree: String,

            branch: String,

            graduationYear: Number,

            cgpa: Number,

            skills: [String],

            github: String,

            linkedin: String,

            resumeUrl: String
        },

        {
            timestamps: true
        }
    );

module.exports =
    mongoose.model(
        "StudentProfile",
        studentProfileSchema
    );