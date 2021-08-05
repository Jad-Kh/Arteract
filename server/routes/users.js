const router = require('express').Router();

router.get("/",(request, response) => {
    response.send("Welcome to homepage");
})

module.exports = router;