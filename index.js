import express from 'express';
import path from 'path';
import http from 'http'

// Import Database
import database from './server/database/db';

// Import Routes
import userRouter from './server/routes/users'

// Setting up the app
let app = express();

// Setting up the port the app will run on
const port = process.env.PORT || 5000;

// Setting up middleware for the app
app.use(express.json());

// Setting up routes
app.use('/users', userRouter);


app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/public/index.html"));
});

// Start the database

database.connect()
  .then(() => {
    // Create a server using app
    const server = http.createServer(app);

    // Start the app
    server.listen(port, () => console.log(`Server started on port ${port}`));
  })
