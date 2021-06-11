const express = require('express');
const router = express.Router();

// Render Page
router.get('/', function (req, res) {
    res.send("API");
});

const ApiRouter = require('./api/index');
router.use('/auth', ApiRouter.auth);
router.use('/restoran', ApiRouter.restoran);
router.use('/product', ApiRouter.product);

module.exports = router;