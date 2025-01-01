// routes.js
const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupCon');
const loginController = require('../controllers/loginCon');
const userController = require('../controllers/userCon');
const { authenticateToken } = require('../utils/jwt');
const cors = require('cors');

router.use(cors());

router.post('/register', signupController.createUser);
router.post('/login', loginController.loginUser);
router.get('/users', authenticateToken, userController.getUsers); // Ensure authenticateToken is here
router.get('/profile', authenticateToken, userController.getProfile); // Ensure authenticateToken is here
router.delete('/delete/:userId', authenticateToken, userController.deleteUser); // Ensure authenticateToken is here
//router.post('/refresh', loginController.refreshTokenHandler);
module.exports = router;
