const express = require('express');
const router = express.Router();
const notesController = require('../controllers/notesController');

// routes for notes
router.get('/', notesController.getAllNotes);
router.get('/users/:userid', notesController.getNotesByUserId);
router.get('/:id', notesController.getNoteById);
router.post('/', notesController.createNote);
router.put('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);


module.exports = router;
