const mongoose = require("mongoose");

function connectDB() {
    const dbURI = process.env.DB_CONNECT;

    mongoose
        .connect(dbURI)
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Error connecting to MongoDB:", err.message);
            process.exit(1);
        });
}

module.exports = connectDB;