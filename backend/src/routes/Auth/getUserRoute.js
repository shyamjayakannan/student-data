const getUser = require("../../controllers/Auth/getUser");

module.exports = getUserRoute = {
    path: "/user/getUser",
    method: "post",
    handler: async (req, res) => {
        try {
            const userData = req.body;
            const response = await getUser(userData);
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