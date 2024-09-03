const jsonwebtoken = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");

const PRIV_KEY = fs.readFileSync(path.join(__dirname, "..", "id_rsa_priv.pem"), "utf8");

function issueJWT(user){

    const _id = user._id;
    const expiresIn = "1m";

    const payload = {

        sub: _id,           // Subject: <User ID>
        iat: Date.now()     // Issued At: <Current Date>
    };

    const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, { expiresIn: expiresIn, algorithm: "RS256" });

    return({

        token: "Bearer " + signedToken,
        expires: expiresIn
    });
}

module.exports = issueJWT;