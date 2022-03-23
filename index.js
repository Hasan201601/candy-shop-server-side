const express = require("express");
const app = express();
const cors = require("cors")
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/products")
const orderRoutes = require("./routes/order")
const categoryRoute = require("./routes/category")
const paymentRoute = require("./routes/payment")
const fileUplaod = require("express-fileupload")
app.use(cors())
app.use(fileUplaod())
dotenv.config();


mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => {
        console.log("DB connection successful!")
    })
    .catch(err => {
        console.log(err)
    })
app.use(express.json());
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoutes)
app.use("/api/categories", categoryRoute)
app.use("/api/payment", paymentRoute)


app.listen(process.env.PORT || 5000, () => {
    console.log("backend server is running!")
})