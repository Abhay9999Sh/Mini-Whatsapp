const express = require("express");       // Import Express framework
const app = express();
const mongoose = require("mongoose");    // Import Mongoose for MongoDB interactions
const path = require("path");            // Import Path module for file path operations
const Chat = require("./models/chat.js"); // Import the Chat model
const methodOverride = require("method-override"); // Import Method-Override for supporting HTTP methods
const ExpressError = require("./ExpressError.js"); // Import custom error handling class

app.set("views", path.join(__dirname, "views")); // Set the views directory for EJS templates
app.set("view engine", "ejs"); // Set EJS as the template engine
app.use(express.static(path.join(__dirname, "public")));  // Serve static files from 'public' directory
app.use(express.urlencoded({extended: true})); // Middleware to parse URL-encoded bodies
app.use(methodOverride("_method"));  // Middleware to support PUT and DELETE methods

// Connect to MongoDB and handle connection success or failure
main()
 .then(() => {
    console.log("Connection to MongoDB successful");
 })
 .catch(err => console.log("MongoDB connection error:", err));

// Connect to MongoDB database 'fakeWhatsapp'
async function main() {   
  await mongoose.connect('mongodb://127.0.0.1:27017/fakeWhatsapp');
}

// Index Route: GET /chats - Display all chat messages
app.get("/chats", asyncWrap(async (req, res) => {
    let chats = await Chat.find(); // Retrieve all chat messages
    res.render("index.ejs", { chats }); // Render the index page with chat messages
}));

// New Route: GET /chats/new - Display form to create a new chat
app.get("/chats/new", (req, res) => {
    res.render("new.ejs"); // Render the form for creating a new chat
});

// Create Route: POST /chats - Submit new chat message to the server
app.post("/chats", async (req, res) => {
    try {
        let { from, to, msg } = req.body; // Extract chat details from request body
        let newChat = new Chat({
            from: from,
            to: to,
            msg: msg,
            created_at: new Date() // Set the creation timestamp
        });

        await newChat.save(); // Save the new chat message to the database
        res.redirect("/chats"); // Redirect to the list of chats
    } catch (err) {
        next(err); // Pass any errors to the error handling middleware
    }
});

// Show Route: GET /chats/:id - Show details of a specific chat message
app.get("/chats/:id", asyncWrap(async (req, res, next) => {
    let { id } = req.params; // Extract chat ID from request parameters
    let chat = await Chat.findById(id); // Find chat message by ID
    if (!chat) {
        next(new ExpressError(404, "Chat not found")); // Pass 404 error if chat not found
    }
    res.render("edit.ejs", { chat }); // Render the edit form with chat details
}));

// Edit Route: GET /chats/:id/edit - Display form to edit a specific chat message
app.get("/chats/:id/edit", asyncWrap(async (req, res) => {
    let { id } = req.params; // Extract chat ID from request parameters
    let chat = await Chat.findById(id); // Find chat message by ID
    res.render("edit.ejs", { chat }); // Render the edit form with chat details
}));

// Update Route: PUT /chats/:id - Update a specific chat message
app.put("/chats/:id", asyncWrap(async (req, res) => {  
    let { id } = req.params;  // Extract chat ID from request parameters
    let { msg: newMsg } = req.body;  // Extract new message content from request body
    let updatedChat = await Chat.findByIdAndUpdate(
        id,
        { msg: newMsg }, 
        { runValidators: true, new: true } // Update with validation and return the updated document
    );
    res.redirect("/chats"); // Redirect to the list of chats
}));

// Destroy Route: DELETE /chats/:id - Delete a specific chat message
app.delete("/chats/:id", asyncWrap(async (req, res) => {
    let { id } = req.params; // Extract chat ID from request parameters
    let deletedChat = await Chat.findByIdAndDelete(id); // Delete chat message by ID
    res.redirect("/chats"); // Redirect to the list of chats
}));

// Root Route: GET / - Basic route for checking server status
app.get("/", (req, res) => {
    res.send("Root route is working");
});

// Error handling middleware for asynchronous routes
function asyncWrap(fn) {
    return function(req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}

// Custom error handling for CastErrors (e.g., invalid ObjectId format)
const handleCastErr = (err) => {
    console.log("This was a Cast error. Please follow the rules.");
    console.dir(err.message);
    return err;
}

// General error handling middleware
app.use((err, req, res, next) => {
    if (err.name === "CastError") {
        err = handleCastErr(err); // Handle CastError specifically
    }
    next(err); // Pass the error to the next error handling middleware
});

// Final error handling middleware to send error response
app.use((err, req, res, next) => {
    let { status = 500, message = "Some error occurred" } = err;
    res.status(status).send(message); // Send error message as response
});

// Start the server and listen on port 8080
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
