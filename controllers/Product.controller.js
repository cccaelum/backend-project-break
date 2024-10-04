const Product = require("../models/Product")

const ProductController = {
    async showDashboard (req, res) {
      try {
        const products = await Product.find();
      
        let dashboard = `
                <!DOCTYPE html>
                <html lang="es">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Dashboard</title>
                </head>
                <body>
                    <h1>Administrador</h1>
                    <ul>`;

                    products.forEach(product => {
                      dashboard += `
                          <li>
                              <h3>${product.name}</h3>
                              <p>${product.description}</p>
                              <p>Categoría: ${product.category}</p>
                              <p>Precio: ${product.price}€</p>
                              <img src="${product.image}" alt="Imagen del producto" width="150">
                              <br>
                              <a href="/dashboard/edit/${product._id}">Editar producto</a>
                              <a href="/dashboard/delete/${product._id}">Eliminar producto</a>
                          </li>
                          <hr>`;
                  });
                  dashboard += `
                          </ul>
                      </body>
                      </html>`;
                      res.send(dashboard);
    } catch (error) {
        res.status(500).send('Error: dashboard not loaded');
    }
    },
    async showProducts (req, res) {
      try {
        const products = await Product.find()
        res.status(200).json(products)
      } catch (err) {
        console.error("Error: products not found", err)
      }
    },
    async showProductById (req, res) {
      try {
        const product = await Product.findById(req.params._id);
        if (!product) {
          return res.status(404).json({message: 'Product not found'});
        }
        res.status(200).json(product);
      } catch (err) {
        console.error("Error: product not found", err)
      }
    },
    async showNewProduct (req, res) {
      const formHtml = `
          <div class="add-product-form">
            <form action="/dashboard/new" method="post">
                <label for="name">Nombre del producto:</label>
                <input type="text" id="name" name="name" required><br>
                <label for="description">Descripción:</label>
                <input type="text" id="description" name="description" required><br>
                <label for="image">Imagen (url):</label>
                <input type="url" id="image" name="image"><br>
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
          } catch (error) {
            res.status(500).send('Error: product not added');
          }
    },
    async showEditProduct (req, res) {},
    async updateProduct (req, res) {},
    async deleteProduct (req, res) {
      try {
        console.log("Solicitud DELETE recibida");
        console.log("ID del producto:", req.params.id);
        const product = await Product.findByIdAndDelete(req.params.id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });  
    } catch (error) {
        res.status(500).json({ message: 'Error: product not deleted', error });
    }
    }
}

module.exports = ProductController