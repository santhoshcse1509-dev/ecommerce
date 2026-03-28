const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./db');
require('dotenv').config();

const makeAllAdmin = async () => {
  try {
    await connectDB();
    const result = await User.updateMany({}, { role: 'admin' });
    console.log(`✅ Promoted ${result.modifiedCount} user(s) to Admin status!`);
    process.exit();
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
};

makeAllAdmin();
