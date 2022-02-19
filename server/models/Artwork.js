const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
   artistId: {
       type: String,
       required: true
   },
   title: {
       type: String,
       required: true
   },
   description: {
       type: String,
       default: ""
   },
   picture: {
       type: String,
       default: ""
   },
   status: {
       type: String,
       default: ""
   },
   price: {
       type: Number,
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

module.exports = mongoose.model("Artwork", artworkSchema);