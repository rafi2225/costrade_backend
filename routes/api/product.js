const express = require('express');
const router = express.Router();
const { db } = require('../../function/firebase');
const { getProduct, addProduct } = db;

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ status: false, msg: "id required" });
    const get = await getProduct(id);
    res.json(get);
});

router.post('/', async (req, res) => {
    const { foto, namaProduk, harga, deskripsi, topping, api_key } = req.body;
    if (!foto || !namaProduk || !harga || !deskripsi ||
        !topping) return res.status(400)
            .json({ status: false, msg: "data required" });
    const addProductIt = await addProduct(foto, namaProduk, harga, deskripsi,
        topping, api_key);
    res.json(addProductIt);
});

module.exports = router;