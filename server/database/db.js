const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        //console.log("MongoDB URI: ", process.env.MONGO_URI); // Debugging line
        await mongoose.connect("mongodb://127.0.0.1:27017/new_login");
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Database connection error: ', err.message);
        process.exit(1);
    }
}

module.exports = connectDB;
