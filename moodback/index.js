// index.js

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

// Mood model
const Mood = mongoose.model('Mood', {
    high: Number,
    low: Number,
    sleep: Number,
    move: Number,
    date: Date,
    userid: Number
});

// Routes
app.post('/moods', async (req, res) => {
    try {
        const mood = new Mood(req.body);
        await mood.save();
        res.send(mood);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/moods', async (req, res) => {
    try {
        const moods = await Mood.find();
        res.send(moods);
    } catch (error) {
        res.status(500).send(error);
    }
});

app.get('/moods/:id', async (req, res) => {
    try {
        const mood = await Mood.findById(req.params.id);
        if (!mood) {
            return res.status(404).send();
        }
        res.send(mood);
    } catch (error) {
        res.status(500).send(error);
    }
});


app.delete('/moods/:id', async (req, res) => {
    try {
        const mood = await Mood.findByIdAndDelete(req.params.id);
        if (!mood) {
            return res.status(404).send();
        }
        res.send(mood);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
