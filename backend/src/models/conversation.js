const mongoose = require("mongoose");
const { v4 } = require("uuid");
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
        default: v4,
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
        default: "",
    },
    messages: {
        type: [messageSchema],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Conversation", conversationSchema);