//Import the mongoose module
var mongoose = require("mongoose");

//Set up default mongoose connection
var mongoDB =
  "mongodb+srv://Lucky:Avikal1999@cluster0.mjffa.mongodb.net/User_Api";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;
console.log("MongoDB Connected!");

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));
