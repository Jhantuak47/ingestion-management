const User = require("../../models/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { promiseReturnResult } = require("../../utils/common/promiseHelper");
const { findUserByUserName } = require("../../repositories/auth/user.repository");
const { isUserMatched } = require("../../utils/auth/authentication.util");
const APP_CONFIGS = require("../../config/app.config");


const registerUser = (request_body) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { username, password, role, email } = request_body;
            const hashedPass = await bcrypt.hash(password, 10);

            const newUser = new User({ username, password: hashedPass, role, email });
            await newUser.save();

            console.log({ newUser })
            const apiResponse = promiseReturnResult(true, { user: newUser }, "Successfully user created!");
            console.log({ apiResponse });
            return resolve(apiResponse);
        } catch (error) {
            console.log(error);
            return resolve(promiseReturnResult(false, {}, error, "Failed registering user!"));
        }
    })
}

const loginUser = (request_body) => {
    return new Promise(async (resolve, reject) => {
        const { username, password } = request_body;
        try {
            const userResponse = await findUserByUserName(username);
            if (!userResponse.status) {
                return resolve(userResponse);
            }

            const { data: user } = userResponse;
            const isMatched = await isUserMatched(user, password);

            if (!isMatched) {
                return resolve(promiseReturnResult(false, {}, {}, "Failed login, Credential is invalid!"))
            }

            const token = jwt.sign({ user_id: user._id, role: user.role, email: user.email }, APP_CONFIGS.SECRETS_KEY.JWT_SECRET, { expiresIn: APP_CONFIGS.SECRETS_KEY.JWT_EXPIRES_IN });

            const apiResponse = promiseReturnResult(true, { success: true, token: token }, "Login success!");
            return resolve(apiResponse);

        } catch (error) {
            return resolve(promiseReturnResult(false, {}, error, error.message))
        }
    })
}

module.exports = {
    registerUser,
    loginUser
}