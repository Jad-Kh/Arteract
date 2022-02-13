const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
   artistId: {
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
       type: String,
       default: ""
   },
   sections: {
       type: Array,
       default: []
   },
   comments: {
       type: String,
       default: ""
   },
},
{
    timestamps: true
});

module.exports = mongoose.model("Artwork", artworkSchema);