const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {

    return jwt.sign(
        {
            id: user._id,
            role: user.role
        },

        process.env.JWT_SECRET,

        {
            expiresIn: "7d"
        }
    );
};


// REGISTER
const register = async (req, res) => {

    console.log("=================================");
    console.log("REGISTER API CALLED");
    console.log("Request body:", req.body);
    console.log("=================================");

    try {

        const {
            name,
            email,
            password,
            role
        } = req.body;

        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Name, email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        console.log("Creating user...");

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: role === "recruiter"
                ? "recruiter"
                : "student"
        });
        console.log("User created:", user._id);
         
        console.log("✅ USER CREATED:", user.email);

        const token = generateToken(user);

        console.log("✅ TOKEN CREATED");

        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

    console.error("=================================");
    console.error("REGISTRATION ERROR");
    console.error("Message:", error.message);
    console.error("Stack:", error.stack);
    console.error("Full Error:", error);
    console.error("=================================");

    res.status(500).json({
        message: "Registration failed",
        error: error.message
    });
}
}

// LOGIN
const login = async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                message:
                    "Email and password are required"
            });
        }

        const user =
            await User.findOne({ email });

        if (!user) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        const validPassword =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!validPassword) {

            return res.status(401).json({
                message:
                    "Invalid email or password"
            });
        }

        console.log("Generating JWT...");

        const token = generateToken(user);

        console.log("JWT generated successfully");

        res.json({

            message: "Login successful",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {

    console.error("REGISTRATION ERROR:", error);

    res.status(500).json({
        message: "Registration failed",
        error: error.message
    });
}
};


module.exports = {
    register,
    login

};