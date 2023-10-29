const mongoose = require("mongoose");
const { Schema } = mongoose;

const skillSchema = new Schema({
    skill: {
        type: String,
        required: true,
    },
    checked: {
        type: Boolean,
        required: true,
    },
});

const skillSetSchema = new Schema({
    userId: {
        type: String,
        required: true,
    },
    skills: {
        type: [skillSchema],
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("SkillSet", skillSetSchema);