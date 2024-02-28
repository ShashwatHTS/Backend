const express = require('express');
const router = express.Router();
const app = express()
const { logOutUser, logInUser, getData, getRegistered } = require('../controller/auth.controllers');
const { authenticateToken } = require('../middleware/auth');


router.post('/login', logInUser);
router.post('/register', getRegistered);

router.use(authenticateToken)

router.get('/allregisteres', getData);
router.post('/logout', logOutUser)

module.exports = router;