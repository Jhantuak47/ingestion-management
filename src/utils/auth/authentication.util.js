const bcrypt = require("bcryptjs");
const { USER_ROLES } = require("../../constants/common");

const isUserMatched = async (user, password) => await bcrypt.compare(password, user.password);

const validateUserRole = role => Object.values(USER_ROLES).find(userRole => userRole.toLowerCase() === role?.trim().toLowerCase());

const validateUserEmail = email => email;

module.exports = {
    isUserMatched,
    validateUserRole,
    validateUserEmail
}