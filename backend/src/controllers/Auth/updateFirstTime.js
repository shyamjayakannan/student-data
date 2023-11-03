const User = require("../../models/user");

module.exports = async function updateFirstTime(userData) {
    try {
        await User.findOneAndUpdate(
            { id: userData.id },
            { $set: { firstTime: false } }
        );
        return { type: "Success" };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};