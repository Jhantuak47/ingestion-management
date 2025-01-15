const {
    createDocument,
    getAllDocuments,
    getDocumentById,
    updateDocument,
    deleteDocument
} = require("../documentService");
const { userDocument } = require("../../../models/document.model");
const { validateDocumentType } = require("../../../utils/uploads/documentUpload.constant");
const { promiseReturnResult } = require("../../../utils/common/promiseHelper");
const mongoose = require("mongoose");

jest.mock("../../../models/document.model");
jest.mock("../../../utils/uploads/documentUpload.constant");
jest.mock("../../../utils/common/promiseHelper");

describe("Document Service", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("createDocument", () => {
        it("should create a new document and return a success response", async () => {
            const mockRequestData = {
                doc_type: "type1",
                path: "/files/doc1.pdf",
                filename: "doc1.pdf",
                mimetype: "application/pdf",
                title: "Document Title",
                description: "Document Description",
                user_id: "user123",
            };

            const mockValidatedDocType = "ValidatedType1";
            const mockPersistedDocument = { id: "doc123", ...mockRequestData };
            const mockApiResponse = {
                success: true,
                data: mockPersistedDocument,
                error: {},
                message: "Success, File uploaded successfully",
            };

            validateDocumentType.mockReturnValue(mockValidatedDocType);
            userDocument.create.mockResolvedValue(mockPersistedDocument);
            promiseReturnResult.mockReturnValue(mockApiResponse);

            const result = await createDocument(mockRequestData);

            expect(validateDocumentType).toHaveBeenCalledWith(mockRequestData.doc_type);
            expect(userDocument.create).toHaveBeenCalledWith({
                user_id: mockRequestData.user_id,
                title: mockRequestData.title,
                description: mockRequestData.description,
                file_path: mockRequestData.path,
                file_name: mockRequestData.filename,
                document_format: mockRequestData.mimetype,
                document_type: mockValidatedDocType,
            });
            expect(promiseReturnResult).toHaveBeenCalledWith(true, mockPersistedDocument, {}, "Success, File uploaded successfully");
            expect(result).toEqual(mockApiResponse);
        });

        it("should handle errors and return a failure response", async () => {
            const mockRequestData = { doc_type: "type1" };
            const mockError = new Error("Validation failed");
            const mockApiResponse = {
                success: false,
                data: {},
                error: mockError,
                message: mockError.message,
            };

            validateDocumentType.mockImplementation(() => {
                throw mockError;
            });
            promiseReturnResult.mockReturnValue(mockApiResponse);

            const result = await createDocument(mockRequestData);

            expect(validateDocumentType).toHaveBeenCalledWith(mockRequestData.doc_type);
            expect(userDocument.create).not.toHaveBeenCalled();
            expect(promiseReturnResult).toHaveBeenCalledWith(false, {}, mockError, mockError.message);
            expect(result).toEqual(mockApiResponse);
        });
    });

    describe("getAllDocuments", () => {
        it("should return all documents", async () => {
            const mockDocuments = [{ id: 1 }, { id: 2 }];

            userDocument.find.mockResolvedValue(mockDocuments);

            const result = await getAllDocuments();

            expect(userDocument.find).toHaveBeenCalled();
            expect(result).toEqual(mockDocuments);
        });
    });

    describe("getDocumentById", () => {
        it("should return a document by ID", async () => {
            const mockId = new mongoose.Types.ObjectId();
            const mockDocument = { id: mockId };

            userDocument.findById.mockResolvedValue(mockDocument);

            const result = await getDocumentById(mockId);

            expect(userDocument.findById).toHaveBeenCalledWith(mockId);
            expect(result).toEqual(mockDocument);
        });
    });

    describe("updateDocument", () => {
        it("should update a document and return the updated document", async () => {
            const mockId = new mongoose.Types.ObjectId();
            const mockData = { title: "Updated Title" };
            const mockUpdatedDocument = { id: mockId, ...mockData };

            userDocument.findByIdAndUpdate.mockResolvedValue(mockUpdatedDocument);

            const result = await updateDocument(mockId, mockData);

            expect(userDocument.findByIdAndUpdate).toHaveBeenCalledWith(mockId, mockData, { new: true });
            expect(result).toEqual(mockUpdatedDocument);
        });
    });

    describe("deleteDocument", () => {
        it("should delete a document and return the deleted document", async () => {
            const mockId = new mongoose.Types.ObjectId();
            const mockDeletedDocument = { id: mockId };

            userDocument.findByIdAndDelete.mockResolvedValue(mockDeletedDocument);

            const result = await deleteDocument(mockId);

            expect(userDocument.findByIdAndDelete).toHaveBeenCalledWith(mockId);
            expect(result).toEqual(mockDeletedDocument);
        });
    });
});
