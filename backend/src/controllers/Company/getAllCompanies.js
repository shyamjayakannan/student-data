const Company = require("../../models/company");

module.exports = async function getCompany() {
    try {
        const companies = await Company.find().toArray();
        return { companies, type: "Success" };
    } catch (err) {
        console.log(err.message);
        return {
            message: err.message,
            type: "Error",
        }
    }
};