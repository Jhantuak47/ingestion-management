const express = require("express");
const ingestionController = require("../controllers/ingestionController");
const { verifyJWTToken } = require("../middlewares/auth/auth.middleware");
const { authorizeRoles } = require("../middlewares/auth/permission.middleware");
const { USER_ROLES } = require("../constants/common");

const router = express.Router();

router.post("/", verifyJWTToken, authorizeRoles(USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.MANAGER), ingestionController.createIngestion);
router.get("/:id", verifyJWTToken, ingestionController.getIngestionStatus);
router.post("/sources", verifyJWTToken, authorizeRoles(USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.MANAGER), ingestionController.addDataSource);
router.get("/sources", verifyJWTToken, ingestionController.listDataSources);
router.post("/retry/:id", verifyJWTToken, authorizeRoles(USER_ROLES.ADMIN, USER_ROLES.EDITOR, USER_ROLES.MANAGER), ingestionController.retryIngestion);

module.exports = router;
