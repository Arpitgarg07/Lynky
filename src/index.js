require('dotenv').config();

const express = require('express');

const connectWhatsApp = require('./socket/whatsapp');
const connectDB = require('./database/db');
const app = express();

const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.json());


// Test Route
app.get('/', (req, res) => {
    res.send('Server is running...');
});

connectDB();
connectWhatsApp();
// Start Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});