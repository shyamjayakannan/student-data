const { getAllCompanies } = require("../../controllers/Company/getAllCompanies");

module.exports = getAllCompaniesRoute = {
    path: "/company/getAllCompanies",
    method: "get",
    handler: async (req, res) => {
        try {
            const response = await getAllCompanies();
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