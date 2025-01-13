const jwt = require("jsonwebtoken");
const { decryptJsonData, pluckAuthorizationTokenFromHeader } = require("../../utils/common/jwtHelper");
const { promiseReturnResult } = require("../../utils/common/promiseHelper");

/**
 * Use this token to validate the redirection token is correct or not
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
let verifyJWTToken = async (req, res, next) => {
    try {
        let jwt_token = pluckAuthorizationTokenFromHeader(req.headers, req.body);

        if (!jwt_token) {
            let responseObj = promiseReturnResult(false, {}, {}, "Token not found");
            return res.send(responseObj);
        }

        // decoding the token to check the token is valid or not
        let decodedToken = await decryptJsonData(jwt_token);
        if (!decodedToken) {
            let responseObj = promiseReturnResult(false, {}, {}, "Token not valid");
            return res.send(responseObj);
        }
        if (!decodedToken.user_id) {
            let responseObj = promiseReturnResult(false, {}, {}, "User not valid");
            return res.send(responseObj);
        }

        // all available object values inside the encrypted token
        let user_id = decodedToken.user_id;
        let role = decodedToken.role;
        let email = decodedToken.email;
        let phone = decodedToken.phone;
        let token_created_at = decodedToken.token_created_at;

        let userPayload = { user_id: user_id, role: role, email: email }
        // setting session explicitey from token
        req['user_id'] = decodedToken.user_id;
        req['userPayload'] = userPayload;
        req["token_object"] = decodedToken;

        next();

    } catch (error) {
        console.log("Some error  occurred, while validating token in middleware", error);
        let responseObj = promiseReturnResult(false, {}, error, "Some error occurred.");
        return res.send(responseObj);
    }
}


module.exports = {
    verifyJWTToken
}