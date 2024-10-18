const express = require('express');
const dbConnection = require("./config/db")
const path = require('path');
const cookieParser = require('cookie-parser');
const admin = require('firebase-admin');
const serviceAccount = require('./config/serviceAccount')
require('dotenv').config();

//inicializamos admin
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

const router = require('./routes/productRoutes');
const apiRoutes = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

const methodOverride = require('method-override');
app.use(methodOverride('_method')); 

app.use('/', router, apiRoutes, authRoutes)

dbConnection()

// Ruta para obtener la configuración de Firebase
app.get('/firebase-config', (req, res) => {
  const firebaseConfig = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: process.env.FIREBASE_AUTH_DOMAIN,
      projectId: process.env.FIREBASE_PROJECT_ID,
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.FIREBASE_APP_ID
  };
  res.json(firebaseConfig); // Enviar la configuración como JSON
});

const PORT = 3003;
app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`));