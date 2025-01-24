import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

function Note(props) {
  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      
      <button
        onClick={() => {
          props.deleteNote(props.id);
        }}
      >
        <DeleteIcon />
      </button>
      <button
        onClick={() => {
          props.editNote(props.id);
        }}
      >
        <EditNoteIcon />
      </button>
    </div>
  );
}

export default Note;
