const { APP_PERMISSIONS } = require("./permissionAccess");

const USER_ROLES = {
    ADMIN: 'ADMIN',
    USER: 'USER',
    GUESTS: 'GUESTS',
    MANAGER: 'MANAGER',
    EDITOR: 'EDITOR',
    VIEWER: 'VIEWER'
}

const USER_PERMISSIONS = {
    [USER_ROLES.ADMIN]: [APP_PERMISSIONS.documentFullAccess],
    [USER_ROLES.USER]: [APP_PERMISSIONS.documentReadAccess],
    [USER_ROLES.MANAGER]: [APP_PERMISSIONS.documentReadAccess, APP_PERMISSIONS.documentUpdateAccess],
    [USER_ROLES.EDITOR]: [APP_PERMISSIONS.documentDeleteAccess]

    /**
     * add remaining permissions as per the requirements..
     */
};


const DOCUMENT_TYPES = {
    QUESTION_SHEET: 'question_sheet',
    ANSWEAR_SHEET: 'answear_sheet',
    SQS_LISTS: 'sqs_list',
    MISCELLANEOUS: 'miscellaneous'
}

const DOCUMENT_FORMATS = {
    CSV: 'csv',
    PDF: 'pdf',
    DOC: 'doc',
    EXCELL: 'excell',
    PNG: 'png'
}

const ALLOWED_MIME_TYPE = ["application/pdf", "image/jpeg", "image/png"];

module.exports = {
    USER_ROLES,
    USER_PERMISSIONS,
    DOCUMENT_FORMATS,
    DOCUMENT_TYPES,
    ALLOWED_MIME_TYPE
}