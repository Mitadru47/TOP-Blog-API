const mongoose = require("mongoose");
const connectionString = "mongodb+srv://Admin-Mitadru:DB1234@clustermg.e4fjgoy.mongodb.net/blogDB?retryWrites=true&w=majority&appName=ClusterMG";

const User = require("./models/user");

const Post = require("./models/post")
const Comment = require("./models/comment");

const posts = [];
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

    const user = new User({

        firstName: "Dutch",
        lastName: "van der Linde",
        
        email: "messiah@vanderlinde.gang",
        
        username: "KingLear",
        password: "passwordD"
    });

    await user.save();
    console.log("Added User: " + user.username);
} 

async function createPosts(){

    console.log("Adding Posts...");

    await Promise.all([

        createPost(0, "The Epilogue", "I Aint Got Too Much To Say No More", new Date()),
        createPost(1, "The Fall", "The Game Aint Over… I Aint Played My Final Move", new Date()),
        createPost(2, "The Doubts", "I Will Keep Trying, And You will Keep Doubting Me, And We will Keep Failing", new Date()),
        createPost(3, "The Survivors Of Guarma", "I Am Just Trying To Make Sure Some Of Us Survive", new Date()),
    ]);
} 

async function createPost(index, title, body, timestamp){

    const post = new Post({

        title: title,
        body: body,

        timestamp: timestamp
    });

    await post.save();

    posts[index] = post;
    console.log(`Added Post: ${post.title}`);
}

async function createComments(){

    console.log("Adding Comments...");

    await Promise.all([

        createComment("genericPaul", "genericPaul@dummy.user", "TAHITI!", posts[0], new Date()),
        createComment("genericPaolo", "genericPaolo@dummy.user", "HAVE SOME GODDAMN FAITH!!!", posts[2], new Date()),
        createComment("genericPavel", "genericPavel@dummy.user", "Breaks your heart man..", posts[0], new Date()),
        createComment("genericPascal", "genericPascal@dummy.user", "Yeah right (its sarcasm you dummies)", posts[3], new Date()),
    ]);
}

async function createComment(username, email, body, post, timestamp){

    const comment = new Comment({

        username: username,
        email: email,

        body: body,

        post: post,
        timestamp: timestamp
    });

    await comment.save();
    console.log(`Added ${comment.username}'s comment to ${comment.post.title}`);
}