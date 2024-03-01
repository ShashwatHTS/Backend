const express = require('express');
const router = express.Router();

const { getRole, createAdminRole, updateAdminRole } = require('../../../controller/role.controllers');



router.get('/list-role', getRole);
router.post('/create-role', createAdminRole);
router.post('/update-role/:id', updateAdminRole);


module.exports = router;

