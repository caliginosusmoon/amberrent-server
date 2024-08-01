const express = require("express");

const router = express.Router();
const userController = require("../controllers/userController");

router.post("/add", userController.createUser);
router.post("/login", userController.loginUser);
router.put("/:id", userController.updateUser);

module.exports = router;
