const router = require("express").Router();
const Store = require("../models/store");
const Section = require("../models/Section");

// CREATE STORE
router.post("/new", async(request, response) => {
    const newStore = new Store(request.body);
    try {
        const store = await newStore.save();
        return response.status(200).json(store);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// ADD SECTION
router.put("/section", async(request, response) => {
    const newSection = new Section(request.body);
    const store = await find({ artistId: request.body.artistId });
    try {
        const section = await newSection.save();
        await store.updateOne( { $push: { sections: section } } );
        return response.status(200).json(section);           
    } catch(error) {
        return response.status(500).json(error);
    }
});

// UPDATE STORE
router.put("/:id", async(request, response) => {
    try {
        const store = await store.findByIdAndUpdate(request.params.id, {
            $set: request.body,
        });
        return response.status(200).json(store);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// DELETE STORE
router.delete("/:id", async(request, response) => {
    try {
        await Store.findByIdAndDelete(request.params.id);
        return response.status(200).json("store has been deleted");
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;