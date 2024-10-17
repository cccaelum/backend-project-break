const express = require('express');
const router = express.Router();
const productApiController = require('../controllers/Product.api.controller');

router.get('/api/products', productApiController.getAllProducts);
router.get('/api/products/:id', productApiController.getProductById);
router.post('/api/products/new', productApiController.createProduct);
router.put('/api/products/:id', productApiController.updateProduct);
router.delete('/api/products/:id', productApiController.deleteProduct);

module.exports = router;
