const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    judul: { type: String, required: true },
    kategori: { type: String, required: true, enum: ['Cerpen', 'Pantun', 'Artikel', 'Novel'] },
    konten: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    tanggalDibuat: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Post', postSchema);