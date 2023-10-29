const SkillSet = require("../../models/skills");

module.exports = async function createSkillSet(data) {
    try {
        const skillSet = new SkillSet({ ...data });
        await skillSet.save();
        return { type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
}