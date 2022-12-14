const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    } 
})

module.exports = mongoose.model('Comment', commentSchema)