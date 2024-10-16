const express = require("express")
const router = express.Router()
const Product = require("../models/Product")
const ProductController = require("../controllers/Product.controller")
const productApiController = require('../controllers/Product.api.controller');
const path = require('path');
const admin = require('firebase-admin');
const auth = admin.auth();
const checkAuth = require('../middlewares/authMiddleware')

// Rutas tienda
router.get("/", ProductController.showProducts)
router.get("/products", ProductController.showProducts);
router.get("/products/:_id", ProductController.showProductById);
router.get("/product/:id?dashboard=true", ProductController.showProductById);
router.get("/dashboard", checkAuth, ProductController.showDashboard);
router.get("/dashboard/new", ProductController.showNewProduct);
router.post("/dashboard/new", ProductController.createProduct);
router.get("/dashboard/:id/edit", ProductController.showEditProduct);
router.put("/dashboard/:id/edit", ProductController.updateProduct);
router.get("/dashboard/delete/:id", ProductController.deleteProduct);

// Rutas Firebase
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'register.html'))
})

router.post("/register", async (req, res) => {
    const { email, password } = req.body
    try {
      await auth.createUser({
        email,
        password
      });
      res.redirect("/login")

    } catch (error) {
        console.error(`internal error: ${error}`)
        res.redirect("/register")
    }
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/views', 'login.html'))
})

router.post("/login", async (req, res) => {
    const { idToken } = req.body;
    if (!idToken) {
        return res.json({ success: false, error: 'No ID token provided' });
    }
    try {
        await auth.verifyIdToken(idToken)
        res.cookie('token', idToken, {httpOnly: true, secure: false});
        res.json({success: true})
    } catch (error) {
        console.error('Error verifying ID token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
})

router.post("/logout", (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
})

// Rutas API
router.get('/api/products', productApiController.getAllProducts);
router.get('/api/products/:id', productApiController.getProductById);
router.post('/api/products/new', productApiController.createProduct);
router.put('/api/products/:id', productApiController.updateProduct);
router.delete('/api/products/:id', productApiController.deleteProduct);

module.exports = router