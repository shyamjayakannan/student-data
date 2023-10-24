const Conversation = require("../../models/conversation");

module.exports = async function updateConversation(data) {
    try {
        await Conversation.findOneAndUpdate(
            { id: data.id, userId: data.userId },
            { $set: { messageHistory: data.messageHistory, messages: data.messages } }
        );
        return { type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};