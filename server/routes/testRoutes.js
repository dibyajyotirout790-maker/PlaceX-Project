const express = require("express");

const { protect } = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/profile", protect, (req, res) => {

    res.json({
        message: "Protected route accessed",
        user: req.user
    });

});

router.get(
    "/admin",
    protect,
    authorize("admin"),
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });

    }
);

module.exports = router;