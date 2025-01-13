const { promiseReturnResult } = require("../../utils/common/promiseHelper");

const authorizeRoles = (...accessRoles) => (req, res, next) => {
    const { userPayload } = req;

    if (!userPayload) {
        return res.send(promiseReturnResult(false, {}, {}, "Invalid user identity!"));
    }

    if (!accessRoles.includes(userPayload.role)) {
        return res.status(403).send(promiseReturnResult(false, {}, {}, "Unauthorized to access, Invalid role!"));
    }

    next();
}

module.exports = {
    authorizeRoles
}