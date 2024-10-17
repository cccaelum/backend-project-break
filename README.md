# Resin Dreams 🌙

Bienvenid@ a Resin Dreams, una tienda online dedicada a la venta de cositas hechas con resina. Este proyecto está construido con Node.js, Express y MongoDB, y te permite gestionar un inventario de productos, ver diferentes categorías y gestionar productos desde un panel de administración. Para acceder a este panel de administración, se ha implementado autenticación de usuarios con Firebase.

## Índice

  - [Estructura de archivos](#estructura-de-archivos)
  - [Base de datos](#base-de-datos)
  - [Servidor](#servidor)
  - [Modelo](#modelo)
  - [Rutas](#rutas)
  - [Controladores](#controladores)
  - [Despliegue](#despliegue)
  - [API y documentación con Postman](#api-y-documentación-con-postman)
  - [Autenticación con Firebase](#autenticación-con-firebase)
  

## Estructura de archivos

La estructura principal del proyecto es la siguiente:
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
├── routes                         # Configuración de las rutas de la API y del dashboard
│   ├── apiRoutes.js               # Define las rutas relacionadas con la API
│   ├── authRoutes.js              # Define las rutas que requieren autenticación
│   └── productRoutes.js           # Define las rutas relacionadas con los productos
├── .env                           # Variables de entorno
├── index.js                       # Archivo principal del servidor. Configura y arranca el servidor Express, conecta con la base de datos y registra las rutas
└── package.json                   # Archivo con las dependencias del proyecto

```        
Antes de comenzar, asegúrate de tener Node.js instalado. 

Una vez clonado el repositorio, abre la terminal para instalar las dependencias (npm install). Se instalará lo siguiente:
- Express
- dotenv
- method-override
- mongodb y mongoose
- cookie-parser
- firebase y firebase-admin

Además deberás configurar las variables de entorno para que el proyecto funcione: crea un archivo .env en la raíz del proyecto y asegúrate de cambiar la MONGO_URI por tu cadena de conexión a MongoDB. Para ello, antes tendrás que crear una nueva base de datos en MongoDB Atlas y asegurarte de que sea accesible. También deberás cambiar las variables de entorno relacionadas con Firebase.

Una vez configuradas las variables de entorno, inicia el servidor utilizando el siguiente comando: npm start

Para acceder a la aplicación desde tu PC, abre el navegador y visita http://localhost:3003

El proyecto incluye varias rutas para la visualización y gestión de productos:

## Base de datos

Para crear la base de datos, utiliza MongoDB Atlas. Crea un nuevo proyecto, despliega una nueva base de datos y copia la URI de conexión en tu archivo .env

## Servidor

El servidor está construido con Express. Utiliza middleware como express.urlencoded para procesar los cuerpos de las solicitudes POST y express.static para servir archivos estáticos desde la carpeta public.

El archivo index.js es el punto de entrada de la aplicación, donde se configura el servidor y se registran las rutas.

## Modelo

l modelo de producto consta de los siguientes campos:

Nombre: Nombre del producto.
Descripción: Descripción detallada del producto.
Imagen: URL o ruta de la imagen del producto.
Categoría: Categoría a la que pertenece el producto.
Precio: Precio del producto.

## Rutas

Vamos a crear las rutas CRUD para los productos. 

- GET /products: Devuelve todos los productos. Cada producto tendrá un enlace a su página de detalle.
- GET /products/:productId: Devuelve el detalle de un producto.
- GET /dashboard: Devuelve el dashboard del administrador. En el dashboard aparecerán todos los artículos que se hayan subido. Si clickamos en uno de ellos nos llevará a su página para poder actualizarlo o eliminarlo.
- GET /dashboard/new: Devuelve el formulario para subir un artículo nuevo.
- POST /dashboard: Crea un nuevo producto.
- GET /dashboard/:productId: Devuelve el detalle de un producto en el dashboard.
- GET /dashboard/:productId/edit: Devuelve el formulario para editar un producto.
- PUT /dashboard/:productId: Actualiza un producto.
- DELETE /dashboard/:productId/delete: Elimina un producto.

## Controladores

A continuación crearemos el controlador de productos. Este controlador se dedicará a manejar las solicitudes CRUD de los productos. Devolverá las respuestas en formato HTML.
Para ello, crearemos algunas funciones auxiliares que nos ayudarán a devolver las vistas con SSR.

Las funciones principales del controlador serán:

- showProducts: Devuelve la vista con todos los productos.
- showProductById: Devuelve la vista con el detalle de un producto.
- showNewProduct: Devuelve la vista con el formulario para subir un artículo nuevo.
- createProduct: Crea un nuevo producto. Una vez creado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- showEditProduct: Devuelve la vista con el formulario para editar un producto.
- updateProduct: Actualiza un producto. Una vez actualizado, redirige a la vista de detalle del producto o a la vista de todos los productos del dashboard.
- deleteProduct: Elimina un producto. Una vez eliminado, redirige a la vista de todos los productos del dashboard.

Las funciones showProducts y showProductById pueden devolver respuestas ligeramente distintas si se llega desde el dashboard o desde la vista principal. Por ejemplo, si se llega desde el dashboard, se mostrará un enlace para editar o eliminar el producto. Para ello podemos utilizar la url de la petición o pasar al controlador un parámetro extra que indique si se llega desde el dashboard o no.

Para generar el html de forma más eficiente y sacarlo de la lógica, podemos crear funciones y variables auxiliares que generen el html de los productos y del formulario.
Por ejemplo:
- baseHtml: html común a todas las páginas. Puede contener elementos como la importación de estilos, etc.
- getNavBar: Genera la barra de navegación con las categorías. En caso de estar en el dashboard, también generará un enlace para subir un nuevo producto.
- getProductCards: Genera el html de los productos. Recibe un array de productos y devuelve el html de las tarjetas de los productos.
- ...

## Despliegue

He usado Render para el despliegue del proyecto desde Github. No olvides añadir las variables de entorno necesarias en la configuración de Render.

## API y documentación con Postman

El proyecto incluye una API que devuelve datos en formato JSON. La documentación de la API está disponible utilizando [Postman](https://documenter.getpostman.com/view/38534667/2sAXxS7WKm#intro), lo que facilita su comprensión y uso.

## Autenticación con Firebase

Crearemos un usuario administrador para que pueda subir desde el dashboard más productos. Esas rutas deberán estar protegidas para que solo pueda entrar quien esté logado y pueda acceder a esos elementos para crearlos, verlos, actualizarlos y borrarlos. 

Recordad que los datos del `serviceAccount`están protegidos y debes tenerlos en el archivo `.env` 
También en este repo hay un ejemplo de `views`de como acceder a la carpeta `public` para hacer accesible esos archivos estáticos `express.static`. 




