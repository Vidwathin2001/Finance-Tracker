const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://vidwathkumar30_db_user:FS4BcrKXKlZctuX0@cluster0.xsxbkn5.mongodb.net/?appName=Cluster0');
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;