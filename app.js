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

// Routing

const cors = require("cors");   
app.use(cors());                //**// Enable All CORS Requests //**//

const indexRouter = require("./routes/index");
const dashboardRouter = require("./routes/dashboard");

app.use("/index", indexRouter);
app.use("/dashboard", dashboardRouter);

app.get("/", (req, res) => {res.status(200).json("Welcome!")});

module.exports = app;