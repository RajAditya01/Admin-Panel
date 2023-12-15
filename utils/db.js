const mongoose = require("mongoose");

const URI = "mongodb+srv://adityaraj:aditya321@cluster0.gu3flzg.mongodb.net/";

const connectDb = async () => {
    try {
        await mongoose.connect(URI);
        console.log("connection successful to DB");
    } catch (error) {
        console.error("database connection fail");
        console.log(error);
        process.exit(0);
    }
};

module.exports = connectDb;