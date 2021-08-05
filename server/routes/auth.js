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

module.exports = router;