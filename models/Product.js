const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    namaProduk: { type: String, required: true },
    harga: { type: Number, required: true },
    gambarUrl: { type: String, required: true },
    shopeeLink: { type: String, required: true },
    statusAktif: { type: Boolean, default: true }
});
module.exports = mongoose.model('Product', productSchema);