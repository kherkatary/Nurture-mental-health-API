"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var postSchema = new mongoose_1.default.Schema({
    author: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    cover: {
        type: String
    },
    title: {
        type: String,
        required: true
    }
}, { timestamps: true });
exports.default = mongoose_1.default.model("posts", postSchema);
