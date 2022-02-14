const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const multer = require('multer');
const path = require("path");

const authRoute = require('../server/routes/auth.js');
const userRoute = require('../server/routes/users.js');
const postRoute = require('../server/routes/posts.js');
const messageRoute = require('../server/routes/messages.js');
const conversationRoute = require('../server/routes/conversations.js');
const artworkRoute = require('../server/routes/artworks.js');
const orderRoute = require('../server/routes/orders.js');
const portfolioRoute = require('../server/routes/portfolios.js');
const sectionRoute = require('../server/routes/sections.js');
const storesRoute = require('../server/routes/stores.js');

dotenv.config();

mongoose.connect(
      process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => {
        console.log("Connected to MongoDB")
    }
);

app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use("/assets/avatars", express.static(path.join(__dirname, "public/assets/avatars")));
app.use("/assets/backgrounds", express.static(path.join(__dirname, "public/assets/backgrounds")));
app.use("/assets/posts/", express.static(path.join(__dirname, "public/assets/posts/"))); 
app.use("/assets/artworks/", express.static(path.join(__dirname, "public/assets/artworks/"))); 
// telling the API, don't make a GET request when "/assets" is requested, but just go to that directory
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

const avatarStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "public/assets/avatars");
    },
    filename: (request, file, cb) => {
        cb(null, (Date.now() + file.originalname).slice(0,9) + (Date.now() + file.originalname).slice(-4));
    }
});

const backgroundStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "public/assets/backgrounds");
    },
    filename: (request, file, cb) => {
        cb(null, (Date.now() + file.originalname).slice(0,9) + (Date.now() + file.originalname).slice(-4));
    }
});

const postStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "public/assets/posts/");
    },
    filename: (request, file, cb) => {
        cb(null, (Date.now() + file.originalname).slice(0,9) + (Date.now() + file.originalname).slice(-4));
    }
});

const artworkStorage = multer.diskStorage({
    destination: (request, file, cb) => {
        cb(null, "public/assets/artworks/");
    },
    filename: (request, file, cb) => {
        cb(null, (Date.now() + file.originalname).slice(0,9) + (Date.now() + file.originalname).slice(-4));
    }
});

const avatarUpload = multer({storage: avatarStorage});
const backgroundUpload = multer({storage: backgroundStorage});
const postUpload = multer({storage: postStorage});
const artworkUpload = multer({storage: artworkStorage});

app.post("/api/uploadavatar", avatarUpload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully");
    } catch(error) {
        console.log(error);
    }
});


app.post("/api/uploadbackground", backgroundUpload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully");
    } catch(error) {
        console.log(error);
    }
});

app.post("/api/uploadpost", postUpload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully");
    } catch(error) {
        console.log(error);
    }
});

app.post("/api/uploadartwork", artworkUpload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully");
    } catch(error) {
        console.log(error);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/messages", messageRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/artworks", artworkRoute);
app.use("/api/orders", orderRoute);
app.use("/api/portfolios", portfolioRoute);
app.use("/api/sections", sectionRoute);
app.use("/api/stores", storesRoute);

app.listen(8800, () => {
    console.log("Running Backend!");
});