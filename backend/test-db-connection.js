const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  console.log('⏳ Testing MongoDB Connection...');
  const uri = process.env.MONGODB_URI;
  
  try {
    await mongoose.connect(uri);
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    console.log('ℹ️ Credentials are valid.');
    process.exit(0);
  } catch (error) {
    console.error('❌ FAILURE: Could not connect to MongoDB.');
    console.error('Error:', error.message);
    process.exit(1);
  }
};

testConnection();
