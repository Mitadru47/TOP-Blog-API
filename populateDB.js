require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/user");

const Post = require("./models/post")
const Comment = require("./models/comment");

let postAuthor = {};
const posts = [];

mongoose.set("strictQuery", false);

async function main(){ 

    await mongoose.connect(process.env.DB_CONNECTION_STRING);
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
        password: process.env.AUTHOR_PASSWORD
    });

    await user.save();
    
    postAuthor = user;
    console.log("Added User: " + user.username);
} 

async function createPosts(){

    console.log("Adding Posts...");

    await Promise.all([

        createPost(0, "The Epilogue", "I Aint Got Too Much To Say No More", new Date(), true),
        createPost(1, "The Fall", "The Game Aint Over… I Aint Played My Final Move", new Date(), false),
        createPost(2, "The Doubts", "I Will Keep Trying, And You will Keep Doubting Me, And We will Keep Failing", new Date(), true),
        createPost(3, "The Survivors Of Guarma", "I Am Just Trying To Make Sure Some Of Us Survive", new Date(), true),
        createPost(4, "The Consequences", "You can’t live a bad life and have good things happen to you", new Date(), true),
        createPost(5, "The Duality", "Just Do One Thing Or The Other, Don’t Try To Be Two People At Once…", new Date(), false),
        createPost(6, "The Fool", "Vengeance Is An Idiot’s Game", new Date(), true),
        createPost(7, "The Tragedy", "Lack Of Something To Feel Important About Is Almost The Greatest Tragedy A Man May Have.", new Date(), true)
    ]);
} 

async function createPost(index, title, body, timestamp, publishStatus){

    const post = new Post({

        title: title,
        body: body,

        timestamp: timestamp,
        createdTimestamp: timestamp,

        author: postAuthor,
        publishStatus: publishStatus
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
        createComment("genericPete", "genericPete@dummy.user", "What a quote!", posts[4], new Date()),
        createComment("genericPeter", "genericPeter@dummy.user", "Pretty much sums it all up", posts[4], new Date())
    ]);
}

async function createComment(username, email, body, post, timestamp){

    const comment = new Comment({

        username: username,
        email: email,

        body: body,

        post: post,

        timestamp: timestamp,
        createdTimestamp: timestamp,
    });

    await comment.save();
    console.log(`Added ${comment.username}'s comment to ${comment.post.title}`);
}