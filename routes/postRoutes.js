const express = require("express")
const Post = require("../models/postSchema")
const Comment = require("../models/commentSchema")

const postRouter = express.Router()

postRouter.post("/posts", (req, res) => {
    const {title, description} = req.body
    const user = req.user
    const newPost = new Post({
        user: user.user_id,
        title,
        description,
        created: new Date(),
        likes: [],
        comments: [],
    })

    newPost.save((err, post) => {
        if(err){
            res.status(500).send("Could not save the post")
        }else{
            res.status(200).json({
                id: post._id,
                title: post.title,
                description: post.description,
                time: post.created
            })
        }
    })
})

postRouter.delete("/posts/:id", (req, res)=>{
    postId = req.params.id
    Post.findByIdAndDelete(postId, (err, post) => {
        if(err){
            res.status(500).send("Could not delete post")
        }else{
            if(!post){
                res.status(404).send("Post of the given id not found")
            }else{
                res.status(200).json(post)
            }
        }
    })
})

postRouter.post("/like/:id", (req, res) => {
    const postId = req.params.id
    const userId = req.user.user_id
    Post.findByIdAndUpdate(postId, {$push: {'likes': userId}}, {new: true}, (err, post) => {
        if(err){
            res.status(500).send("Could not like the post")
        }else{
            if(!post){
                res.status(404).send("Post does not exist")
            }else{
                res.status(200).send("You liked the post")
            }
        }
    })
})

postRouter.post("/unlike/:id", (req, res) => {
    const postId = req.params.id
    const userId = req.user.user_id
    Post.findByIdAndUpdate(postId, {$pull: {'likes': userId}}, {new: true}, (err, post) => {
        if(err){
            res.status(500).send("Could not like the post")
        }else{
            if(!post){
                res.status(404).send("Post does not exist")
            }else{
                res.status(200).send("You unliked the post")
            }
        }
    })
})

postRouter.post("/comment/:id", (req, res) => {
    const {comment} = req.body
    const commentObject = new Comment({
        comment,
        user: req.user.user_id,
        post: req.params.id
    })
    commentObject.save((err, doc) => {
        if(err){
            res.status(500).send("Could not save the comment")
        }else{
            Post.findByIdAndUpdate(doc.post, {$push: {'comments': doc.comment}}, (err, response) => {
                if(err){
                    res.status(500).send("Internal server error")
                }else{
                    res.status(200).send(doc._id)                    
                }
            })
        }
    })
})

postRouter.get("/posts/:id", (req, res)=>{
    const postId = req.params.id
    Post.findById(postId, (err, post) => {
        if(err){
            res.status(500).send("Internal server error")
        }else{
            if(!post){
                res.status(404).send("Post not found")
            }else{
                res.status(200).json({
                    id: postId,
                    likes: post.likes.length,
                    comments: post.comments.length
                })
            }
        }
    })
})

postRouter.get("/posts/allposts", (req, res) => {
    userId = req.user.user_id
    console.log(userId)
    Post.find({user: userId}, (err, posts) => {
        if(err){
            console.log(err);
            res.status(500).send("Internal server error")
        }else{
            if(!posts){
                res.status(404).send("Post not found")
            }else{
                console.log(posts)
                res.status(200).json(posts)
            }
        }
    })
})


module.exports = postRouter