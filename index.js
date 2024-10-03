const express = require('express');
const app = express();
const PORT = 3003;
const dbConnection = require("./config/db")
const router = require('./routes/productRoutes')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router)

dbConnection()

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`));