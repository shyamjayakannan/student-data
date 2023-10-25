const Conversation = require("../../models/conversation");

module.exports = async function createConversation(data) {
    try {
        const conversation = new Conversation({ ...data });
        const returnedConversation = await conversation.save();
        return { type: "Success", conversation: returnedConversation };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}