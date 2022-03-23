const Payment = require("../models/Payment");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const stripe = require("stripe")("sk_test_51KQZwpItc42Fo0RyTu4jlZ5Llm8PAeRf2GgPS1FatHD4NYaw5R8DWWSkNg0Eh7CJb31kQpGY1QmK6l3m7c88UnAO00PtRBOw7b");


const router = require("express").Router();


/* router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {

        res.status(200).json(buyer);
    } catch (err) {
        res.status(500).json(err)
    }
}) */

router.post("/create-payment-intent", async (req, res) => {

    try {

        const payment_info = req.body;
        const amount = payment_info.price
        console.log(amount);
        const convertedAmount = amount * 100;
        const paymentIntent = await stripe.paymentIntents.create({
            currency: "eur",
            amount: convertedAmount,
            payment_method_types: ['card']
        })
        res.status(200).json({ clientSecret: paymentIntent.client_secret })
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})

/* router.put("/:userId", async (req, res) => {
    try {
        const payment = await Payment.findByIdAndUpdate(req.params.id, {
            $set: {
                payment: req.body
            }
        }, { new: true })
        res.status(200).json(payment);
    } catch (err) {
        res.status(500).json(err)
    }
}) */



module.exports = router;