"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = require("../controllers/PostController");
const postRouter = (0, express_1.Router)();
postRouter.post("/all-post", PostController_1.allPost);
postRouter.post("/new-post", PostController_1.newPost);
postRouter.post("/get-post", PostController_1.getPost);
postRouter.post("/edit-post", PostController_1.editPost);
postRouter.post("/delete-post", PostController_1.deletePost);
exports.default = postRouter;
//# sourceMappingURL=PostRoute.js.map