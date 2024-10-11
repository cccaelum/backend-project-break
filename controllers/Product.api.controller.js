const Product = require('../models/Product');

const ProductApiController = {
    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products); 
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving products', error });
        }
    },

    async getProductById(req, res) {
        try {
            const product = await Product.findById(req.params.id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product); 
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving product', error });
        }
    },

    async createProduct(req, res) {
        try {
            const { name, description, image, category, price } = req.body;
            const newProduct = new Product({
                name,
                description,
                image,
                category,
                price
            });
            await newProduct.save();
            res.status(201).json(newProduct); 
        } catch (error) {
            res.status(500).json({ message: 'Error creating product', error });
        }
    },

    async updateProduct(req, res) {
        try {
            const { name, description, image, category, price } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
                name,
                description,
                image,
                category,
                price
            }, { new: true }); 

            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: 'Error updating product', error });
        }
    },

    async deleteProduct(req, res) {
        try {
            const deletedProduct = await Product.findByIdAndDelete(req.params.id);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting product', error });
        }
    }
};

module.exports = ProductApiController;
