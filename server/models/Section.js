const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
   artistId: {
       type: String,
       required: true
   },
   title: {
       type: String,
       required: true,
       default: ""
   },
   type: {
       type: String,
       required: true,
       default: ""
   },
   artworks: {
        type: Array,
        default: []
    },
},
{
    timestamps: true
});

module.exports = mongoose.model("Section", sectionSchema);