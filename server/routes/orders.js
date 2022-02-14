const router = require("express").Router();
const Artwork = require("../models/Artwork");
const User = require("../models/User");

// ADD ORDER
router.post("/:artistId/:clientId", async(request, response) => {
    const newOrder = new Order(request.body);
    const artist = await findById(request.params.artistId);
    const client = await findById(request.params.clientId);
    try {
        const order = await newOrder.save();
        await artist.updateOne( { $push: { orders: order }});
        await client.updateOne( { $push: { orders: order }}); 
        return response.status(200).json(order);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// UPDATE ARTWORK
router.put("/:id", async(request, response) => {
    try {
        const order = await Order.findByIdAndUpdate(request.params.id, {
            $set: request.body,
        });
        return response.status(200).json(order);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// DELETE ARTWORK
router.delete("/:id", async(request, response) => {
    try {
        await Order.findByIdAndDelete(request.params.id);
        return response.status(200).json("store has been deleted");
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;