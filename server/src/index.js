"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var dotenv = require("dotenv");
var admin_1 = require("./routes/admin");
var tracking_1 = require("./routes/tracking");
dotenv.config();
var app = express();
// Middleware
app.use(express.json());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? 'https://seed.equihome.com.au'
        : 'http://localhost:3000'
}));
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/equihome')
    .then(function () { return console.log('Connected to MongoDB'); })
    .catch(function (err) { return console.error('MongoDB connection error:', err); });
// Routes
app.use('/api/admin', admin_1.default);
app.use('/api/track', tracking_1.default);
// Health check
app.get('/health', function (req, res) {
    res.json({ status: 'ok' });
});
var PORT = process.env.PORT || 3001;
app.listen(PORT, function () {
    console.log("Server running on port ".concat(PORT));
});
