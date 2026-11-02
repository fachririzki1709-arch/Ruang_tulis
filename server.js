require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// Import Routes
const publicRoutes = require('./routes/publicRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Koneksi MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Terhubung ke MongoDB'))
    .catch(err => console.log('❌ Gagal ke MongoDB:', err));

// Konfigurasi Express
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET || 'rahasia123',
    resave: false, 
    saveUninitialized: false
}));

// Gunakan Routes
app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di http://localhost:${PORT}`));