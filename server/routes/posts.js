const router = require('express').Router();
const Post = require("../models/Post");
const User = require('../models/User');

// CREATE POST
router.post("/", async (request, response) => {
    try {
        const post = new Post(request.body);
        const create = await post.save();
        return response.status(200).json(create);
    } catch (error) {
        return response.status(500).json(error);
    }
});

// UPDATE POST
router.put("/:id", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if(post.userId === request.body.userId) 
        {
            await post.updateOne({$set: request.body});
            return response.status(200).json("post has been updated");
        } else {
            return response.status(403).json("That post is not yours!")
        }
    } catch(error) {
        return response.status(500).json(error);
    }
});

// DELETE POST
router.delete("/:id", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if(post.userId === request.body.userId) 
        {
            await post.deleteOne();
            return response.status(200).json("post has been deleted");
        } else {
            return response.status(403).json("That post is not yours!")
        }
    } catch(error) {
        return response.status(500).json(error);
    }
});


// LIKE POST
router.put("/:id/like", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post.likes.includes(request.body.userId))
        {
            await post.updateOne({ $push: { likes: request.body.userId }});
            if(post.dislikes.includes(request.body.userId))
            {
                await post.updateOne({ $pull: { dislikes: request.body.userId }});
            }
            return response.status(200).json("post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: request.body.userId }});
            return response.status(200).json("like has been removed on this post");
        }
    } catch(error) {
        return response.status(500).json(error);
    }
});

// DISLIKE POST
router.put("/:id/dislike", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post.dislikes.includes(request.body.userId))
        {
            await post.updateOne({ $push: { dislikes: request.body.userId }});
            if(post.likes.includes(request.body.userId))
            {
                await post.updateOne({ $pull: { likes: request.body.userId }});
            }
            return response.status(200).json("post has been disliked");
        } else {
            await post.updateOne({ $pull: { dislikes: request.body.userId }});
            return response.status(200).json("dislike has been removed on this post");
        }
    } catch(error) {
        return response.status(500).json(error);
    }
});

// FAVORITE POST
router.put("/:id/favorite", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        if (!post.likes.includes(request.body.userId))
        {
            await post.updateOne({ $push: { favorites: request.body.userId }});
            if(post.dislikes.includes(request.body.userId))
            {
                await post.updateOne({ $pull: { dislikes: request.body.userId }});
            }
            return response.status(200).json("post has been added to favorites");
        } else {
            await post.updateOne({ $pull: { favorites: request.body.userId }});
            return response.status(200).json("post has been removed from favorites");
        }
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET POST 
router.get("/:id", async(request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        response.status(200).json(post);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET POSTS OF USER 
router.get("/profile/:id", async(request, response) => {
    try {
        const posts = await Post.find({ userId: request.params.id });
        return response.status(200).json(posts);
    } catch(error) {
        return response.status(500).json(error);
    }
});


// GET ACTIVITY POST
router.get("/activity/:userId", async(request, response) => {
    try {
        const user = await User.findById(request.params.userId);
        const posts = await Post.find({ userId: user._id });
        const otherPosts = await Promise.all(
            user.friends.map( async(friendId) => {
                const friendPost = await Post.find({ userId: friendId });
                if(friendPost.length != 0) {
                    friendPost.map((post) => {
                        posts.push(post);
                    });
                }
            }),
            user.followins.map( async(followinId) => {
                const followinPost = await Post.find({ userId: followinId });
                if(followinPost.length != 0) {
                    followinPost.map((post) => {
                        posts.push(post);
                    });
                }
            })
        )   
        return response.status(200).json(posts);
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;