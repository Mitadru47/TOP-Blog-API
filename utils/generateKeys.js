const crypto = require("crypto");
const fs = require("fs");

function genKeyPair(){

    // Generates an object where the keys are stored in properties "privateKey" & "publicKey"
    const keyPair = crypto.generateKeyPairSync("rsa", {

        modulusLength: 4096,    // Standard for RSA Keys
        
        publicKeyEncoding: {

            type: "pkcs1",  // Public Key Crytopgraphy Standards
            format: "pem"   // Most Common Formatting Choice
        },

        privateKeyEncoding: {

            type: "pkcs1",
            format: "pem"
        }
    });

    // Creates the publicKey file
    fs.writeFileSync(__dirname + "/id_rsa_pub.pem", keyPair.publicKey);

    // Creates the privateKey file
    fs.writeFileSync(__dirname + "/id_rsa_priv.pem", keyPair.privateKey);
}

genKeyPair();