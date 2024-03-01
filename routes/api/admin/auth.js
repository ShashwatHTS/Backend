const express = require('express');
const router = express.Router();

const { logInUser, logOutUser } = require('../../../controller/admin/auth.controllers');



router.post('/login', logInUser);
router.get('/logout', logOutUser);

module.exports = router;