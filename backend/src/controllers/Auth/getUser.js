const User = require("../../models/user");

module.exports = async function getUser(userData) {
    try {
        const user = await User.findOne({ id: userData.id });
        if (!user) {
            return {
                message: "User Not found",
                type: "Error",
            };
        }
        return { email: user.email };
    } catch (err) {
        console.log(err.message);
        return {
            message: err.message,
            type: "Error",
        }
    }
};