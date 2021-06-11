const express = require('express');
const router = express.Router();
const { db } = require('../../function/firebase');
const { addRestoran, getRestoran } = db

// Render Page
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ status: false, msg: "id required" });
    const get = await getRestoran(id);
    res.json(get);
});

router.post('/', async (req, res) => {
    const { nama, email, alamat, nomor, jenisKendaraan, foto } = req.body;
    if (!nama || !email || !alamat || !nomor ||
        !jenisKendaraan || !foto) return res.status(400)
            .json({ status: false, msg: "data required" });
    const addResto = await addRestoran(nama, email, alamat, nomor, jenisKendaraan, foto);
    res.json(addResto);
});

module.exports = router;