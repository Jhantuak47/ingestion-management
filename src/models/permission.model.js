'use strict';

const mongoose = require('mongoose');
const { RESOURCE_TYPES } = require('../constants/permissionAccess');

/**
 * This collection keeps the information of the access type of different entities so that the user can create and assign 
 * different access role to the different users or the group of users
 */

const userPermissionScheme = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        resource_type: {
            type: String,
            enum: [...RESOURCE_TYPES]
        },
        access_level: {
            read: { type: Boolean, required: true },
            write: { type: Boolean, required: true },
            delete: { type: Boolean, required: true },
        },
        permission_type: {
            type: String,
            enum: ["global", "local"],
            default: "local"
        },
        internal: {
            type: Boolean,
            required: true,
            default: false,
            index: true
        },
        internal_id: {
            type: String,
            default: '',
            index: true
        },
    },
    {
        timestamps: true
    }
);

const UserPermissions = mongoose.model('user_permission', userPermissionScheme);
module.exports = { UserPermissions };
