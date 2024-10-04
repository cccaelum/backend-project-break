const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const ProductController = require("../controllers/Product.controller")

router.get("/dashboard", ProductController.showDashboard);
router.get("/dashboard/new", ProductController.showNewProduct);
router.post("/dashboard/new", ProductController.createProduct)
router.get("/products", ProductController.showProducts)
router.get("/products/:_id", ProductController.showProductById)
router.get("/dashboard/delete/:id", ProductController.deleteProduct)

module.exports = router