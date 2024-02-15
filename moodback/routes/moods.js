const express = require('express');
const router = express.Router();
const moodsController = require('../controllers/moodsController');

// Define routes for notes
router.get('/', moodsController.getAllMoods);
router.get('/:id', moodsController.getMoodById);
router.post('/', moodsController.createMood);
router.put('/:id', moodsController.updateMood);
router.delete('/:id', moodsController.deleteMood);

module.exports = router;
