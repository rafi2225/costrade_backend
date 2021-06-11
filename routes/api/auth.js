const express = require('express');
const router = express.Router();
const { auth } = require('../../function/firebase');
const { login, register } = auth;

// Render Page
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({
        status: false, msg: "data required"
    });
    const loginUser = await login(email, password);
    res.json(loginUser);
});

router.post('/register', async (req, res) => {
    const { nama, alamat, email, password, picture, telepon } = req.body;
    if (!nama || !alamat || !email || !password ||
        !picture || !telepon) return res.json({ status: false, msg: "data required" });
    const regIt = await register(nama, alamat, telepon, picture, email, password);
    res.json(regIt);
})

module.exports = router;