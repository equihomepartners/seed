"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuth = void 0;
var jwt = require("jsonwebtoken");
var adminAuth = function (req, res, next) {
    var _a;
    try {
        var token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }
        var decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        // Add the decoded token to the request object
        req.admin = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
exports.adminAuth = adminAuth;
