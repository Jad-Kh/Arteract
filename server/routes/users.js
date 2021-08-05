const router = require('express').Router();

app.get("/",(request, response) => {
    response.send("Welcome to homepage");
})

module.exports = router;