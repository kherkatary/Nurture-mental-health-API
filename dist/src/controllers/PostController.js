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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.editPost = exports.getPost = exports.newPost = exports.allPost = void 0;
const postModel_1 = __importDefault(require("../../models/postModel"));
const allPost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { limit } = _req.body;
    try {
        let allPost = null;
        if (limit) {
            allPost = yield postModel_1.default.find().sort({ _id: -1 }).limit(limit);
        }
        else {
            allPost = yield postModel_1.default.find().sort({ _id: -1 });
        }
        if (!allPost || allPost.length === 0) {
            console.log("No posts available");
            return res.status(404).send({ message: "No posts found" });
        }
        return res.status(200).send({
            message: "All Posts Fetched",
            posts: allPost,
        });
    }
    catch (err) {
        return res.status(500).send({ message: "Error fetching posts", error: err });
    }
});
exports.allPost = allPost;
const newPost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, content, cover } = _req.body;
    if (!title)
        return res.status(400).send({ message: "Title required" });
    if (!author)
        return res.status(400).send({ message: "Author required" });
    if (!content)
        return res.status(400).send({ message: "Content required" });
    if (!cover)
        return res.status(400).send({ message: "Cover required" });
    try {
        const newPostFetched = yield new postModel_1.default({ title, author, content, cover }).save();
        if (!newPostFetched) {
            return res.status(400).send({ message: "Post not created" });
        }
        return res.status(201).send({ message: "Post created", pid: newPostFetched._id });
    }
    catch (err) {
        return res.status(500).send({ message: "Error creating post", error: err });
    }
});
exports.newPost = newPost;
const getPost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid } = _req.body;
    if (!pid)
        return res.status(400).send({ message: "PID required" });
    try {
        const post = yield postModel_1.default.findById(pid);
        if (!post)
            return res.status(404).send({ message: "Post with this ID not found" });
        return res.status(200).send({
            message: "Post fetched",
            post: post,
        });
    }
    catch (err) {
        return res.status(500).send({ message: `Error fetching the post ID: ${pid}`, error: err });
    }
});
exports.getPost = getPost;
const editPost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, author, content, cover, pid } = _req.body;
    console.log("Request Body:", _req.body); // Add this line
    if (!pid)
        return res.status(400).send({ message: "PID required" });
    if (!title)
        return res.status(400).send({ message: "Title required" });
    if (!author)
        return res.status(400).send({ message: "Author required" });
    if (!content)
        return res.status(400).send({ message: "Content required" });
    try {
        const post = yield postModel_1.default.findByIdAndUpdate(pid, { title, author, content, cover }, { new: true });
        if (!post) {
            return res.status(404).send({ message: "Couldn't update", success: false });
        }
        res.status(200).send({ message: "Updated", success: true, pid: post._id });
    }
    catch (err) {
        return res.status(500).send({ error: err });
    }
});
exports.editPost = editPost;
const deletePost = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pid } = _req.body;
    if (!pid)
        return res.status(400).send({ message: "PID required" });
    try {
        const post = yield postModel_1.default.findByIdAndDelete(pid);
        if (!post)
            return res.status(404).send({ message: "Post with this ID not found" });
        return res.status(200).send({ message: "Post deleted", success: true });
    }
    catch (err) {
        return res.status(500).send({ error: err });
    }
});
exports.deletePost = deletePost;
//# sourceMappingURL=PostController.js.map