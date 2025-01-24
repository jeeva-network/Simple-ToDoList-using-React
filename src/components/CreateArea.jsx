import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [notes, setNotes] = useState({ title: "", content: "" });

  useEffect(() => {
    if (props.note.title && props.note.content) {
      setNotes({
        title: props.note.title,
        content: props.note.content,
      });
      setExpanded(true);
    }
  }, [props.note]);

  function handleChange(event) {
    const { name, value } = event.target;
    setNotes((prevData) => {
      return { ...prevData, [name]: value };
    });
  }

  function handleSubmit(event) {
    if (props.note._id) {
      props.updateNote(notes, props.note._id);
    } else {
      // Create a new note
      props.addNote(notes);
    }
    setNotes({ title: "", content: "" });
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
