const express = require('express');
const router = express.Router();

const { createUser, updateUser, getUsers } = require('../../../controller/admin/user.controller');

// const { authenticateToken } = require('../middleware/auth');


router.post('/create-user', createUser);
router.get('/get-user', getUsers);
router.post('/update/:id', updateUser);


module.exports = router;

