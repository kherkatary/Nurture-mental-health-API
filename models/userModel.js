"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    mailCrypto: {
        type: String,
        require: true
    },
    isMailVerified: {
        type: Boolean,
        defaultValue: false
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model('users', userSchema);
