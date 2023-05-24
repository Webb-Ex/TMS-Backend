const express = require('express'); 
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const connectDB = require("./config/dbConnection");

connectDB();