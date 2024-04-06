const mongoose = require("mongoose");
const connectionString = "mongodb+srv://Admin-Mitadru:DB1234@clustermg.e4fjgoy.mongodb.net/blogDB?retryWrites=true&w=majority&appName=ClusterMG";

mongoose.set("strictQuery", false);

async function main(){ 

    await mongoose.connect(connectionString);
    console.log("Debug: Connected to DB!");

    await createUser();

    await createPosts();
    await createComments();

    console.log("Debug: Closing Connection...");
    mongoose.connection.close();
}

main().catch((error) => console.log(error));

async function createUser(){

} 

async function createPosts(){
    
} 

async function createComments(){
    
} 