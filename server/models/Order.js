const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
   artistId: {
       type: String,
       required: true 
   },
   clientId: {
       type: String,
       required: true
   },
   price: {
       type: Number,
       required: true
   },
   status: {
       type: String,
       required: true,
   }
},
{
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);