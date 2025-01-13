const RESOURCE_TYPES = {
    DOCUMENT: "document",
    CONTAINERS: "containers",
    NOTIFICATIONS: "notifications",
    EMAIL_OPPERATIONS: "email_operations"
}

const APP_PERMISSIONS = {

    // document permission access
    documentFullAccess: {
        title: "Document Full Access",
        description: "This permission will give the document full access to the users",
        resource_type: RESOURCE_TYPES.DOCUMENT,
        access_level: {
            read: true,
            write: true,
            delete: true,
        },
        permission_type: "global",
        internal: true,
        internal_id: "hIxmANCIWo",
    },

    documentReadAccess: {
        title: "Document Read Access",
        description: "This permission will give the document read access to the users",
        resource_type: RESOURCE_TYPES.DOCUMENT,
        access_level: {
            read: true,
            write: false,
            delete: false,
        },
        permission_type: "global",
        internal: true,
        internal_id: "OjRyaLqrMq",
    },

    documentUpdateAccess: {
        title: "Document Update Access",
        description: "This permission will give the document update access to the users",
        resource_type: RESOURCE_TYPES.DOCUMENT,
        access_level: {
            read: false,
            write: true,
            delete: false,
        },
        permission_type: "global",
        internal: true,
        internal_id: "8RfEdKcdpu",
    },

    documentDeleteAccess: {
        title: "Document Delete Access",
        description: "This permission will give the document delete access to the users",
        resource_type: RESOURCE_TYPES.DOCUMENT,
        access_level: {
            read: false,
            write: false,
            delete: true,
        },
        permission_type: "global",
        internal: true,
        internal_id: "HvEguLpCjc",
    },
}


module.exports = {
    APP_PERMISSIONS,
    RESOURCE_TYPES
}