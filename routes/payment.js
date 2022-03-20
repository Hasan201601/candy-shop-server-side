const Payment = require("../models/Payment");
const { verifyTokenAndAuthorization } = require("./verifyToken");
const stripe = require("stripe")(process.env.STRIPE_SECRET);


const router = require("express").Router();


/* router.get("/:userId", verifyTokenAndAuthorization, async (req, res) => {
    try {

        res.status(200).json(buyer);
    } catch (err) {
        res.status(500).json(err)
    }
}) */

router.post("/create-payment-intent", async (req, res) => {
    console.log(req.body)
    try {

        const payment_info = req.body;
        const amount = payment_info.price * 100;
        const paymenIntent = await stripe.paymentIntents.create({
            currency: "eur",
            amount: amount,
            payment_method_types: ['card']
        })
        const buyer = await Payment.findOne({ userId: req.params.userId })
        res.status(200).json({ clientSecret: paymenIntent, client_secret, buyer })
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