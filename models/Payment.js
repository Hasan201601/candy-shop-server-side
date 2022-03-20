const moongose = require("mongoose");


const PaymentSchema = new moongose.Schema({
    payment_info: {
        type: Object,
        required: true
    }
})


module.exports = moongose.model("payment", PaymentSchema);