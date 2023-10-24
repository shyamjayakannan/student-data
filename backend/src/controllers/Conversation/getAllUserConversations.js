const Conversation = require("../../models/conversation");

module.exports = async function getAllUserConversations(data) {
    try {
        const conversations = await Conversation.find({ userId: data.id }).toArray();
        return { conversations, type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};