const { DOCUMENT_TYPES } = require("../../constants/common");
const { userDocument } = require("../../models/document.model");
const { promiseReturnResult } = require("../../utils/common/promiseHelper");
const { validateDocumentType } = require("../../utils/uploads/documentUpload.constant");

exports.createDocument = async (request_data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const docType = validateDocumentType(request_data.doc_type);
            const { path, filename, mimetype, title, description, user_id } = request_data;
            const documentUploadData = {
                user_id,
                title,
                description,
                file_path: path,
                file_name: filename,
                document_format: mimetype,
                document_type: docType
            }

            console.log({ documentUploadData });
            const persistedDocument = await userDocument.create(documentUploadData);

            const apiResponse = promiseReturnResult(true, persistedDocument, {}, "Success, File uploaded successfully");

            return resolve(apiResponse);
        } catch (error) {
            return resolve(promiseReturnResult(false, {}, error, error.message))
        }
    });
};

exports.getAllDocuments = async () => {
    return await userDocument.find();
};

exports.getDocumentById = async (id) => {
    return await userDocument.findById(id);
};

exports.updateDocument = async (id, data) => {
    return await userDocument.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteDocument = async (id) => {
    return await userDocument.findByIdAndDelete(id);
};
