const express = require('express');
const {
  getAllNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
} = require('./../controllers/noteController');
const router = express.Router();

// router.param('id', checkId);

router
  .route('/')
  .get(getAllNotes)
  .post(createNote);

router
  .route('/:id')
  .get(getNote)
  .patch(updateNote)
  .delete(deleteNote);


module.exports = router;