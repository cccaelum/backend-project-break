const express = require('express');
const app = express();
const PORT = 3003;
const dbConnection = require("./config/db")
const router = require('./routes/productRoutes')
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const methodOverride = require('method-override');
app.use(methodOverride('_method')); // https://alejandrojs.wordpress.com/2017/06/30/usando-method-override-para-hacer-requests-put-en-express/

app.use('/', router)

dbConnection()

app.listen(PORT, () => console.log(`Server listening in http://localhost:${PORT}`));