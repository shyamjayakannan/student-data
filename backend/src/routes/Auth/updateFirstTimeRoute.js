const updateFirstTime = require("../../controllers/Auth/updateFirstTime");

module.exports = setResetPasswordEmailSentTimeRoute = {
    path: "/user/updateFirstTime",
    method: "post",
    handler: async (req, res) => {
        try {
            const userData = req.body;
            const response = await updateFirstTime(userData);
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