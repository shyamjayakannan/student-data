const updateConversation = require("../../controllers/Conversation/updateConversation");

module.exports = getConversationRoute = {
    path: "/conversation/updateConversation",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await updateConversation(req.body);
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