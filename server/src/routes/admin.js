"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var adminAuth_1 = require("../middleware/adminAuth");
var UserActivity_1 = require("../models/UserActivity");
var NewsletterSubscriber_1 = require("../models/NewsletterSubscriber");
var router = express.Router();
// Get admin dashboard metrics
router.get('/metrics', adminAuth_1.adminAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, totalUsers, activeUsers, scheduledCalls, webinarRegistrations, newsletterSubscribers, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Promise.all([
                        UserActivity_1.UserActivity.countDocuments(),
                        UserActivity_1.UserActivity.countDocuments({
                            lastActive: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
                        }),
                        UserActivity_1.UserActivity.countDocuments({ 'progress.introCallScheduled': true }),
                        UserActivity_1.UserActivity.countDocuments({ 'progress.webinarRegistered': true }),
                        NewsletterSubscriber_1.NewsletterSubscriber.countDocuments()
                    ])];
            case 1:
                _a = _b.sent(), totalUsers = _a[0], activeUsers = _a[1], scheduledCalls = _a[2], webinarRegistrations = _a[3], newsletterSubscribers = _a[4];
                res.json({
                    totalUsers: totalUsers,
                    activeUsers: activeUsers,
                    scheduledCalls: scheduledCalls,
                    webinarRegistrations: webinarRegistrations,
                    newsletterSubscribers: newsletterSubscribers
                });
                return [3 /*break*/, 3];
            case 2:
                error_1 = _b.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get recent user activity
router.get('/user-activity', adminAuth_1.adminAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var activities, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, UserActivity_1.UserActivity.find()
                        .sort({ lastActive: -1 })
                        .limit(50)];
            case 1:
                activities = _a.sent();
                res.json(activities);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
// Get newsletter subscribers
router.get('/newsletter-subscribers', adminAuth_1.adminAuth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var subscribers, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, NewsletterSubscriber_1.NewsletterSubscriber.find()
                        .sort({ subscribedAt: -1 })];
            case 1:
                subscribers = _a.sent();
                res.json(subscribers);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                res.status(500).json({ error: 'Server error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
