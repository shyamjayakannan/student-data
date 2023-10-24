const Conversation = require("../../models/conversation");

module.exports = async function deleteConversation(data) {
    try {
        const deleted = await Conversation.deleteOne({ id: data.id, userId: data.userId });
        if (deleted.deletedCount === 0) {
            return {
                type: "Error",
                message: "Could not Delete",
            };
        }
        return { type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};