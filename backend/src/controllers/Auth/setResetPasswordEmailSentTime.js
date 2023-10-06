const User = require("../../models/user");

module.exports = async function setResetPasswordEmailSentTime(userData) {
    try {
        const resetUser = await User.findOne({id: userData.id});
        if (!resetUser) {
            return { message: "No account with that email is found!", type: "Error" };
        }
        resetUser.resetPasswordEmailSent = Date.now();
        const response = await resetUser.save();
        return response;
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};
