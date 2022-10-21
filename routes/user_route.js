const express = require("express");
const router = express.Router();

const userController = require("../controller/userController.js");

//with Sequelize
router.post('/addUser', userController.addUser)
router.get('/allUsers', userController.getAllUsers)
router.post('/login', userController.loginUser)



module.exports = router;