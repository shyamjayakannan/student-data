const insertNewPassword = require("../../controllers/Auth/insertnewPassword");

module.exports = insertNewPasswordRoutes = {
    path: "/user/newPassword",
    method: "post",
    handler: async (req, res) => {
        try {
            const userData = req.body;
            const response = await insertNewPassword(userData);
            return res.status(200).send({
                message: "Password reset Successfully!",
                response: response,
                type: "Success",
            });
        } catch (err) {
            return res.status(401).send({
                message: "Please try again!",
                response: err.message,
                type: "Error",
            });
        }
    },
};
