require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db'); // Path to your Atlas connection file
const authRoutes = require('./routes/authRoutes');

const app = express();

// 1. Connect Database
connectDB();

// 2. Middleware
app.use(cors()); // Allows React to talk to Node
app.use(express.json()); // Allows Node to read JSON from React

// 3. Routes
app.use('/api/auth', authRoutes);

// 4. Test Route (To check if server is alive)
app.get('/', (req, res) => {
  res.send('API is running successfully!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server spinning on port ${PORT}`));