"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsletterSubscriber = void 0;
var mongoose_1 = require("mongoose");
var newsletterSubscriberSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    subscribedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});
exports.NewsletterSubscriber = mongoose_1.default.model('NewsletterSubscriber', newsletterSubscriberSchema);
