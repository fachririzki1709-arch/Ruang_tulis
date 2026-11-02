const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const requireAuth = require('../middlewares/requireAuth');

// Pasang middleware pelindung untuk seluruh rute admin
router.use(requireAuth);

// Halaman Dashboard Admin
router.get('/dashboard', async (req, res) => {
    const posts = await Post.find().sort({ tanggalDibuat: -1 });
    res.render('admin/dashboard', { adminName: 'Fachri Rizki', posts });
});

// Halaman Upload
router.get('/upload', (req, res) => {
    res.render('admin/upload', { adminName: 'Fachri Rizki' });
});

// Proses Upload
router.post('/upload', async (req, res) => {
    const { judul, kategori, konten } = req.body;
    const slug = judul.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    await new Post({ judul, kategori, konten, slug }).save();
    res.redirect('/admin/dashboard');
});

module.exports = router;