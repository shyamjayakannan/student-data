const getSkillSet = require("../../controllers/SkillSet/getSkillSet");

module.exports = getSkillSetRoute = {
    path: "/skills/getSkillSet",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await getSkillSet(req.body);
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