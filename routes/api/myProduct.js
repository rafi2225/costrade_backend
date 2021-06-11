const express = require('express');
const router = express.Router();
const { getMyProducts } = require('../../function/firebase/db')

// Render Page
router.get('/:api_key', async (req, res) => {
    const { api_key } = req.params;
    if (!api_key) return res.status(400).json({ status: false, msg: "api key required" });
    const myProductData = await getMyProducts(api_key);
    res.json(myProductData);
});

module.exports = router;