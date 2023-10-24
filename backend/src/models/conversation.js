const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
    sender: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const conversationSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    messageHistory: {
        type: String,
        required: true,
    },
    messages: [messageSchema],
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Conversation", conversationSchema);