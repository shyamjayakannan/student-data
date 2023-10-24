const Conversation = require("../../models/conversation");

module.exports = async function createConversation(data) {
    try {
        const conversation = new Conversation({ ...data });
        await conversation.save();
        return { type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}