const { getConversation } = require("../../controllers/Conversation/getConversation");

module.exports = getConversationRoute = {
    path: "/conversation/getConversation",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await getConversation(req.body);
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