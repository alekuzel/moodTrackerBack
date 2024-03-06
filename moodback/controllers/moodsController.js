
const Mood = require('../models/moodsModel');

// C get all moods
exports.getAllMoods = async (req, res) => {
  try {
    const moods = await Mood.find();
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  get a mood by id
exports.getMoodById = async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    res.json(mood);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a new mood
exports.createMood = async (req, res) => {
  try {
    const mood = new Mood(req.body);
    await mood.save();
    res.status(201).json(mood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  update a mood
exports.updateMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    res.json(mood);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a mood 
exports.deleteMood = async (req, res) => {
  try {
    const mood = await Mood.findByIdAndDelete(req.params.id);
    if (!mood) {
      return res.status(404).json({ message: 'Mood not found' });
    }
    res.json({ message: 'Mood deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get moods by userid
exports.getMoodsByUserId = async (req, res) => {
  const userId = req.params.userid;

  try {
    const moods = await Mood.find({ userid: userId });
    res.json(moods);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
