const { deleteConversation } = require("../../controllers/Conversation/deleteConversation");

module.exports = deleteConversationRoute = {
    path: "/conversation/deleteConversation",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await deleteConversation(req.body);
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