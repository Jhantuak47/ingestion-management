const mongoose = require("mongoose");
const { INGESTION_SOURCE_TYPES } = require("../utils/common/dataHelper");

const ingestionSchema = new mongoose.Schema({
    sourceType: {
        type: String,
        required: true,
        enum: [...INGESTION_SOURCE_TYPES],
    },
    sourceDetails: {
        type: Object,
        required: true,
    },
    status: {
        type: String,
        default: "pending",
    },
    error: {
        type: String,
        default: null,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("ingestions", ingestionSchema);
