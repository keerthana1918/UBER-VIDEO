const mongoose = require("mongoose");

async function connectDB() {
    try {
        const dbURI = process.env.MONGO_URI;

        await mongoose.connect(dbURI);

        console.log("✅ Connected to MongoDB");
    } catch (err) {
        console.error("❌ Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;