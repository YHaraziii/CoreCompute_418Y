require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
const database = mongoose.connection;
database.on('error', (error) => console.log('Database Error:', error));
database.once('connected', () => console.log('✅ Cloud Database Connected Successfully'));

// Mount Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/topics', require('./routes/topics'));
app.use('/api/learning-path', require('./routes/learningPath'));
app.use('/api/resources', require('./routes/resources'));
app.use('/api/knowledge-gap', require('./routes/knowledgeGap'));
app.use('/api/admin', require('./routes/admin')); // System Admin Persona

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));