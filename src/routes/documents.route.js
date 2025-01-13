const express = require("express");
const uploadMiddleware = require('../middlewares/uploadMiddleware')
const documentController = require('../controllers/documentController');
const { verifyJWTToken } = require("../middlewares/auth/auth.middleware");

const router = express.Router();

// CRUD routes
router.post("/upload", verifyJWTToken, uploadMiddleware.single("document"), documentController.createDocument);
router.get("/", verifyJWTToken, documentController.getAllDocuments);
router.get("/:id", verifyJWTToken, documentController.getDocumentById);
router.put("/:id", verifyJWTToken, documentController.updateDocument);
router.delete("/:id", verifyJWTToken, documentController.deleteDocument);

module.exports = router;
