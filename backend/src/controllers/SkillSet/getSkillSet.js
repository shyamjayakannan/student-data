const SkillSet = require("../../models/skills");

module.exports = async function getSkillSet(data) {
    try {
        const skillSet = await SkillSet.findOne({ userId: data.userId });
        if (!skillSet) {
            return {
                type: "Error",
                message: "SkillSet Not Found",
            };
        }
        return { skills: skillSet.skills, type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};