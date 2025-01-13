const { DOCUMENT_TYPES } = require("../../constants/common");

const validateDocumentType = fileType => Object.values(DOCUMENT_TYPES).find(type => type.toLowerCase() === fileType?.trim().toLowerCase()) || DOCUMENT_TYPES.MISCELLANEOUS;


module.exports = {
    validateDocumentType
}