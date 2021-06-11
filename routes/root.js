const express = require('express');
const router = express.Router();

// Render Page
router.get('/', function (req, res) {
    res.send("root");
});

module.exports = router;