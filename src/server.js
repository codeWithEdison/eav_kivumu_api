const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();

// Middleware to parse JSON responses
app.use(express.json());

// Mounting user routes at /api/users
app.use('/api/users', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
