# Mini-Whatsapp
Description:
Mini WhatsApp is a simplified web-based chat application that mimics basic functionalities of a messaging platform. Built using Node.js, Express, and MongoDB, this application allows users to create, view, edit, and delete chat messages. It includes real-time date and time features, ensuring that each chat message is timestamped accurately.

Features:

1. View Chats: Display a list of all chat messages with details like sender, receiver, message content, and timestamps.
2. Add New Chats: Users can create and add new chat messages to the platform, specifying sender, receiver, and the message content.
3. Edit Chats: Update existing chat messages by modifying the message content while keeping the other details unchanged.
4. Delete Chats: Remove chat messages from the application permanently.
5. Timestamping: Each chat message is timestamped with the current date and time when it is created, allowing users to see when each message was sent.
6. Error Handling: The application includes custom error handling for various issues such as invalid data or missing messages, providing informative error messages.
   
Technologies Used:

1. Node.js: Server-side runtime environment for executing JavaScript code.
2. Express: Web framework for building the server and handling HTTP requests.
3. MongoDB: NoSQL database used for storing chat messages and user data.
4. Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js, used for schema definition and data modeling.
5. EJS: Templating engine for rendering dynamic HTML pages.
6. Method-Override: Middleware for handling HTTP methods like PUT and DELETE that are not supported by HTML forms.
   
Routes:

1. GET /chats: Displays all chat messages.
2. GET /chats/new: Renders a form to create a new chat message.
3. POST /chats: Submits new chat data to the server.
4. GET /chats/:id: Shows the details of a specific chat message for editing.
5. GET /chats/:id/edit: Renders a form to edit an existing chat message.
6. PUT /chats/:id: Updates the specified chat message.
7. DELETE /chats/:id: Deletes the specified chat message.
   
Error Handling:

1. Custom Error Handling: Handles common errors such as CastError for invalid data formats and provides meaningful error messages.
2. Global Error Middleware: Catches and responds to all errors with appropriate HTTP status codes and messages.
   
Setup Instructions:

1. Clone this repository to your local machine.
2. Navigate to the project directory and install dependencies using npm install.
3. Start the MongoDB server if it is not already running.
4. Run the application using node index.js.
5. Open your web browser and go to http://localhost:8080 to access the application.
   
Contributions:
Feel free to fork this repository and contribute by adding features, improving the design, or fixing bugs.
