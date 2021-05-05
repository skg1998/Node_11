const express = require('express');
const postController = require('../controller/postController');
const { hasAuthorization } = require('../middleware/authMiddleware')

const router = express.Router();

router
    .route("/")
    .get(postController.getAllPost)
    .post(hasAuthorization, postController.createPost);

router
    .route("/:id")
    .get(postController.getOnePost)
    .patch(hasAuthorization, postController.updatePost)
    .delete(hasAuthorization, postController.deletePost)


module.exports = router;