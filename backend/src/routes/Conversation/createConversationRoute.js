const { createConversation } = require("../../controllers/Conversation/createConversation");

module.exports = createConversationRoute = {
    path: "/conversation/createConversation",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await createConversation(req.body);
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