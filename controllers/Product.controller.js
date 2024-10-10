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
                    <link rel="stylesheet" href="/css/styles.css">
                    <title>Dashboard</title>
                </head>
                <body>
                    <header>
                      <h1>Panel de Administración - ResinCrafts</h1>
                    </header>
                    <h2>Productos en Inventario</h2>
                    <ul>`;
                    if (products.length > 0) {
                    products.forEach(product => {
                      dashboard += `
                          <li>
                              <h3>${product.name}</h3>
                              <p>${product.description}</p>
                              <p>Categoría: ${product.category}</p>
                              <p>Precio: ${product.price}€</p>
                              <img src="${product.image}" alt="Imagen del producto" width="150">
                              <br>
                              <a href="/dashboard/${product._id}/edit">Editar producto</a>
                              <a href="/dashboard/delete/${product._id}">Eliminar producto</a>
                          </li>
                          <hr>`;
                  });
                } else {
                  dashboard += `<p>Ups, parece que no hay productos en el inventario...</p>`;
                }
                  dashboard += `
                          </ul>
                        <section id="add-product">
                        <h2>Añadir un nuevo producto</h2>
                        <a href="/dashboard/new" class="add-product-btn">Añadir</a>
                        </section>
            <footer>
                <nav class="footer-nav">
                    <a href="/">Inicio</a>
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
      <html lang="es">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Resin Crafts ☾</title>
          <link rel="stylesheet" href="/css/styles.css">
      </head>
      <body>
          <nav>
              <ul>
                  <li><a href="/products?category=all">Productos</a></li>
                  <li><a href="/products?category=earrings">Pendientes</a></li>
                  <li><a href="/products?category=necklaces">Collares</a></li>
                  <li><a href="/products?category=rings">Anillos</a></li>
                  <li class="login-button"><a href="/dashboard">Admin</a></li>
              </ul>
          </nav>

          <h1>Productos disponibles</h1>
          <ul>`;

      // Renderizamos los productos filtrados
      if (filteredProducts.length > 0) {
      filteredProducts.forEach(product => {
        html += `
          <li class="productItem">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <p>Categoría: ${product.category}</p>
              <p>Precio: ${product.price}€</p>
              <img src="${product.image}" alt="${product.name}" width="150">
          </li>
          <hr>`;
      });
    } else {
      html += `<p>Ups, parece que no hay nada...</p>`;
    }
      html += `
          </ul>
          <footer>
              <p>&copy; 2024, Celia Cebaquebas</p>
              <div class="footer-nav">
                  <a href="/">Volver al inicio</a>
                  •••
                  <a href="/dashboard">Administrador</a>
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
        res.status(200).json(product);
      } catch (err) {
        console.error("Error: product not found", err)
      }
    },
    async showNewProduct (req, res) {
      const formHtml = `
      <!DOCTYPE html>
          <html lang="es">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="/css/styles.css">
            <title>Dashboard</title>
          </head>
          <body>
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
            res.status(201).json(newProduct)
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
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Editar Producto</title>
                <link rel="stylesheet" href="/css/styles.css">
            </head>
            <body>
                <h1>Editar Producto: ${product.name}</h1>
                <form action="/dashboard/${product._id}/edit?_method=PUT" method="post">
                    <label for="name">Nombre del producto:</label>
                    <input type="text" id="name" name="name" value="${product.name}" required><br>
                    <label for="description">Descripción:</label>
                    <input type="text" id="description" name="description" value="${product.description}" required><br>
                    <label for="image">Imagen (url):</label>
                    <input type="url" id="image" name="image" value="${product.image}"><br>
                    <label for="category">Categoría:</label>
                    <select name="category">
                        <option value="earrings" ${product.category === 'earrings' ? 'selected' : ''}>Pendientes</option>
                        <option value="necklaces" ${product.category === 'necklaces' ? 'selected' : ''}>Collares</option>
                        <option value="rings" ${product.category === 'rings' ? 'selected' : ''}>Anillos</option>
                    </select><br>
                    <label for="price">Precio:</label>
                    <input type="number" id="price" name="price" value="${product.price}" required><br>
                    <button type="submit">Guardar cambios</button>
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
        res.status(200).json({ message: 'Product deleted successfully' });  
    } catch (error) {
        res.status(500).json({ message: 'Error: product not deleted', error });
    }
    }
}

module.exports = ProductController