const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            required: true
        },
        desc1: {
            type: String
        },
        desc2: {
            type: String
        },
        desc3: {
            type: String
        },
        img1: {
            type: String,
            required: true
        },
        img2: {
            type: String,
            required: true
        },
        img3: {
            type: String,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        mysterybox: {
            type: Boolean,
            default: false
        },
        price: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema);