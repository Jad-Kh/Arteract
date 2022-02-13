const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
   artistId: {
       type: String,
       required: true
   },
   coverPicture: {
       type: String,
       default: ""
   },
   sections: {
       type: Array,
       default: []
   },
},
{
    timestamps: true
});

module.exports = mongoose.model("Portfolio", portfolioSchema);