const getNewPasswordRoute = require("./Auth/getNewPasswordRoute");
const getResetPasswordEmailSentTimeRoute = require("./Auth/getResetPasswordEmailSentTimeRoute");
const getSignInRoute = require("./Auth/getSignInRoute");
const insertNewPasswordRoute = require("./Auth/insertNewPasswordRoute");
const insertSignUpRoute = require("./Auth/insertSignUpRoute");
const matchTokenRoute = require("./Auth/matchTokenRoute");
const resetPasswordRoute = require("./Auth/resetPasswordRoute");
const setResetPasswordEmailSentTimeRoute = require("./Auth/setResetPasswordEmailSentTimeRoute");

module.exports = routes = [
    getNewPasswordRoute,
    getSignInRoute,
    insertNewPasswordRoute,
    insertSignUpRoute,
    resetPasswordRoute,
    matchTokenRoute,
    getResetPasswordEmailSentTimeRoute,
    setResetPasswordEmailSentTimeRoute,
];