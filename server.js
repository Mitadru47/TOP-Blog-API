const http = require("http");
const app = require("./app");

const server = http.createServer(app);

const hostName = "0.0.0.0";
const portNumber = process.env.PORT || 3000;

server.listen(portNumber, hostName, () => {
    console.log("\nServer Active!\nListening on " + portNumber + "...\n");
});