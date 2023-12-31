const dotenv = require("dotenv");
dotenv.config();

module.exports = config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 8080,
    jwtSecret: process.env.JWT_SECRET || "your_secret_key",
    mongoUrl: process.env.MONGODB_URL || process.env.MONGO_HOST,
};