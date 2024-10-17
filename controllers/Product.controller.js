const Product = require("../models/Product")

const ProductController = {
    async showDashboard (req, res) {
      try {
        const products = await Product.find();
      
        let dashboard = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <link rel="stylesheet" href="/css/styles.css">
                    <title>ResinDreams - Dashboard</title>
                </head>
                <body>
                    <header>
                      <h1>Administration - ResinDreams</h1>
                      <form action="/logout" method="post" class="logout">
                          <button type="submit" class="logout-btn">Log out</button>
                      </form>
                    </header>
                    <h2>Product Inventory</h2>
                    <ul class="product-list">`;
                    if (products.length > 0) {
                    products.forEach(product => {
                      dashboard += `
                          <li class="productItem">
                              <h3>
                                <a href="/products/${product.id}?dashboard=true">${product.name}</a>
                              </h3>
                              <p>Price: ${product.price}€</p>
                              <img src="${product.image}" alt="Product image" width="150">
                          </li>`;
                  });
                } else {
                  dashboard += `<p>Oops, it seems there are no products in inventory...</p>`;
                }
                  dashboard += `
                          </ul>
                        <section id="add-product">
                            <h2>
                              <a href="/dashboard/new" class="add-product-link">Add a new product +</a>
                            </h2>
                        </section>
                        
            <footer>
                <nav class="footer-nav">
                    <a href="/">Home</a>
                </nav>
                <p>© 2024, Celia Cebaquebas</p>
            </footer>
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

        // Filtramos por categoría si se pasa por query
      const category = req.query.category || "all";
      const filteredProducts = category === "all" ? products : products.filter(product => product.category === category);

        let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resin Dreams ☾</title>
          <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
          <nav>
              <ul>
                  <li><a href="/products?category=all">Products</a></li>
                  <li><a href="/products?category=earrings">Earrings</a></li>
                  <li><a href="/products?category=necklaces">Necklaces</a></li>
                  <li><a href="/products?category=rings">Rings</a></li>
                  <li class="login-button"><a href="/dashboard">Log in</a></li>
              </ul>
          </nav>

          <h1>Available products</h1>
          <ul class="product-list">`;

      // Renderizamos los productos filtrados
      if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        html += `
          <li class="productItem">
              <h3>
                <a href="/products/${product.id}">${product.name}</a>
              </h3>
              <img src="${product.image}" alt="${product.name}" width="150">
              <p>${product.price}€</p>
              <br>
          </li>`;
      });
    } else {
      html += `<p>Oops, it seems there is nothing...</p>`;
    }
      html += `
          </ul>
          <footer>
              <p>&copy; 2024, Celia Cebaquebas</p>
              <div class="footer-nav">
                  <a href="/">Home</a>
                  •••
                  <a href="/register">Register</a>
              </div>
          </footer>
      </body>
      </html>`;

      res.send(html);
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

        const isDashboard = req.query.dashboard === 'true'; // Verifica si el acceso es desde el dashboard

        let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Product details</title>
            <link rel="stylesheet" href="/css/styles.css">  
        </head>
        <body>
            <div class="product-container">
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" width="300">
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ${product.price}€</p>
            </div>
            `;

            // Si accedemos desde el dashboard, añadimos botones de editar y eliminar
        if (isDashboard) {
          html += `
          <div class="dashboard-actions">
              <a href="/dashboard/${product._id}/edit" class="edit-button">Edit</a>
              <a href="/dashboard/delete/${product._id}" class="delete-button">Delete</a>
          </div>`;
      }

       html += `
            <footer>
                <p>&copy; 2024, Celia Cebaquebas</p>
                <div class="footer-nav">
                  <a href="/">Home</a>
                  •••
                  <a href="/dashboard">Dashboard</a>
                </div>
            </footer>
        </body>
        </html>
        `;

        res.status(200).send(html);
      } catch (err) {
        console.error("Error: product not found", err)
      }
    },
    async showNewProduct (req, res) {
      const formHtml = `
      <!DOCTYPE html>
          <html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/styles.css">
            <title>ResinDreams - Add Product</title>
          </head>
          <body>
          <h1>Add product</h1>
          <div class="add-product-form">
            <form action="/dashboard/new" method="post">
                <label for="name">Product name:</label>
                <input type="text" id="name" name="name" required><br>
                <label for="description">Description:</label>
                <input type="text" id="description" name="description" required><br>
                <label for="image">Image (url):</label>
                <input type="url" id="image" name="image"><br>
                <label for="category">Category:</label> 
                <select name="category">
                    <option value="earrings" selected>Earrings</option>
                    <option value="necklaces">Necklaces</option>
                    <option value="rings">Rings</option>
                </select><br>
                <label for="price">Price:</label>
                <input type="number" id="price" name="price" required><br>
                <button type="submit">Add product</button>
            </form>
          </div>
          </body>
          </html>
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
            res.redirect('/dashboard');
          } catch (error) {
            res.status(500).send('Error: product not added');
          }
    },
    async showEditProduct (req, res) {
      try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).send('Product not found');
        }
        const editform = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>ResinDreams - Edit Product</title>
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <h1>Edit Product: ${product.name}</h1>
                <form action="/dashboard/${product._id}/edit?_method=PUT" method="post">
                    <label for="name">Product name:</label>
                    <input type="text" id="name" name="name" value="${product.name}" required><br>
                    <label for="description">Description:</label>
                    <input type="text" id="description" name="description" value="${product.description}" required><br>
                    <label for="image">Image (url):</label>
                    <input type="url" id="image" name="image" value="${product.image}"><br>
                    <label for="category">Category:</label>
                    <select name="category">
                        <option value="earrings" ${product.category === 'earrings' ? 'selected' : ''}>Earrings</option>
                        <option value="necklaces" ${product.category === 'necklaces' ? 'selected' : ''}>Necklaces</option>
                        <option value="rings" ${product.category === 'rings' ? 'selected' : ''}>Rings</option>
                    </select><br>
                    <label for="price">Price:</label>
                    <input type="number" id="price" name="price" value="${product.price}" required><br>
                    <button type="submit">Save changes</button>
                </form>
            </body>
            </html>
        `;

        res.send(editform);
    } catch (error) {
        res.status(500).send('Error: product not found');
    }
  },
    async updateProduct (req, res) {
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
            return res.status(404).send('Product not found');
        }

        res.redirect('/dashboard'); 
    } catch (error) {
        res.status(500).send('Error: product not updated');
    }
    },
    async deleteProduct (req, res) {
      try {
        const product = await Product.findByIdAndDelete(req.params.id); 
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.redirect('/dashboard');  
    } catch (error) {
        res.status(500).json({ message: 'Error: product not deleted', error });
    }
    }
}

module.exports = ProductController