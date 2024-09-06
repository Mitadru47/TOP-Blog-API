const User = require("../models/user");

// JWT Strategy
// Function 1: JWT Extractor

const fs = require("fs");
const path = require("path");

const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const PUB_KEY = fs.readFileSync(path.join(__dirname, "..", "id_rsa_pub.pem"), "utf8");

const options = {

    // Expectation: Request will have JWT in Authorization Header - Authorization: Bearer <token>
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

    secretOrKey: PUB_KEY,
    algorithms: ["RS256"]
};

module.exports = (passport) => {

    passport.use("jwt", new JwtStrategy(options, async (payload, done) => {

        try{
        
            const user = await User.findOne({ _id: payload.sub }).exec();

            if(user)
                done(null, user);

            else
                done(null, false);
        }

        catch(error){
            done(error, null);
        }
    }));
}