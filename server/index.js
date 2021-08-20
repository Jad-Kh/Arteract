const express = require('express');
const app = express();

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoute = require('../server/routes/auth.js');
const userRoute = require('../server/routes/users.js');
const postRoute = require('../server/routes/posts.js')

dotenv.config();

mongoose.connect(
      process.env.MONGO_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true }, 
    ()=> {
        console.log("Connected to MongoDB")
    }
);

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.listen(8800, () => {
    console.log("Running Backend!");
})