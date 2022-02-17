const router = require("express").Router();
const Portfolio = require("../models/Portfolio");
const Section = require("../models/Section");

// CREATE PORTFOLIO
router.post("/", async(request, response) => {
    const newPortfolio = new Portfolio(request.body);
    newPortfolio.types = newPortfolio.types.filter((type) => type === "");
    try {
        const portfolio = await newPortfolio.save();
        return response.status(200).json(portfolio);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// ADD SECTION
router.put("/section", async(request, response) => {
    const newSection = new Section(request.body);
    const portfolio = await Portfolio.find({ artistId: request.body.artistId });
    try {
        const section = await newSection.save();
        await portfolio.updateOne( { $push: { sections: section } } );
        return response.status(200).json(section);           
    } catch(error) {
        return response.status(500).json(error);
    }
});

// UPDATE PORTFOLIO
router.put("/:id", async(request, response) => {
    try {
        const portfolio = await Portfolio.findByIdAndUpdate(request.params.id, {
            $set: request.body,
        });
        return response.status(200).json(portfolio);
    } catch(error) {
        return response.status(500).json(error);
    }
});

// DELETE PORTFOLIO
router.delete("/:id", async(request, response) => {
    try {
        await Portfolio.findByIdAndDelete(request.params.id);
        return response.status(200).json("Portfolio has been deleted");
    } catch(error) {
        return response.status(500).json(error);
    }
});

// GET PORTFOLIO BY ARTIST
router.get("/artist/:artistId", async(request, response) => {
    try {
        const portfolio = await Portfolio.findOne({ artistId: request.params.artistId });
        return response.status(200).json(portfolio)
    } catch(error) {
        return response.status(500).json(error);
    }
});

module.exports = router;