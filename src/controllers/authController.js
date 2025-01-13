const { USER_ROLES } = require("../constants/common");
const User = require("../models/user.model");
const { registerUser, loginUser } = require("../services/auth/auth.service");
const { validateUserRole, validateUserEmail } = require("../utils/auth/authentication.util");
const { promiseReturnResult } = require("../utils/common/promiseHelper");

const _register = async (req, res) => {

    try {
        const { username, password, email, role } = req.body;

        const userRole = validateUserRole(role);
        const userEmail = validateUserEmail(email);

        const request_body = { username: username, password: password, role: userRole || USER_ROLES.GUESTS, email: userEmail };
        console.log({ request_body })
        const response = await registerUser(request_body);
        console.log({ response });
        return res.send(response);
    } catch (error) {
        console.log(error.message);
        return res.send(promiseReturnResult(false, {}, error, error.message));
    }

}

const _login = async (req, res) => {
    const { username, password } = req.body;
    const response = await loginUser({ username, password });
    return res.send(response);
}

module.exports = {
    _register,
    _login
}