const express = require('express');
const router = express.Router();

const { deleteUserById } = require('../controller/user.controller');

// const { authenticateToken } = require('../middleware/auth');


router.delete('/delete/:id', deleteUserById);


module.exports = router;

