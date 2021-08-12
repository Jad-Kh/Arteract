const router = require('express').Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

router.post("/register", async (request, response) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(request.body.password, salt);

        const user = new User({
            username: request.body.username,
            email: request.body.email,
            password:  hashedPassword
        });

        const register = await user.save();
        response.send(200).json(register);
    } catch(error) {
        console.log(error);
    }
});

router.post("/login", async (request, response) => {
    try {
        const user = await User.findOne({email: request.body.email});
        !user && response.status(404).json("user not found");

        const validPassword = await bcrypt.compare(request.body.password, user.password);
        !validPassword && response.status(400).json("wrong password");

        response.send(200).json(user);
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;