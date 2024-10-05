const express = require('express');
const { db } = require('./db/db'); // Ensure path is correct
const router = require('./Routers/router'); // Ensure path is correct
const cors = require('cors');
const cookieparser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cookieparser());

// Update CORS to allow requests from the React app
app.use(cors());

// Use the router for handling routes
app.use(router);

// Error handling for server startup
const port = 9000;
app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
