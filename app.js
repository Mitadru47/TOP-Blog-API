const express = require("express");
const app = express();

// Establishing Static Folder Access - public
app.use(express.static(__dirname + "/public"));

// Establishing URL Parser
app.use(express.urlencoded({ extended: false }));

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

//**// Enable All CORS Requests //**//

const cors = require("cors");
app.use(cors());

const indexRouter = require("./routes/index");
app.use("/index", indexRouter);

app.get("/", (req, res) => {res.redirect("/index")});

module.exports = app;