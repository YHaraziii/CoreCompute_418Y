require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB Atlas (Using Yousef's connection)
mongoose.connect(process.env.MONGO_URI);
const database = mongoose.connection;

database.on('error', (error) => console.log('Database Error:', error));
database.once('connected', () => console.log('✅ Cloud Database Connected Successfully'));

// ------------------------------------
// IMPORT TEAM ROUTES
// ------------------------------------
const topicRoutes = require('./routes/topics');
// const learningPathRoutes = require('./routes/learningPath'); // <-- Yousef will uncomment this later!

// Mount the routes
app.use('/api/topics', topicRoutes);
// app.use('/api/learning-path', learningPathRoutes); // <-- Yousef will uncomment this later!

const knowledgeGapRoutes = require('./routes/knowledgeGap');

app.use('/api/knowledge-gap', knowledgeGapRoutes);

// Start the server (Fixed the duplicate bug)
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server Started on port ${PORT}`);
});