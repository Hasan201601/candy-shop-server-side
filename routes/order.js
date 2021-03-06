const Order = require("../models/Order");
const Product = require("../models/Product");
const { findByIdAndUpdate } = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", async (req, res) => {
    const newOrder = new Order(req.body)

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    console.log(req.body)

    try {
        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted successfully!")
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET Orders
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const orders = await Order.find(req.params.userId)
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get("/purchase/:userId", async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.params.userId })
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET All 
router.get("/", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find()
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err);
    }
})
router.get("/recent", verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order.find().limit(10)
        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;