const router = require("express").Router();
const Message = require("../models/Message");

// ADD MESSAGE
router.post("/", async(request, response) => {
    const newMessage = new Message(request.body);
    try {
        const message = await newMessage.save();
        return response.status(200).json(message);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET CONVERSATION MESSAGES
router.get("/:conversationId", async(request, response) => {
    try {
        const messages = await Message.find({
            conversationId: request.params.conversationId,
        });
        return response.status(200).json(messages);
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;