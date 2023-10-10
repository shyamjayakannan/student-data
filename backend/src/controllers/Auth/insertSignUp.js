const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const config = require("../../config");

module.exports = async function insertSignUp(userData) {
    try {
        const user = new User({ ...userData });
        const responseSignUp = await user.save();
        const token = jwt.sign(
            {
                _id: responseSignUp.id,
                authenticated: true,
            },
            config.jwtSecret,
            { expiresIn: "15d" }
        );
        return { id: responseSignUp.id, token };
    } catch (err) {
        console.log(err.message);
        throw err;
    }
};
