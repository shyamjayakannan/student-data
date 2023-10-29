const updateSkillSet = require("../../controllers/SkillSet/updateSkillSet");

module.exports = createSkillSetRoute = {
    path: "/skills/updateSkillSet",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await updateSkillSet(req.body);
            return res.status(200).send(response);
        } catch (err) {
            return res.status(400).send({
                message: "Server error try later!",
                response: err.message,
                type: "Error",
            });
        }
    },
};