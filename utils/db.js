const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;
console.log(URI);

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