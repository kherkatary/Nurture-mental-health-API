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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.deletePost = exports.editPost = exports.getPost = exports.newPost = exports.allPost = void 0;
var postModel_ts_1 = require("../../models/postModel.ts");
var allPost = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var limit, allPost_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                limit = _req.body.limit;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 7]);
                allPost_1 = null;
                if (!limit) return [3 /*break*/, 3];
                return [4 /*yield*/, postModel_ts_1.default.find().sort({ _id: -1 }).limit(limit)];
            case 2:
                allPost_1 = _a.sent();
                return [3 /*break*/, 5];
            case 3: return [4 /*yield*/, postModel_ts_1.default.find().sort({ _id: -1 })];
            case 4:
                allPost_1 = _a.sent();
                _a.label = 5;
            case 5:
                if (!allPost_1 || allPost_1.length === 0) {
                    console.log("No posts available");
                    return [2 /*return*/, res.status(404).send({ message: "No posts found" })];
                }
                return [2 /*return*/, res.status(200).send({
                        message: "All Posts Fetched",
                        posts: allPost_1,
                    })];
            case 6:
                err_1 = _a.sent();
                return [2 /*return*/, res.status(500).send({ message: "Error fetching posts", error: err_1 })];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.allPost = allPost;
var newPost = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, author, content, cover, newPostFetched, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _req.body, title = _a.title, author = _a.author, content = _a.content, cover = _a.cover;
                if (!title)
                    return [2 /*return*/, res.status(400).send({ message: "Title required" })];
                if (!author)
                    return [2 /*return*/, res.status(400).send({ message: "Author required" })];
                if (!content)
                    return [2 /*return*/, res.status(400).send({ message: "Content required" })];
                if (!cover)
                    return [2 /*return*/, res.status(400).send({ message: "Cover required" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, new postModel_ts_1.default({ title: title, author: author, content: content, cover: cover }).save()];
            case 2:
                newPostFetched = _b.sent();
                if (!newPostFetched) {
                    return [2 /*return*/, res.status(400).send({ message: "Post not created" })];
                }
                return [2 /*return*/, res.status(201).send({ message: "Post created", pid: newPostFetched._id })];
            case 3:
                err_2 = _b.sent();
                return [2 /*return*/, res.status(500).send({ message: "Error creating post", error: err_2 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.newPost = newPost;
var getPost = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pid, post, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pid = _req.body.pid;
                if (!pid)
                    return [2 /*return*/, res.status(400).send({ message: "PID required" })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postModel_ts_1.default.findById(pid)];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send({ message: "Post with this ID not found" })];
                return [2 /*return*/, res.status(200).send({
                        message: "Post fetched",
                        post: post,
                    })];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, res.status(500).send({ message: "Error fetching the post ID: ".concat(pid), error: err_3 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getPost = getPost;
var editPost = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, title, author, content, cover, pid, post, err_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = _req.body, title = _a.title, author = _a.author, content = _a.content, cover = _a.cover, pid = _a.pid;
                console.log("Request Body:", _req.body); // Add this line
                if (!pid)
                    return [2 /*return*/, res.status(400).send({ message: "PID required" })];
                if (!title)
                    return [2 /*return*/, res.status(400).send({ message: "Title required" })];
                if (!author)
                    return [2 /*return*/, res.status(400).send({ message: "Author required" })];
                if (!content)
                    return [2 /*return*/, res.status(400).send({ message: "Content required" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postModel_ts_1.default.findByIdAndUpdate(pid, { title: title, author: author, content: content, cover: cover }, { new: true })];
            case 2:
                post = _b.sent();
                if (!post) {
                    return [2 /*return*/, res.status(404).send({ message: "Couldn't update", success: false })];
                }
                res.status(200).send({ message: "Updated", success: true, pid: post._id });
                return [3 /*break*/, 4];
            case 3:
                err_4 = _b.sent();
                return [2 /*return*/, res.status(500).send({ error: err_4 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.editPost = editPost;
var deletePost = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pid, post, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pid = _req.body.pid;
                if (!pid)
                    return [2 /*return*/, res.status(400).send({ message: "PID required" })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, postModel_ts_1.default.findByIdAndDelete(pid)];
            case 2:
                post = _a.sent();
                if (!post)
                    return [2 /*return*/, res.status(404).send({ message: "Post with this ID not found" })];
                return [2 /*return*/, res.status(200).send({ message: "Post deleted", success: true })];
            case 3:
                err_5 = _a.sent();
                return [2 /*return*/, res.status(500).send({ error: err_5 })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deletePost = deletePost;
