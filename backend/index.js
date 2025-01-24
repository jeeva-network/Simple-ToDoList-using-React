// backend/index.js
import express from "express";
import cors from 'cors';
import mongoose from 'mongoose';
import Note from './models/Note.js';  // Import Note model

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies


// Connect to MongoDB
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/noteApp')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes for creating and getting notes
app.post('/api/notes', async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({ title, content });
  try {
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: 'Failed to save note', error: err });
  }
});

app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (err) {
    res.status(400).json({ message: 'Failed to get notes', error: err });
  }
});

// Edit note by ID
app.patch('/api/notes/edit/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const note = await Note.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update note', error: err });
  }
});

// Get note by ID
app.get('/api/notes/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.status(200).json(note);
  } catch (err) {
    res.status(400).json({ message: 'Failed to get note', error: err });
  }
});

// Delete note by ID
app.delete('/api/notes/:id', async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete note', error: err });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
