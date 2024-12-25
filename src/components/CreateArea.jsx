import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState({ title: "", content: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    // console.log("value", value);
    // console.log("name", name);

    setNotes((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function handleSubmit(event) {
    props.addNote(notes);
    setNotes({ title: "", content: "" });
    // console.log("notes", notes);
    event.preventDefault();
  }

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            onChange={handleChange}
            value={notes.title}
            name="title"
            placeholder="Title"
          />
        )}
        <textarea
          onClick={expand}
          onChange={handleChange}
          value={notes.content}
          name="content"
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={handleSubmit}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
