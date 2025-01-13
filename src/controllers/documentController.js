const documentService = require("../services/documents/documentService");
const { promiseReturnResult } = require("../utils/common/promiseHelper");

exports.createDocument = async (req, res) => {
    try {

        if (!req.file) {
            return res.send(promiseReturnResult(false, {}, {}, "Failed uploading file please try agian."));
        }

        const documentData = {
            ...req.body,
            ...req.file,
            user_id: req.user_id,
        };
        const response = await documentService.createDocument(documentData);
        res.send(response);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getAllDocuments = async (req, res) => {
    try {
        const documents = await documentService.getAllDocuments();
        res.status(200).json({ success: true, documents });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.getDocumentById = async (req, res) => {
    try {
        const document = await documentService.getDocumentById(req.params.id);
        if (!document) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }
        res.status(200).json({ success: true, document });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.updateDocument = async (req, res) => {
    try {
        const updatedDocument = await documentService.updateDocument(req.params.id, req.body);
        if (!updatedDocument) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }
        res.status(200).json({ success: true, updatedDocument });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

exports.deleteDocument = async (req, res) => {
    try {
        const deletedDocument = await documentService.deleteDocument(req.params.id);
        if (!deletedDocument) {
            return res.status(404).json({ success: false, message: "Document not found" });
        }
        res.status(200).json({ success: true, message: "Document deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
