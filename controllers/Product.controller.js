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
                    </header>
                    <h2>Product Inventory</h2>
                    <ul>`;
                    if (products.length > 0) {
                    products.forEach(product => {
                      dashboard += `
                          <li>
                              <h3>${product.name}</h3>
                              <p>${product.description}</p>
                              <p>Category: ${product.category}</p>
                              <p>Price: ${product.price}€</p>
                              <img src="${product.image}" alt="Product image" width="150">
                              <br>
                              <a href="/dashboard/${product._id}/edit">Edit product</a>
                              <a href="/dashboard/delete/${product._id}">Delete product</a>
                          </li>
                          <hr>`;
                  });
                } else {
                  dashboard += `<p>Oops, it seems there are no products in inventory...</p>`;
                }
                  dashboard += `
                          </ul>
                        <section id="add-product">
                        <h2>Add a new product</h2>
                        <a href="/dashboard/new" class="add-product-btn">Add</a>
                        </section>
            <footer>
                <nav class="footer-nav">
                    <a href="/">Home</a>
                    •••
                    <a href="/dashboard">Dashboard</a>
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

        //res.status(200).json(products)

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
                  <li class="login-button"><a href="/dashboard">Admin</a></li>
              </ul>
          </nav>

          <h1>Available products</h1>
          <ul>`;

      // Renderizamos los productos filtrados
      if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        html += `
          <li class="productItem">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p>Price: ${product.price}€</p>
              <img src="${product.image}" alt="${product.name}" width="150">
              <br>
              <a href="/products/${product.id}">Show details</a>
          </li>
          <hr>`;
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
                  <a href="/dashboard">Dashboard</a>
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

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${product.name}</title>
            <link rel="stylesheet" href="/css/styles.css">  
        </head>
        <body>
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" width="300">
            <p><strong>Description:</strong> ${product.description}</p>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ${product.price}€</p>

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

        //res.status(200).json(product);
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
            //res.status(201).json(newProduct)
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