
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require("./models/note.model.js");

require('dotenv').config();

const app = express();
const PORT  = process.env.port || 5000;

app.listen(PORT, () => console.log(`Listening pn ${PORT}`));

app.use(cors({origin: true}));
app.use(express.json());

// Add notes
app.post("/api/note", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Get notes
app.get("/api/note", async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Update notes
app.put("/api/note/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const note = await Note.findByIdAndUpdate(id, req.body);

    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }

    const updatedNote = await Note.findById(id);
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Delete notes
app.delete("/api/note/:id", async (req, res) => {
  try {
    const {id} = req.params;
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({message: "Note not found"});
    }

    res.status(200).json({message: "Note deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});


mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log("Connected to database");
    })
    .catch((error) => {
      console.error("Connection failed:", error);
    });
