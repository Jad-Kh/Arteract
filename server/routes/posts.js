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

// COMMENT ON POST
router.put("/:id/comment", async (request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        const comment = { userId: request.body.userId, text: request.body.text, timestamp: request.body.timestamp }
        await post.updateOne({ $push: { comments: comment }});
        return response.status(200).json(comment);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET POST 
router.get("/:id", async(request, response) => {
    try {
        const post = await Post.findById(request.params.id);
        return response.status(200).json(post);
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

const array = ["6192951ce37e7d53188bd69a",
"6192951de37e7d53188bd69c",
"6192951de37e7d53188bd69e",
"6192951de37e7d53188bd6a0",
"6192951ee37e7d53188bd6a2",
"6192951ee37e7d53188bd6a4",
"6192951ee37e7d53188bd6a6",
"6192951ee37e7d53188bd6a8",
"6192951ee37e7d53188bd6aa",
"6192951fe37e7d53188bd6ac",
"6192951fe37e7d53188bd6ae",
"6192951fe37e7d53188bd6b0",
"61929520e37e7d53188bd6b2",
"61929520e37e7d53188bd6b4",
"61929520e37e7d53188bd6b6",
"61929520e37e7d53188bd6b8",
"61929520e37e7d53188bd6ba",
"61929520e37e7d53188bd6bc",
"61929521e37e7d53188bd6be",
"61929521e37e7d53188bd6c0",
"61929521e37e7d53188bd6c2",
"61929522e37e7d53188bd6c4",
"61929522e37e7d53188bd6c6",
"61929523e37e7d53188bd6c8",
"61929523e37e7d53188bd6ca",
"61929523e37e7d53188bd6cc",
"61929524e37e7d53188bd6ce",
"61929524e37e7d53188bd6d0",
"61929524e37e7d53188bd6d2",
"61929524e37e7d53188bd6d4",
"61929524e37e7d53188bd6d6",
"61929525e37e7d53188bd6d8",
"61929525e37e7d53188bd6da",
"61929525e37e7d53188bd6dc",
"61929526e37e7d53188bd6de",
"61929526e37e7d53188bd6e0",
"61929526e37e7d53188bd6e2",
"61929527e37e7d53188bd6e4",
"61929527e37e7d53188bd6e6",
"61929527e37e7d53188bd6e8",
"61929528e37e7d53188bd6ea",
"61929528e37e7d53188bd6ec",
"61929528e37e7d53188bd6ee",
"61929528e37e7d53188bd6f0",
"61929529e37e7d53188bd6f2",
"61929529e37e7d53188bd6f4",
"61929529e37e7d53188bd6f6",
"6192952ae37e7d53188bd6f8",
"6192952ae37e7d53188bd6fa",
"6192952ae37e7d53188bd6fc",
"6192952ae37e7d53188bd6fe",
"6192952be37e7d53188bd700",
"6192952be37e7d53188bd702",
"6192952ce37e7d53188bd704",
"6192952ce37e7d53188bd706",
"6192952ce37e7d53188bd708",
"6192952de37e7d53188bd70a",
"6192952de37e7d53188bd70c",
"6192952de37e7d53188bd70e",
"6192952de37e7d53188bd710",
"6192952de37e7d53188bd712",
"6192952ee37e7d53188bd714",
"6192952ee37e7d53188bd716",
"6192952ee37e7d53188bd718",
"6192952ee37e7d53188bd71a",
"6192952ee37e7d53188bd71c",
"6192952fe37e7d53188bd71e",
"6192952fe37e7d53188bd720",
"6192952fe37e7d53188bd722",
"6192952fe37e7d53188bd724",
"61929530e37e7d53188bd726",
"61929530e37e7d53188bd728",
"61929530e37e7d53188bd72a",
"61929531e37e7d53188bd72c",
"61929531e37e7d53188bd72e",
"61929531e37e7d53188bd730",
"61929531e37e7d53188bd732",
"61929532e37e7d53188bd734",
"61929532e37e7d53188bd736",
"61929532e37e7d53188bd738",
"61929533e37e7d53188bd73a",
"61929533e37e7d53188bd73c",
"61929533e37e7d53188bd73e",
"61929533e37e7d53188bd740",
"61929534e37e7d53188bd742",
"61929534e37e7d53188bd744",
"61929534e37e7d53188bd746",
"61929535e37e7d53188bd748",
"61929535e37e7d53188bd74a",
"61929535e37e7d53188bd74c"];

router.post("/random", async (request, response) => {
    let counter = 127;
    try {
        for(let i=34 ; i<45; i++)
        {
            const post = new Post({
                userId: array[i],
                description: "",
                image: "post" + counter + ".jpg"
            });
            const create = await post.save();
            counter++;
        }
        return response.status(200).json(create);
    } catch (error) {
        return response.status(500).json(error);
    }
});

module.exports = router;