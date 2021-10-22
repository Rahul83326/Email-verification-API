const express = require('express');
const authController = require("./authentication.controller");
const router = express.Router();

router.post("/signUp", authController.signUp);
router.post("/login", authController.login);
router.post("/logout", authController.logOut); /* authController.protect,  */
router.post("/newRefreshToken", authController.getRefreshToken);

module.exports = router;