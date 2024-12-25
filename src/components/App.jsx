import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

function App() {
  const [data, setData] = useState([]);

  function addNotes(newNotes) {
    // console.log("newNotes", newNotes)
    if (newNotes.title !== "" && newNotes.content !== "") {
      setData((preValue) => {
        return [...preValue, newNotes];
      });
    }
    // console.log("data", data)
  }

  function deleteNotes(id) {
    setData((preData) => {
      return preData.filter((noteItems, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea addNote={addNotes} />
      {data.map((item, index) => {
        return (
          <Note
            key={index}
            deleteNote={deleteNotes}
            id={index}
            title={item.title}
            content={item.content}
          />
        );
      })}

      <Footer />
    </div>
  );
}

export default App;
