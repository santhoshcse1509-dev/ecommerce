require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./db');

const check = async () => {
    try {
        await connectDB();
        const count = await Product.countDocuments();
        console.log(`There are ${count} products in the database.`);
        const products = await Product.find().limit(2);
        console.log('Sample products:', products);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

check();
