import { Router } from "express";
import { allPost, getPost, newPost ,editPost,deletePost} from "../controllers/PostController";

const postRouter= Router();

postRouter.post("/all-post", allPost);

postRouter.post("/new-post", newPost )
postRouter.post("/get-post", getPost);
postRouter.post("/edit-post",editPost)
postRouter.post("/delete-post",deletePost)


export default postRouter