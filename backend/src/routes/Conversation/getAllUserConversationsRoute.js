const getAllUserConversations = require("../../controllers/Conversation/getAllUserConversations");

module.exports = getAllUserConversationsRoute = {
    path: "/conversation/getAllUserConversations",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await getAllUserConversations(req.body);
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