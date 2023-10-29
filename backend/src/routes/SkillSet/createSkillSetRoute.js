const createSkillSet = require("../../controllers/SkillSet/createSkillSet");

module.exports = createSkillSetRoute = {
    path: "/skills/createSkillSet",
    method: "post",
    handler: async (req, res) => {
        try {
            const response = await createSkillSet(req.body);
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