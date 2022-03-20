const CreateCategory = require("../models/CreateCategory");



const router = require("express").Router();


router.post("/", async (req, res) => {
    const categories = new CreateCategory(req.body)
    try {
        const savedCategories = await categories.save()
        res.status(200).json(savedCategories)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.get("/", async (req, res) => {
    try {
        const categories = await CreateCategory.find()
        res.status(200).json(categories)
    } catch (err) {
        res.status(500).json(err)
    }
})



module.exports = router;