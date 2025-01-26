const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://rpxingh201:Ram%401590@cluster0.vzvzy.mongodb.net/Ram?retryWrites=true&w=majority"
        );
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1); // Exit the process if the connection fails
    }
};

module.exports = connectDb;
