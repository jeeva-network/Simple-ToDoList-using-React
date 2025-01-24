import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [editNote, setEditNote] = useState({});

  // Fetch notes from the backend when the component mounts

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get("http://localhost:5000/api/notes");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    }

    fetchNotes();
  }, [data]);

  // Add a new note
  async function addNotes(newNotes) {
    if (newNotes.title !== "" && newNotes.content !== "") {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/notes",
          newNotes
        );
        setData((prevValue) => {
          return [...prevValue, response.data];
        });
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  }

  // Get a note by ID
  async function note(id) {
    try {
      const response = await axios.get(`http://localhost:5000/api/notes/${id}`);
      setEditNote(response.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  // Edit a note
  async function updateNote(...notes) {
    try {
      await axios.patch(`http://localhost:5000/api/notes/edit/${notes[1]}`, notes[0]);
      setEditNote({});
    } catch (error) {
      console.error("Error editing note:", error);
    }
  }

  // Delete a note
  async function deleteNotes(id) {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNotes} note={editNote} updateNote={updateNote}/>
      {data.map((item, index) => (
        <Note
          key={item._id}
          editNote={note}
          deleteNote={deleteNotes}
          id={item._id}
          title={item.title}
          content={item.content}
        />
      ))}
      <Footer />
    </div>
  );
}

export default App;
