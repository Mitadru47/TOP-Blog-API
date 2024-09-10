const express = require("express");
const app = express();

// Loading .env file contents into process.env
require("dotenv").config();

// Establishing URL & JSON Parsers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection Setup

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

async function main(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
}

main().catch((error) => console.log(error));

// Express Session Setup

const session = require("express-session"); // Dependency used in the background by passport.js
const MongoStore = require("connect-mongo");

const sessionStore = MongoStore.create({ mongoUrl: process.env.DB_CONNECTION_STRING, collectionName: "sessions" });

app.use(session(
    { 
        secret: process.env.SECRET, 
        
        resave: true,
        saveUninitialized: false,

        store: sessionStore,
        cookie: { maxAge: 1000 * 60 } // Expiration: 1 minute
    }
));

// Authentication Utility

const passport = require("passport");
require("./passport/config")(passport);   // Passing the Global Passport Object to /passport/config.js

app.use(passport.session());

// Routing

const cors = require("cors");   
app.use(cors());

const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");

app.use("/index", indexRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {res.status(200).json("Welcome!")});

module.exports = app;