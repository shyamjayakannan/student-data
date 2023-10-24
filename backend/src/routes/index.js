const getNewPasswordRoute = require("./Auth/getNewPasswordRoute");
const getResetPasswordEmailSentTimeRoute = require("./Auth/getResetPasswordEmailSentTimeRoute");
const getSignInRoute = require("./Auth/getSignInRoute");
const getUserRoute = require("./Auth/getUserRoute");
const insertNewPasswordRoute = require("./Auth/insertNewPasswordRoute");
const insertSignUpRoute = require("./Auth/insertSignUpRoute");
const matchTokenRoute = require("./Auth/matchTokenRoute");
const resetPasswordRoute = require("./Auth/resetPasswordRoute");
const setResetPasswordEmailSentTimeRoute = require("./Auth/setResetPasswordEmailSentTimeRoute");
const createConversationRoute = require("./Conversation/createConversationRoute");
const deleteConversationRoute = require("./Conversation/deleteConversationRoute");
const getAllUserConversationsRoute = require("./Conversation/getAllUserConversationsRoute");
const getConversationRoute = require("./Conversation/getConversationRoute");
const updateConversationRoute = require("./Conversation/updateConversationRoute");

module.exports = routes = [
    // auth
    getNewPasswordRoute,
    getSignInRoute,
    insertNewPasswordRoute,
    insertSignUpRoute,
    resetPasswordRoute,
    matchTokenRoute,
    getResetPasswordEmailSentTimeRoute,
    setResetPasswordEmailSentTimeRoute,
    getUserRoute,

    // conversation
    createConversationRoute,
    getConversationRoute,
    deleteConversationRoute,
    getAllUserConversationsRoute,
    updateConversationRoute,
];