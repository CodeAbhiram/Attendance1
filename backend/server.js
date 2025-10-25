require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // We assume your DB connection logic is here

// Initialize Express App
const app = express();

// Connect to Database
connectDB();

// --- Middleware ---
// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());
// Enable express to understand and parse JSON in request bodies
app.use(express.json());


// --- Define API Routes ---
// Any request starting with /api/auth will be handled by the auth.js route file
app.use('/api/auth', require('./routes/auth'));

// Any request starting with /api/attendance will be handled by the attendance.js route file
app.use('/api/attendance', require('./routes/attendance'));

// Any request starting with /api/listings will be handled by the attendance.js route file (for frontend compatibility)
app.use('/api/listings', require('./routes/attendance'));

// Any request starting with /api/users will be handled by the users.js route file
app.use('/api/users', require('./routes/users'));


// --- Server Initialization ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started successfully on port ${PORT}`));