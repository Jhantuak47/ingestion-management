'use strict';
let promiseReturnResult = (status, data, error, message) => {
    let result = {
        status: false,
        data: {},
        error: {},
        msg: '',
    }

    result.status = status;
    result.data = data;
    result.error = error;
    result.msg = message;

    return result;
}

module.exports = {
    promiseReturnResult,
}