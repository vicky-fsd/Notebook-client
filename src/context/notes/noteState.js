import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://notebookserver-0zog.onrender.com";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "Personal",
  });

  // Get all note
  const getNotes = async () => {
    let url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    setNotes(data);
  };

  // Add note
  const addNote = async (title, description, tag) => {
    let url = `${host}/api/notes/createnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const note = await response.json();
    setNotes((prevNotes) => [...prevNotes, note]);
  };

  // Update note
  const updateNote = async (id, title, description, tag) => {
    let url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const data = await response.json();
    console.log(data);
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note._id === id ? { ...note, title, description, tag } : note
      )
    );
  };

  // Delete note
  const deleteNote = async (id) => {
    let url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const data = await response.json();
    console.log(data);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };

  const editNote = (currentNote) => {
    setUpdateModalOpen(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        getNotes,
        addNote,
        updateNote,
        deleteNote,
        editNote,
        note,
        setNote,
        addModalOpen,
        setAddModalOpen,
        updateModalOpen,
        setUpdateModalOpen
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
