import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);

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
  }, []);

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

  // Delete a note
  async function deleteNotes(id) {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      const response = await axios.get("http://localhost:5000/api/notes");
      setData(response.data);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNotes} />
      {data.map((item, index) => (
        <Note
          key={item._id}
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
