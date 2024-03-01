var express = require("express");
var router = express.Router();
var adminRouter = require("./admin");
var authRouter = require("./auth");
var roleRouter = require("./role");

router.use('/', adminRouter);
router.use('/auth', authRouter);
router.use('/role', roleRouter)


router.get('/', (req, res, next) => {
    res.send({ success: true, message: "" });
})

module.exports = router;