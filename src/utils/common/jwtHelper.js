'use strict';

var jwt = require('jsonwebtoken');
const appConfig = require('../../config/app.config');


let encryptJsonData = (json_data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let encToken = jwt.sign(json_data, appConfig.SECRETS_KEY.JWT_SECRET);
            resolve(encToken)
        } catch (error) {
            console.log("some error occurred while encrypting json : ", error);
            return resolve(undefined);
        }
    });
}

let decryptJsonData = (json_token) => {
    return new Promise(async (resolve, reject) => {
        try {
            var decodedToken = jwt.verify(json_token, appConfig.SECRETS_KEY.JWT_SECRET);
            resolve(decodedToken)
        } catch (error) {
            console.log("some error occurred while decrypting json : ", error);
            return resolve(undefined);
        }
    });
}

let pluckAuthorizationTokenFromHeader = (headers, body) => {
    let token = headers.token || body.token;
    if (!token) {
        const authHeader = headers.Authorization || headers.authorization;
        if (authHeader && authHeader.indexOf("Bearer") > -1) {
            token = authHeader.split(" ")[1];
            return token;
        }
    }
    return token;
}

module.exports = {
    encryptJsonData,
    decryptJsonData,
    pluckAuthorizationTokenFromHeader
}
