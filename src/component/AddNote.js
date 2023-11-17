import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Modal from "./Modal";
import { AiOutlineCloseCircle } from "react-icons/ai";

const Addnote = () => {
  const context = useContext(noteContext);
  const { addNote, addModalOpen, setAddModalOpen } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleOpenModal = () => setAddModalOpen(true);
  const handleCloseModal = () => setAddModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag=== "" ? "Personal" : note.tag);
    setNote({ title: "", description: "", tag: "" });
    setAddModalOpen(false);
  };

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <button className="hidden" onClick={handleOpenModal}>
        Open Modal
      </button>
      <Modal isOpen={addModalOpen} onClose={handleCloseModal}>
        <div className="container p-2 sm:p-5">
          <div className="flex justify-between items-center w-full mb-4">
            <h2 className="sm:text-2xl text-xl font-bold title-font text-gray-900">
              Add Note
            </h2>
            <button
              type="button"
              className="w-auto inline-flex justify-center rounded-full font-bold text-gray-700 hover:bg-red-500 hover:text-white sm:ml-3 sm:text-sm"
              onClick={handleCloseModal}
            >
              <AiOutlineCloseCircle className="text-3xl" />
            </button>
          </div>
          <div className="mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="title"
                    className="title leading-7 text-md text-gray-600"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={note.title}
                    onChange={handleChange}
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:bg-gray-100 hover:border-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="tag"
                    className="leading-7 text-md text-gray-600"
                  >
                    Tag
                  </label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={note.tag}
                    onChange={handleChange}
                    className="w-full  bg-opacity-50 rounded border border-gray-300 focus:bg-gray-100 hover:border-black text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="desc"
                    className="leading-7 text-md text-gray-600"
                  >
                    Description
                  </label>
                  <textarea
                    id="desc"
                    name="description"
                    onChange={handleChange}
                    className="w-full bg-opacity-50 rounded border border-gray-300 focus:bg-gray-100 hover:border-black h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                    defaultValue={note.description}
                    required
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  disabled={
                    note.title.length < 3 || note.description.length < 3
                  }
                  className={`${
                    note.title.length < 3 || note.description.length < 3
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  } flex text-black border border-black py-2 px-4 focus:outline-none hover:bg-black hover:text-white rounded-md text-lg font-semibold transition-colors duration-300`}
                  onClick={handleSubmit}
                >
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Addnote;
