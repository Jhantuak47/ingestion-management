const User = require("../../models/user.model");
const { promiseReturnResult } = require("../../utils/common/promiseHelper");


const findUserByUserName = (username) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ username: username });

            if (!user) {
                return resolve(promiseReturnResult(false, {}, {}, "failed obtaining user!"));
            }
            return resolve(promiseReturnResult(true, user, {}, "Success user is found!"));
        } catch (error) {
            return resolve(promiseReturnResult(false, {}, error, "Filed getting user by user name!"));
        }
    });
}

module.exports = {
    findUserByUserName
}