// backend/models/Note.js
import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically sets the current date and time if not provided
  }
});

const Note = mongoose.model('Note', noteSchema, "notes");

export default Note;  // Export Note model
