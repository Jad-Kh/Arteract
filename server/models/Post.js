const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   userId: {
       type: String,
       required: true
   },
   description: {
        type: String,
        max: 500
   },
   image: {
        type: String,
   },
   likes: {
       type: Array,
       default: []
   },
   dislikes: {
       type: Array,
       default: []
   },
   favorites: {
        type: Array,
        default: []
   },
   comments: {
        type: Array,
        default: [],
        timestamps: true
   },
},
{
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema);