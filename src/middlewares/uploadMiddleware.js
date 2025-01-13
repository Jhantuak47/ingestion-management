const multer = require("multer");
const path = require("path");
const { ALLOWED_MIME_TYPE } = require("../constants/common");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Define the upload folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    console.log('file fileter is running');
    const allowedMimeTypes = ALLOWED_MIME_TYPE;
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = upload;
