const Conversation = require("../../models/conversation");

module.exports = async function getConversation(data) {
    try {
        const conversation = await Conversation.findOne({ id: data.id });
        if (!conversation) {
            return {
                type: "Error",
                message: "Conversation Not Found",
            };
        }
        if (conversation.userId !== data.userId) {
            return {
                type: "Error",
                message: "User not Authorized",
            };
        }
        return { conversation, type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};