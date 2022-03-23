const Product = require("../models/Product");
const { findByIdAndUpdate } = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = require("express").Router();

// CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
    console.log(req.body);
    /* console.log(req.files)
    console.log(req.body);

    const encodeToBuffer = (pic) => {
        const picData = pic.data
        const encodedPic = picData.toString('base64')
        const image = Buffer.from(encodedPic, "base64")
        return image
    }
    const img1 = encodeToBuffer(req.files.img1)
    const img2 = encodeToBuffer(req.files.img2)
    const img3 = encodeToBuffer(req.files.img3)

    const images = {
        img1, img2, img3
    }
    const addedProduct = {
        ...images,
        ...req.body
    } */
    const newProduct = new Product(req.body)

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//update stock
router.put("/find/:id", async (req, res) => {
    const stock = req.body.stock
    console.log(req.body);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: { stock }
        }, { new: true })
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err)
    }
})

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
    /*  const encodeToBuffer = (pic) => {
         const picData = pic.data
         const encodedPic = picData.toString('base64')
         const image = Buffer.from(encodedPic, "base64")
         return image
     }
     const img1 = encodeToBuffer(req.files.img1)
     const img2 = encodeToBuffer(req.files.img2)
     const img3 = encodeToBuffer(req.files.img3)
 
     const images = {
         img1, img2, img3
     }
     const updatedData = {
         ...images,
         ...req.body
     } */

    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            $set: updatedData
        }, { new: true })
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err)
    }
})

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json("Product has been deleted successfully!")
    } catch (err) {
        res.status(500).json(err)
    }
})

// GET Product
router.get("/find/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET MysteryBox Product
router.get("/mystery", async (req, res) => {
    try {
        const mysteryBox = await Product.find({ mysterybox: true })
        res.status(200).json(mysteryBox);
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get All Products
router.get("/", async (req, res) => {

    try {
        const products = await Product.find()
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
    }
})

//Find latest products
router.get("/latest", async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 }).limit(8)
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err)
    }
})

// Find Product by Category
router.get("/:category", async (req, res) => {
    console.log(req.params.category);
    try {
        const productsByCategory = await Product.find({ category: req.params.category });
        res.status(200).json(productsByCategory)
    } catch (err) {
        res.status(500).json(err)
    }
})




module.exports = router;