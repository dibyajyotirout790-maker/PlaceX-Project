const User = require("../models/user");

// ===============================
// GET PROFILE
// ===============================
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({
      user
    });

  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    return res.status(500).json({
      message: "Failed to load profile"
    });
  }
};


// ===============================
// UPDATE PROFILE
// ===============================
const updateProfile = async (req, res) => {
  try {

    console.log("===== PROFILE UPDATE =====");
    console.log("User:", req.user._id);
    console.log("Body:", req.body);

    const {
      name,
      phone,
      college,
      branch,
      cgpa,
      skills
    } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    // Update fields
    if (name !== undefined)
      user.name = name;

    if (phone !== undefined)
      user.phone = phone;

    if (college !== undefined)
      user.college = college;

    if (branch !== undefined)
      user.branch = branch;

    if (cgpa !== undefined && cgpa !== '')
      user.cgpa = Number(cgpa);

    if (skills !== undefined) {

      if (Array.isArray(skills)) {
        user.skills = skills;
      } else {
        user.skills = skills
          .split(',')
          .map(skill => skill.trim())
          .filter(skill => skill.length > 0);
      }

    }

    const updatedUser = await user.save();

    console.log("PROFILE SAVED:", updatedUser._id);

    return res.status(200).json({
      message: "Profile updated successfully",

      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        college: updatedUser.college,
        branch: updatedUser.branch,
        cgpa: updatedUser.cgpa,
        skills: updatedUser.skills
      }
    });

  } catch (error) {

    console.error("PROFILE UPDATE ERROR:", error);

    return res.status(500).json({
      message: "Profile update failed",
      error: error.message
    });
  }
};


module.exports = {
  getProfile,
  updateProfile
};