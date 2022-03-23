const User = require("../models/User");
const { findByIdAndUpdate } = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

router.put("/:id", async (req, res) => {
    console.log("showing", req.body);
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { upsert: true, strict: false })
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted successfully!")
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET All Users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users);
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})


// GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ])
        res.status(200).json(data)
    } catch (Err) {
        res.status(500).json(Err)
    }
})

module.exports = router;