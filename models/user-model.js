const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Define the User schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

//? secure the password with the bcrypt
userSchema.pre("save", async function () {
    const user = this;
    console.log("actual data ", this);

    if (!user.isModified) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, saltRound);
        user.password = hashedPassword;
    } catch (error) {
        return next(error);
    }
});

//? Generate JSON Web Token
userSchema.methods.generateToken = async function () {
    console.log("I am token");
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        console.error("Token Error: ", error);
    }
};

// define the model or the collection name
const User = mongoose.model("USER", userSchema);
module.exports = User; // Use module.exports instead of export

// **What is JWT?**

// JSON Web Tokens (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.

// JWTs are often used for authentication and authorization in web applications.

// Authentication: Verifying the identity of a user or client.

// Authorization: Determining what actions a user or client is allowed to perform.

// **Components of a JWT:**

// Header: Contains metadata about the token, such as the type of token and the signing algorithm being used.

// Payload: Contains claims or statements about an entity (typically, the user) and additional data. Common claims include user ID, username, and expiration time.

// Signature: To verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way, a signature is included.
