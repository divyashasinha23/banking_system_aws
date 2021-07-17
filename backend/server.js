const express = require("express");
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const colors = require('colors');
const cors = require('cors');
const dotenv = require('dotenv');
const CustomerRoute = require('./Routes/cutomerRoute');
const AdminRoute = require('./Routes/adminRoute');

dotenv.config();

connectDB();
const app  = express();

app.use(express.json());
app.use(cors());

app.use('/app', CustomerRoute);
app.use('/app', AdminRoute);



    app.listen(5000, () => {
        console.log('Server started at port 5000');
    });
