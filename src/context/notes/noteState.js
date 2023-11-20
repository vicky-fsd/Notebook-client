// NoteState.js 
import React, { useState, useEffect } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // API host URL
  //const host = "http://localhost:5000";
  const host = "https://notebookserver-0zog.onrender.com";

  // State variables
  const [notes, setNotes] = useState([]);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "Personal",
  });

  // Function to get all notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch notes. Status: ${response.status}`);
      }

      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };

  // Fetch notes when the component mounts or when the authentication token changes
  useEffect(() => {
    console.log("Fetching notes when component mounts or when token changes");
    getNotes();
  }, []);

  // Function to add a new note
  const addNote = async (title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/createnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Failed to add note");
      }

      const newNote = await response.json();
      setNotes((prevNotes) => [...prevNotes, newNote]);
      window.alert("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error.message);
    }
  };

  // Function to update an existing note
 // Function to update an existing note
 const updateNote = async (id, title, description, tag) => {
  try {
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    if (!response.ok) {
      throw new Error("Failed to update note");
    }

    const updatedNote = await response.json();

    // Log information for debugging
    console.log("Updated note:", updatedNote);

    // Check if the 'date' property is present and has a valid format
    if (updatedNote.note && updatedNote.note.date && !isNaN(new Date(updatedNote.note.date).getTime())) {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note._id === id ? updatedNote.note : note))
      );
      window.alert("Note updated successfully!");
    } else {
      console.error("Invalid date format in the updated note:", updatedNote);
    }
  } catch (error) {
    console.error("Error updating note:", error.message);
  }
};



  // Function to delete a note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete note");
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
      window.alert("Note deleted successfully!");
    } 
    catch (error) {
      console.error("Error deleting note:", error.message);
    }
  };

  // Function to set the note for editing
  const editNote = (currentNote) => {
    setUpdateModalOpen(true);
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  // Context provider value
  const contextValue = {
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
    setUpdateModalOpen,
  };

  return (
    <NoteContext.Provider value={contextValue}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
