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

dotenv.config();

mongoose.connect(
      process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    () => {
        console.log("Connected to MongoDB")
    }
);

app.use("/assets/avatars", express.static(path.join(__dirname, "public/assets/avatars")));
app.use("/assets/backgrounds", express.static(path.join(__dirname, "public/assets/backgrounds")));
app.use("/assets/posts", express.static(path.join(__dirname, "public/assets/posts"))); // telling the API, don't make a GET request when "/assets" is requested, but just go to that directory
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
        cb(null, "public/assets/posts");
    },
    filename: (request, file, cb) => {
        cb(null, (Date.now() + file.originalname).slice(0,9) + (Date.now() + file.originalname).slice(-4));
    }
});

const avatarUpload = multer({avatarStorage});
app.post("/api/uploadavatar", avatarUpload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully");
    } catch(error) {
        console.log(error);
    }
});

const backgroundUpload = multer({backgroundStorage});
app.post("/api/uploadbackground", backgroundUpload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully");
    } catch(error) {
        console.log(error);
    }
});

const postUpload = multer({postStorage});
app.post("/api/uploadpost", postUpload.single("file"), (request, response) => {
    try {
        return response.status(200).json("File uploaded successfully");
    } catch(error) {
        console.log(error);
    }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Running Backend!");
});