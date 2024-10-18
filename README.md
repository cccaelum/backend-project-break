# Resin Dreams 🌙

Bienvenid@ a Resin Dreams, una tienda online dedicada a la venta de cositas hechas con resina. Este proyecto está construido con Node.js, Express y MongoDB, y te permite gestionar un inventario de productos, ver diferentes categorías y gestionar productos desde un panel de administración. Para acceder a este panel de administración, se ha implementado autenticación de usuarios con Firebase.

## Índice

  - [Estructura de archivos](#estructura-de-archivos)
  - [Base de datos](#base-de-datos)
  - [Servidor](#servidor)
  - [Rutas](#rutas)
  - [Controladores](#controladores)
  - [Despliegue](#despliegue)
  - [API y documentación con Postman](#api-y-documentación-con-postman)
  - [Autenticación con Firebase](#autenticación-con-firebase)
  

## Estructura de archivos

La estructura del proyecto es la siguiente:
```
.
├── config
│   ├── db.js                      # Configuración de la conexión a la base de datos MongoDB, usando Mongoose
│   └── serviceAccount.js          # Configuración de Firebase
├── controllers
│   ├── Product.controller.js      # Controlador que maneja la lógica de los productos (respuestas en formato HTML)
│   └── Product.api.controller.js  # Controlador que maneja la lógica de la API (respuestas en formato JSON)
├── middlewares
│   └── authMiddleware.js          # Middleware para proteger rutas. Verifica si un usuario está autenticado antes de permitirle acceder
├── models
│   └── Product.js                 # Esquema del modelo de producto. Define la estructura de los documentos de productos en la base de datos
├── public                         
│   ├── css                        # Estilos CSS
│   ├── images                     # Imágenes de los productos
│   ├── utils                      # Archivo configLogin.js para inicializar Firebase y la función de login
│   └── views                      # Archivos HTML de la página de login y register 
├── routes                         
│   ├── apiRoutes.js               # Define las rutas relacionadas con la API
│   ├── authRoutes.js              # Define las rutas que requieren autenticación
│   └── productRoutes.js           # Define las rutas relacionadas con los productos
├── .env                           # Variables de entorno
├── index.js                       # Archivo principal del servidor. Configura y arranca el servidor Express, conecta con la base de datos y registra las rutas
└── package.json                   # Archivo con las dependencias del proyecto

```        
Antes de comenzar, asegúrate de tener Node.js instalado. 

Una vez clonado el repositorio, abre la terminal para instalar las dependencias (`npm install`). Se instalará lo siguiente:
- Express
- dotenv
- method-override
- mongodb y mongoose
- cookie-parser
- firebase y firebase-admin

Además deberás configurar las variables de entorno para que el proyecto funcione: crea un archivo .env en la raíz del proyecto y asegúrate de cambiar la MONGO_URI por tu cadena de conexión a MongoDB. Para ello, antes tendrás que crear una nueva base de datos en MongoDB Atlas y asegurarte de que sea accesible. También deberás cambiar las variables de entorno relacionadas con Firebase.

Una vez configuradas las variables de entorno, inicia el servidor utilizando el siguiente comando: `npm start`

Para acceder a la aplicación desde tu PC, abre el navegador y visita http://localhost:3003

## Base de datos

El modelo de producto para la base de datos consta de los siguientes campos:

- Nombre: Nombre del producto.
- Descripción: Descripción detallada del producto.
- Imagen: URL o ruta de la imagen del producto.
- Categoría: Categoría a la que pertenece el producto.
- Precio: Precio del producto.

## Servidor

El archivo `index.js` es el punto de entrada de la aplicación, donde se configura el servidor y se registran las rutas. El servidor utiliza middleware como `express.urlencoded` para procesar los cuerpos de las solicitudes y `express.static` para servir archivos estáticos desde la carpeta `public`.

Para permitir el uso de métodos HTTP como PUT en formularios HTML, que por defecto solo soportan GET y POST, estamos utilizando el paquete `method-override`, el cual nos permite enviar un parámetro adicional en nuestras solicitudes POST para que el servidor las interprete como PUT.

## Rutas

Las rutas están divididas en 3 archivos: `apiRoutes`, `authRoutes` y `productRoutes`.

En `apiRoutes` encontramos las rutas de la API:
- GET /api/products: devuelve todos los productos.
- GET /api/products/:id: devuelve el detalle de un producto.
- POST /api/products/new: crea un nuevo producto.
- PUT /api/products/:id: actualiza un producto por su ID.
- DELETE /api/products/:id: borra un producto por su ID.

En `authRoutes` tenemos las rutas que requieren autenticación con Firebase:
- GET /register: devuelve el formulario de registro.
- POST /register: crea un nuevo usuario con el email y contraseña recogidos en el formulario.
- GET /login: devuelve el formulario para iniciar sesión en nuestra web.
- POST /login: crea y verifica el token para iniciar sesión.
- POST /logout: elimina el token de sesión y redirige al inicio.

Por último, el archivo `productRoutes.js` incluye las rutas para la visualización y gestión de productos:

- GET /products: devuelve todos los productos. Cada producto tiene un enlace a su página de detalle.
- GET /products/:_id: devuelve el detalle de un producto.
- GET /dashboard: devuelve el dashboard del administrador. Aparecen todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
- GET /dashboard/new: devuelve el formulario para subir un artículo nuevo.
- POST /dashboard/new: crea un nuevo producto.
- GET /dashboard/:id?dashboard=true: devuelve el detalle de un producto desde el dashboard.
- GET /dashboard/:_id/edit: devuelve el formulario para editar un producto.
- PUT /dashboard/:_id/edit: actualiza un producto.
- DELETE /dashboard/delete/:id: elimina un producto.

## Controladores

En la carpeta de controladores encontrados dos archivos, uno con los controladores de la API y otro con los controladores de nuestra web. 

El `ProductApiController` maneja solicitudes CRUD y devuelve las respuestas en formato JSON. Por otro lado, el `Productcontroller` también maneja solicitudes CRUD, pero las respuestas son en formato HTML (vistas con SSR).

Las funciones principales del controlador son:

- `showProducts`: Devuelve la vista con todos los productos.
- `showProductById`: Devuelve la vista con el detalle de un producto.
- `showNewProduct`: Devuelve la vista con el formulario para subir un artículo nuevo.
- `createProduct`: Crea un nuevo producto. 
- `showEditProduct`: Devuelve la vista con el formulario para editar un producto.
- `updateProduct`: Actualiza un producto. 
- `deleteProduct`: Elimina un producto. 

Además, también tenemos la función `showDashboard`, que devuelve la vista del panel de administración una vez que hemos iniciado sesión. 

## Despliegue

He usado Render para el despliegue del proyecto desde Github. Como he mencionado anteriormente, es importante añadir las variables de entorno necesarias (Mongo URI y las relacionadas con Firebase) en la configuración de Render antes del despliegue.

## API y documentación con Postman

El proyecto incluye una API que devuelve datos en formato JSON. La documentación de la API está disponible en [Postman](https://documenter.getpostman.com/view/38534667/2sAXxS7WKm#intro).

## Autenticación con Firebase

Finalmente, la web cuenta con un sistema de creación de usuarios e inicio de sesión para lo que hemos usado Firebase. Una vez creado un usuario administrador desde /register, el usuario puede iniciar sesión desde /login para poder acceder al dashboard y gestionar los productos. Las rutas están protegidas con `authMiddleware` para que solo pueda entrar quien esté logado y pueda acceder a esos elementos para verlos, actualizarlos, borrarlos o crearlos. 

Los datos del `serviceAccount`están protegidos en el archivo `.env` y la lógica del login está en `configLogin.js`.




