const User = require("../../models/user");

module.exports = async function matchToken(userData) {
    try {
        const user = await User.findOne({ id: userData.id });
        if (!user) {
            return {
                message: "User Not found",
                type: "Error",
            };
        }
        return {
            message: "Logged in Successfully!",
            type: "Success",
        };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};