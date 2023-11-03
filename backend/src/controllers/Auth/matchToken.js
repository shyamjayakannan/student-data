const User = require("../../models/user");
const jwt = require('jsonwebtoken');
const config = require("../../config");

module.exports = async function matchToken(userData) {
    try {
        const decoded = jwt.decode(userData.token, config.jwtSecret);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        if (currentTimestamp > decoded.exp) {
            return {
                message: "Token Expired",
                type: "Error",
            };
        }
        const user = await User.findOne({ id: decoded._id });
        if (!user) {
            return {
                message: "User Not found",
                type: "Error",
            };
        }
        return {
            id: user.id,
            firstTime: user.firstTime,
            message: "Logged in Successfully!",
            type: "Success",
        };
    } catch (err) {
        console.log(err.message);
        return {
            message: err.message,
            type: "Error",
        }
    }
};