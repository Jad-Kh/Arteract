const router = require("express").Router();
const Section = require("../models/Section");
const Artwork = require("../models/Artwork");

// UPDATE SECTION
router.put("/:id", async(request, response) => {
    try {
        const section = await Section.findByIdAndUpdate(request.params.id, {
            $set: request.body,
        });
        return response.status(200).json(section);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// DELETE SECTION
router.delete("/:id", async(request, response) => {
    try {
        await Section.findByIdAndDelete(request.params.id);
        return response.status(200).json("Portfolio has been deleted");
    } catch(error) {
        return response.status(500).json(error);
    }
});1

// ADD ARTWORK TO SECTION
router.put("/:id/add", async(request, response) => {
    try {
        const artwork = Artwork.findById(request.body.id);
        const section = Section.findById(request.params.id);
        await artwork.updateOne( { $push: { sections: request.params.id } } );
        await section.updateOne( { $push: { artworks: request.body.id } } );
        return response.status(200).json("Added");
    } catch(error) {
        return response.status(500).json(error);
    }    
});

// REMOVE ARTWORK FROM SECTION
router.put("/:id/remove", async(request, response) => {
    try {
        const artwork = Artwork.findById(request.body.id);
        const section = Section.findById(request.params.id);
        await artwork.updateOne( { $pull: { sections: request.params.id } } );
        await section.updateOne( { $pull: { artworks: request.body.id } } );
        return response.status(200).json("Added");
    } catch(error) {
        return response.status(500).json(error);
    }    
});

module.exports = router;