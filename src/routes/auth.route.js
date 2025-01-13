const express = require("express");
const { _register, _login } = require("../controllers/authController");
const { verifyJWTToken } = require("../middlewares/auth/auth.middleware");
const { authorizeRoles } = require("../middlewares/auth/permission.middleware");
const { USER_ROLES } = require("../constants/common");


const router = express.Router();

router.post("/register", _register);
router.post("/login", _login);

router.get('/health', verifyJWTToken, authorizeRoles(USER_ROLES.ADMIN, USER_ROLES.GUESTS), (req, res) => {
    res.send("health is okay");
})

module.exports = router;