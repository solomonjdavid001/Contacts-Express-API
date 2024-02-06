const express = require("express");
const { registerUser, loginUser, currentUser } = require("../../controllers/auth/user.controllers");
const validateToken = require("../../middlewares/validateToken.middlewares");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

module.exports = router;
