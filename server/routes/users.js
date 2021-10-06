const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

// UPDATE USER
router.put("/:id", async (request, response) => {
    if(request.body.userId === request.params.id || request.body.isAdmin)
    {
        if(request.body.password)
        {
            try {
                const salt = await bcrypt.genSalt(10);
                request.body.password = await bcrypt.hash(request.body.password, salt);
            } catch (error) {
                return response.status(500).json(error);
            } 
        }
        try {
            const user = await User.findByIdAndUpdate(request.params.id, {
                $set: request.body,
            });
            return response.status(200).json("User details has been updated");
        } catch (error) {
            return response.status(500).json(error);
        } 
    } else {
        return response.status(403).json("Can't update that");
    }
});

// DELETE USER
router.delete("/:id", async (request, response) => {
    if(request.body.userId === request.params.id || request.body.isAdmin)
    {
        try {
            await User.findByIdAndDelete(request.params.id);
            return response.status(200).json("User details has been deleted");
        } catch (error) {
            return response.status(500).json(error);
        } 
    } else {
        return response.status(403).json("Can't delete that");
    }
});

// GET USER
router.get("/:id", async (request, response) => {
    try {
        const user = await User.findById(request.params.id);
        const {password, updatedAt, ... other} = user._doc;
        return response.status(200).json(other);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET USER BY NAME
router.get("/user/:username", async (request, response) => {
    try {
        const user = await User.findOne({ username: request.params.username });
        const {password, updatedAt, ... other} = user._doc;
        return response.status(200).json(other);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// FOLLOW USER 
router.put("/:id/follow", async (request, response) => {
    if(request.body.userId !== request.params.id)
    {
        try {
            const user = await User.findById(request.params.id);
            const follower = await User.findById(request.body.userId);
            if(!user.followers.includes(request.body.userId))
            {
                await user.updateOne( { $push: { followers: request.body.userId } } );
                await follower.updateOne( { $push: { followins: request.params.id } } );
                return response.status(200).json("User has been followed");
            } else {
                return response.status(403).json("You already are following this person");
            }
        } catch(error) {
            return response(500).json(error);
        }
    } else {
        return response.status(403).json("You can't follow yourself");
    }
});

// UNFOLLOW USER 
router.put("/:id/unfollow", async (request, response) => {
    if(request.body.userId !== request.params.id)
    {
        try {
            const user = await User.findById(request.params.id);
            const follower = await User.findById(request.body.userId);
            if(user.followers.includes(request.body.userId))
            {
                await user.updateOne( { $pull: { followers: request.body.userId } } );
                await follower.updateOne( { $pull: { followins: request.params.id } } );
                return response.status(200).json("User has been unfollowed");
            } else {
                return response.status(403).json("You already are not following this person");
            }
        } catch(error) {
            return response(500).json(error);
        }
    } else {
        return response.status(403).json("You can't unfollow yourself");
    }
});

// SEND USER FRIEND REQUEST 
router.put("/:id/sendfriendrequest", async (request, response) => {
    if(request.body.userId !== request.params.id)
    {
        try {
            const user = await User.findById(request.params.id);
            if(!user.requests.includes(request.body.userId))
            {
                await user.updateOne( { $push: { requests: request.body.userId } } );
                return response.status(200).json("Sent friend request");
            } else {
                return response.status(403).json("You already sent this user a friend request");
            }
        } catch(error) {
            return response(500).json(error);
        }
    } else {
        return response.status(403).json("You can't add yourself");
    }
});

// DELETE FRIEND REQUEST TO USER 
router.put("/:id/deletefriendrequest", async (request, response) => {
    if(request.body.userId !== request.params.id)
    {
        try {
            const user = await User.findById(request.params.id);
            if(user.requests.includes(request.body.userId))
            {
                await user.updateOne( { $pull: { requests: request.body.userId } } );
                return response.status(200).json("Friend request removed");
            } else {
                return response.status(403).json("You don't have a friend request sent to this user");
            }
        } catch(error) {
            return response(500).json(error);
        }
    } else {
        return response.status(403).json("How did you even get here");
    }
});


// ACCEPT FRIEND REQUEST
router.put("/:id/acceptfriendrequest", async (request, response) => {
    if(request.body.userId !== request.params.id)
    {
        try {
            const user = await User.findById(request.params.id);
            const requester = await User.findById(request.body.userId);
            if(user.friends.includes(request.body.userId)) 
            {
                return response.status(403).json("You already have this user as a friend");
            }
            if(user.requests.includes(request.body.userId))
            {
                await user.updateOne( { $pull: { requests: request.body.userId } } );
                await user.updateOne( { $push: { friends: request.body.userId } } );
                await requester.updateOne( { $push: { friends: request.params.id } } );
                return response.status(200).json("Friend accepted");
            } else {
                return response.status(403).json("You don't have a friend request sent from this user");
            }
        } catch(error) {
            return response(500).json(error);
        }
    } else {
        return response.status(403).json("How did you even get here");
    }
});

//  DENY FRIEND REQUEST
router.put("/:id/denyfriendrequest", async (request, response) => {
    if(request.body.userId !== request.params.id)
    {
        try {
            const user = await User.findById(request.params.id);
            if(user.friends.includes(request.body.userId)) 
            {
                return response.status(403).json("You already have this user as a friend");
            }
            if(user.requests.includes(request.body.userId))
            {
                await user.updateOne( { $pull: { requests: request.body.userId } } );
                return response.status(200).json("Friend denied");
            } else {
                return response.status(403).json("You don't have a friend request sent from this user");
            }
        } catch(error) {
            return response(500).json(error);
        }
    } else {
        return response.status(403).json("How did you even get here");
    }
});

//  REMOVE FRIEND
router.put("/:id/removefriend", async (request, response) => {
    if(request.body.userId !== request.params.id)
    {
        try {
            const user = await User.findById(request.params.id);
            const requester = await User.findById(request.body.userId);
            if(user.friends.includes(request.body.userId))
            {
                await user.updateOne( { $pull: { friends: request.body.userId } } );
                await requester.updateOne( { $pull: { friends: request.params.id } } );
                return response.status(200).json("Friend removed");
            } else {
                return response.status(403).json("You already don't have this user as a friend");
            }
        } catch(error) {
            return response(500).json(error);
        }
    } else {
        return response.status(403).json("You can't remove yourself");
    }
});

// GET USER FRIENDS 
router.get("/:id/friends", async(request, response) => {
    try {
        const user = await User.findById(request.params.id); 
        const friends = await Promise.all(
            user.friends.map( async(friendId) => {
                const friend = await User.findById(friendId);
                return friend;
            }),
        )
        return response.status(200).json(friends);
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;