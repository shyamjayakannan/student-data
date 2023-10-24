const Conversation = require("../../models/conversation");

module.exports = async function getAllUserConversations(data) {
    try {
        const conversations = await Conversation.find({ userId: data.userId }).sort({ timestamp: -1 });
        return { conversations, type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};