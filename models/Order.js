const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        userEmail: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        },
        created: {
            type: String,
            required: true
        },
        last4: {
            type: String,
            required: true
        },
        transaction: {
            type: String,
            required: true
        },
        items: {
            type: Array,
            required: true
        },
        status: {
            type: String,
            default: "pending"
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema);