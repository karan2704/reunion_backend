const express = require("express")
const User = require("../models/userSchema")

const userRouter = express.Router()

userRouter.get("/:user", (req, res) => {
    const userId = req.params.user
    User.findById(userId, (err, user) => {
        if(err){
            console.log(err)
            res.status(500).send("Internal server error")
        }else{
            if(!user){
                res.status(404).send("User with the given id not found")
            }else{
                res.status(200).json({
                    username: user.username,
                    followers: user.followers.length,
                    following: user.following.length
                })
            }
        }
    })
});

userRouter.post("/follow/:id", (req, res) => {
    authenticatedUser = req.user.user_id
    toFollow = req.params.id

    var updatedFollowers = {};
    var updatedFollowing = {};
    User.findOneAndUpdate({_id: toFollow}, {$push: {'followers': authenticatedUser}}, {new: true}, (err, user1) => {
        if(err){
            console.log(err)
            res.status(500).send("Internal server error")
        }else{
            console.log(user1)
            updatedFollowers = user1
        }
    })

    User.findOneAndUpdate({_id: authenticatedUser}, {$push: {'following': toFollow}}, {new: true}, (error, user2) => {
        if(error){
            console.log(err)
            res.status(500).send("Internal server error")
        }else{
            console.log(user2)
            updatedFollowing = user2
        }
    })
    // const updatedFollowing = User.findOneAndUpdate(authenticatedUser, {$push: {'following': toFollow}}, {new: true})
    if(!updatedFollowers || !updatedFollowing){
        res.status(500).send("Could not follow user with the give ID")
    }else{
        res.status(200).send("Following user")
    }
})

userRouter.post("/unfollow/:id", async(req, res) => {
    authenticatedUser = req.user.user_id
    toUnfollow = req.params.id

    var updatedFollowers = {};
    var updatedFollowing = {};
    User.findOneAndUpdate({_id: toUnfollow}, {$pull: {'followers': authenticatedUser}}, {new: true}, (err, user1) => {
        if(err){
            console.log(err)
            res.status(500).send("Internal server error")
        }else{
            console.log(user1)
            updatedFollowers = user1
        }
    })

    User.findOneAndUpdate({_id: authenticatedUser}, {$pull: {'following': toUnfollow}}, {new: true}, (error, user2) => {
        if(error){
            console.log(err)
            res.status(500).send("Internal server error")
        }else{
            console.log(user2)
            updatedFollowing = user2
        }
    })

    if(!updatedFollowers || !updatedFollowing){
        res.status(500).send("Could not unfollow user with the give ID")
    }else{
        res.status(200).send("Unfollowed user")
    }
})

module.exports = userRouter;