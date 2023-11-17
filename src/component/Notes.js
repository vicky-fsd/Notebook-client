import React, { useContext, useEffect } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";
import Update from "./Update";
import nodata from "../asset/nodata.svg";

const Notes = () => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes } = context;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col w-full">
      <AddNote />
      <Update />
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-8 text-gray-900">
        Your Notes
      </h1>
      <section className="text-gray-600 body-font">
          <div className="flex flex-wrap gap-4 flex-col items-center">
            {notes.length === 0 && (
              <div className="flex flex-col item-center">
                <p className="text-lg font-medium text-gray-700 mb-3">
                  No notes to display 😔. Try adding some notes.
                </p>
                <img src={nodata} alt="nodata" className="w-52 mx-auto" />
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4">
            {notes.length !== 0 && (
              <>
                {notes.map((note) => {
                  return <NoteItem key={note._id} note={note} />;
                })}
              </>
            )}
          </div>
      </section>
    </div>
  );
};

export default Notes;
