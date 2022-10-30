const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created: {
        type: mongoose.Schema.Types.Date,
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
    }],
    comments: [{
        type: String
    }]
})

module.exports = mongoose.model('Post', postSchema)