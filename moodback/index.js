const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/moodTracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
const moodsRouter = require('./routes/moods');
app.use('/moods', moodsRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
