const getResetPasswordEmailSentTime = require("../../controllers/Auth/getResetPasswordEmailSentTime");

module.exports = getResetPasswordEmailSentTimeRoute = {
    path: "/user/getResetPasswordEmailSentTime",
    method: "post",
    handler: async (req, res) => {
        try {
            const userData = req.body;
            const response = await getResetPasswordEmailSentTime(userData);
            return res.status(200).send(response);
        } catch (err) {
            return res.status(400).send({
                message: "Server error try later!",
                response: err.message,
                type: "Error",
            });
        }
    },
};