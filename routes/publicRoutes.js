const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Product = require('../models/Product');

// Halaman Beranda Publik
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ tanggalDibuat: -1 }).limit(10);
        const products = await Product.find({ statusAktif: true });
        res.render('public/index', { posts, products });
    } catch (err) {
        res.status(500).send('Error Server');
    }
});

// Sistem Login (Rute Bebas Akses)
router.get('/login', (req, res) => res.render('admin/login'));

router.post('/login', (req, res) => {
    if (req.body.username === 'admin' && req.body.password === 'admin123') {
        req.session.isAdmin = true;
        res.redirect('/admin/dashboard');
    } else {
        res.send('Login Gagal, silakan kembali.');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;