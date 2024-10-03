const Product = require("../models/Product")

const ProductController = {
    async showProducts (req, res) {
      try {
        const products = await Product.find()
        res.status(200).json(products)
      } catch (err) {
        console.error("Error: products not found", err)
      }
    },
    async showProductById (req, res) {},
    async showNewProduct (req, res) {
      const formHtml = `
          <div class="add-product-form">
            <form action="/dashboard/new" method="post">
                <label for="name">Nombre del producto:</label>
                <input type="text" id="name" name="name" required><br>
                <label for="description">Descripción:</label>
                <input type="text" id="description" name="description" required><br>
                <label for="image">Imagen (url):</label>
                <input type="url" id="image" name="image" required><br>
                <label for="category">Categoría:</label>
                <select name="category">
                    <option value="earrings" selected>Pendientes</option>
                    <option value="necklaces">Collares</option>
                    <option value="rings">Anillos</option>
                </select><br>
                <label for="price">Precio:</label>
                <input type="number" id="price" name="price" required><br>
                <button type="submit">Agregar producto</button>
            </form>
          </div>
        `;
        res.send(formHtml);
    },
    async createProduct (req, res) {
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
            res.status(201).json(newProduct)
            //res.redirect('/dashboard'); 
          } catch (error) {
            res.status(500).send('Error: product not added');
          }
    },
    async showEditProduct (req, res) {},
    async updateProduct (req, res) {},
    async deleteProduct (req, res) {}
}

module.exports = ProductController