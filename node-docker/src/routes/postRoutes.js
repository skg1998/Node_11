const express = require('express');
const postController = require('../controller/postController');

const router = express.Router();

router
    .route("/")
    .get(postController.getAllPost)
    .post(postController.createPost);
router
    .route("/:id")
    .get(postController.getOnePost)
    .patch(postController.updatePost)
    .delete(postController.deletePost)


module.exports = router;