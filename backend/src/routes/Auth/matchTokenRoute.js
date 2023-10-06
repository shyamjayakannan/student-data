const matchToken = require("../../controllers/Auth/matchToken");

module.exports = matchTokenRoute = {
    path: "/user/matchToken",
    method: "post",
    handler: async (req, res) => {
        try {
            const userData = req.body;
            const response = await matchToken(userData);
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