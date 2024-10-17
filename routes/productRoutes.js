const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const ProductController = require("../controllers/Product.controller")
const checkAuth = require('../middlewares/authMiddleware')

// Rutas de productos sin autenticación
router.get("/", ProductController.showProducts)
router.get("/products", ProductController.showProducts);
router.get("/products/:_id", ProductController.showProductById);

// Rutas de productos con autenticación
router.get("/product/:id?dashboard=true", checkAuth, ProductController.showProductById);
router.get("/dashboard", checkAuth, ProductController.showDashboard);
router.get("/dashboard/new", checkAuth, ProductController.showNewProduct);
router.post("/dashboard/new", checkAuth, ProductController.createProduct);
router.get("/dashboard/:id/edit", checkAuth, ProductController.showEditProduct);
router.put("/dashboard/:id/edit", checkAuth, ProductController.updateProduct);
router.get("/dashboard/delete/:id", checkAuth, ProductController.deleteProduct);

module.exports = router