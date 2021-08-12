const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        min: 2,
        max: 20,
        unique: true
    },
    email: {
        type: String,
        required: true,
        max: 75,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    profilePicture: {
        type: String,
        default: ""
    },
    coverPicture: {
        type: String,
        default: ""
    },
    friends: {
        type: Array,
        default:[]
    },
    requests: {
        type: Array,
        default:[]
    },
    followers: {
        type: Array,
        default:[]
    },
    followins: {
        type: Array,
        default:[]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
        max: 50
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("User", userSchema);