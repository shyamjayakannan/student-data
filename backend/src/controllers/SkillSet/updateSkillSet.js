const SkillSet = require("../../models/skills");

module.exports = async function updateSkillSet(data) {
    try {
        await SkillSet.findOneAndUpdate(
            { userId: data.userId },
            { $set: { skills: data.skills } }
        );
        return { type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};