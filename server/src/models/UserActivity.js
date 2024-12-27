"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivity = void 0;
var mongoose_1 = require("mongoose");
var visitHistorySchema = new mongoose_1.default.Schema({
    page: String,
    timestamp: Date,
    scheduledDate: Date
});
var userActivitySchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    progress: {
        businessPitchViewed: Boolean,
        portfolioOSViewed: Boolean,
        introCallScheduled: Boolean,
        interestRegistered: Boolean,
        webinarRegistered: Boolean,
        scheduledCallDate: Date
    },
    visitHistory: [visitHistorySchema]
}, {
    timestamps: true
});
exports.UserActivity = mongoose_1.default.model('UserActivity', userActivitySchema);
