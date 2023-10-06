const User = require("../../models/user");

module.exports = async function insertSignUp(userData) {
    try {
        const user = new User({ ...userData });
        const responseSignUp = await user.save();
        return { responseSignUp };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};
