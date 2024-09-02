const express = require("express");
const app = express();

// Establishing URL & JSON Parsers

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection Setup

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectionString = "mongodb+srv://Admin-Mitadru:DB1234@clustermg.e4fjgoy.mongodb.net/blogDB?retryWrites=true&w=majority&appName=ClusterMG";

async function main(){
    await mongoose.connect(connectionString);
}

main().catch((error) => console.log(error));

// Express Session Setup

const session = require("express-session"); // Dependency used in the background by passport.js
const MongoStore = require("connect-mongo");

const sessionStore = MongoStore.create({ mongoUrl: connectionString, collectionName: "sessions" });

app.use(session(
    { 
        secret: "randomSecret", 
        
        resave: true,
        saveUninitialized: false,

        store: sessionStore,
        cookie: { maxAge: 1000 * 60 } // Expiration: 1 minute
    }
));

// Authentication Utility

const passport = require("passport");
require("./passport/config");

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