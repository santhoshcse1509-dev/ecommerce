const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const connectDB = async () => {
  try {
    console.log('⏳ Attempting to connect to your configured MongoDB database...');
    // We try to connect to whatever is in the .env file first
    // Timeout set to 3 seconds so we don't wait forever if it's broken
    await mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 3000 });
    console.log('✅ Connected to existing MongoDB database!');
  } catch (err) {
    console.warn('⚠️ Could not connect to external/local database:', err.message);
    console.log('🚀 Creating a simple local database for you right now instead...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      
      // Create a folder to save our data so it doesn't disappear when the server stops
      const dbPath = path.join(__dirname, 'goshop_local_data');
      if (!fs.existsSync(dbPath)){
        fs.mkdirSync(dbPath);
      }

      // This actually downloads a lightweight MongoDB instance and runs it out-of-the-box
      const mongod = await MongoMemoryServer.create({
        instance: {
          port: 27017,
          dbPath: dbPath,
          storageEngine: 'wiredTiger'
        }
      });
      
      const uri = mongod.getUri();
      await mongoose.connect(uri);
      console.log('✅ Success! Your simple local database is running and ready at: ' + uri);
      console.log('📂 Database files are being saved to: ' + dbPath);

    } catch (localErr) {
      console.error('❌ Failed to create local simple database:', localErr);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
