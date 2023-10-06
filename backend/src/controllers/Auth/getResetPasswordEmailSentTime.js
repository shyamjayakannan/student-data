const User = require("../../models/user");

module.exports = async function getResetPasswordEmailSentTime(userData) {
    try {
        const user = await User.findOne({ id: userData.id });
        if (!user) {
            return {
                message: "User Not found",
                type: "Error",
            };
        }
        return {
            resetPasswordEmailSent: user.resetPasswordEmailSent,
            type: "Success",
        };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};