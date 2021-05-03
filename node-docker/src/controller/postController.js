const Post = require('../modal/postModal');

const getAllPost = async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            status: "succes",
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}

const getOnePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json({
            status: "succes",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}

const createPost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        const data = {
            title: title,
            body: body
        }
        const post = await Post.create(data);
        res.status(200).json({
            status: "succes",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}

const updatePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "succes",
            data: {
                post
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}

const deletePost = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "succes",
            data: null
        })
    } catch (e) {
        res.status(400).json({
            status: "fail"
        })
    }
}

module.exports = {
    getAllPost,
    getOnePost,
    createPost,
    updatePost,
    deletePost
}