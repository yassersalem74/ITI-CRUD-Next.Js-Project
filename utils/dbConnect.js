const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

export default async function dbConnect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected successfully");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}