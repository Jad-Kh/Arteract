const router = require("express").Router();
const Conversation = require("../models/Conversation");

// ADD CONVERSATION
router.post("/", async(request, response) => {
    const newConversation = new Conversation({
        members: [request.body.senderId, request.body.receiverId],
    });
    try {
        const conversation = await newConversation.save();
        return response.status(500).json(conversation);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET CONVERSATIONS OF A USER
router.get("/:userId", async(request, response) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [request.params.userId] },
        });
        return response.status(200).json(conversation);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET CONVERSATION BETWEEN TWO USERS
router.get("/chat/:firstUserId/:secondUserId", async(request, response) => {
    try {
        const conversation = await Conversation({
            members: { $all: [request.params.firstUserId, request.params.secondUserId] },
        });
        return response.status(200).json(conversation);
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;