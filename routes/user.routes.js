const express = require('express');
const router = express.Router();

const { createUser, updateUser, getUsers } = require('../controller/user.controller');

// const { authenticateToken } = require('../middleware/auth');


router.post('/create', createUser);
router.get('/getuser', getUsers);
router.post('/update/:id', updateUser);


module.exports = router;

