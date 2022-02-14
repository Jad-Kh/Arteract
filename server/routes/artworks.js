const router = require("express").Router();
const Artwork = require("../models/Artwork");

// ADD ARTWORK
router.post("/new", async(request, response) => {
    const newArtwork = new Artwork(request.body);
    try {
        const artwork = await newArtwork.save();
        return response.status(200).json(artwork);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// UPDATE ARTWORK
router.put("/:id", async(request, response) => {
    try {
        const artwork = await Artwork.findByIdAndUpdate(request.params.id, {
            $set: request.body,
        });
        return response.status(200).json(artwork);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// DELETE ARTWORK
router.delete("/:id", async(request, response) => {
    try {
        await Artwork.findByIdAndDelete(request.params.id);
        return response.status(200).json("store has been deleted");
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;