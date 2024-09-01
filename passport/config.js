const passport = require("passport");

// Function 1: Setting Up LocalStrategy

const User = require("../models/user");
const LocalStrategy = require("passport-local").Strategy;

// Creating a passport middleware to handle User login

passport.use("local",
    new LocalStrategy(async (username, password, done) => {

        try{
     
            const user = await User.findOne({ username: username }).exec();
            
            if(!user)
                return done(null, false);

            if(user.password !== password)
                return done(null, false);

            return done(null, user);
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