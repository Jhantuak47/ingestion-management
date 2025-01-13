const mongoose = require("mongoose");
const { USER_ROLES } = require("../constants/common");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        required: true,
        enum: [...Object.values(USER_ROLES)]
    },

    user_permissions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user_permission',
        autopopulate: true,
    }],

    documents: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'documents',
        autopopulate: true,
    }]

}, {
    timestamps: true,
});

module.exports = mongoose.model("User", userSchema);