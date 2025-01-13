'use strict';

const mongoose = require('mongoose');
const { DOCUMENT_TYPES, DOCUMENT_FORMATS, ALLOWED_MIME_TYPE } = require('../constants/common');

/**
 * This collection keeps the information of the access type of different entities so that the user can create and assign 
 * different access role to the different users or the group of users
 */

const DocumentSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users',
            required: true,
            index: true,
        },
        title: {
            type: String,
        },
        description: {
            type: String
        },
        document_type: {
            type: String,
            enum: [...Object.values(DOCUMENT_TYPES)]
        },
        document_format: {
            type: String,
            enum: [...ALLOWED_MIME_TYPE]
        },
        file_path: {
            type: String,
            required: true
        },
        file_name: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const userDocument = mongoose.model('documents', DocumentSchema);
module.exports = { userDocument };
