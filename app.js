const express = require("express");
const app = express();

// M - Model - MVC Architecture
// MongoDB Connection Setup

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectionString = "mongodb+srv://Admin-Mitadru:DB1234@clustermg.e4fjgoy.mongodb.net/blogDB?retryWrites=true&w=majority&appName=ClusterMG";

async function main(){
    await mongoose.connect(connectionString);
}

main().catch((error) => console.log(error));

// V - View - MVC Architecture
// View Engine Setup

app.set("views", __dirname + "/views");
app.set("view engine", "pug");

// C - Controllers - MVC Architecture
// Routing

app.get("/", (req, res) => res.send("Hello World!"));

module.exports = app;