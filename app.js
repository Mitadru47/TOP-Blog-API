const express = require("express");
const app = express();

// Establishing URL Parser
app.use(express.urlencoded({ extended: false }));

// MongoDB Connection Setup

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectionString = "mongodb+srv://Admin-Mitadru:DB1234@clustermg.e4fjgoy.mongodb.net/blogDB?retryWrites=true&w=majority&appName=ClusterMG";

async function main(){
    await mongoose.connect(connectionString);
}

main().catch((error) => console.log(error));

// Passport Authentication Setup

const passport = require("passport");
const session = require("express-session"); // Dependency used in the background by passport.js

app.use(session({ secret: "randomSecret", resave: false, saveUninitialized: true }));
app.use(passport.session());

// Function 1: Setting Up LocalStrategy

const User = require("./models/user");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
    new LocalStrategy(async (username, password, done) => {

        try{
     
            const user = await User.findOne({ username: username }).exec();

            if(user.username !== username)
                return done(null, false, { message: "Incorrect Username" });

            if(user.password !== password)
                return done(null, false, { message: "Incorrect Password" });
        }

        catch(error){
            return done(error);
        }
    })
);

// Functions 2 & 3: Sessions & Serialization

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } 
    
    catch(err) {
      done(err);
    };
});

// Routing

const cors = require("cors");   
app.use(cors());                //**// Enable All CORS Requests //**//

const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");

app.use("/index", indexRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {res.status(200).json("Welcome!")});

module.exports = app;