const express = require('express');
const router = express.Router();

const { getRole,createAdminRole,updateAdminRole } = require('../controller/role.controllers');

// const { authenticateToken } = require('../middleware/auth');


router.get('/listrole', getRole);
router.post('/createrole', createAdminRole);
router.post('/updaterole/:id', updateAdminRole);


module.exports = router;

