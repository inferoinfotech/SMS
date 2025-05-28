import React, { useState, useEffect } from "react";
import "./style.css";
import FinancialNotesCard from "./FinancialNotesCard";
import CustomButton from "../../../components/customButton/CustomButton";
import AddNote from "../../../components/addNote/AddNote";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
} from "../../../api/noteApi";

const FinancialNote = () => {
  const [notes, setNotes] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const notesData = await getNotes();
      setNotes(notesData);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedNote(null);
  };

  const handleAddNote = async (newNote) => {
    try {
      if (selectedNote) {
        await updateNote(selectedNote._id, newNote);
        setNotes(
          notes.map((note) => (note._id === selectedNote._id ? newNote : note))
        );
      } else {
        const createdNote = await createNote(newNote);
        setNotes([...notes, createdNote]);
      }
      closePopup();
    } catch (error) {
      console.error("Error adding/updating note:", error);
    }
  };

  const handleEditNote = (note) => {
    setSelectedNote(note);
    togglePopup();
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter((note) => note._id !== noteId));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <div className="financialNote h-full w-full">
      <div className="flex flex-col gap-[10px] p-5 bg-white rounded-2xl max-h-[904px]">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="text-wrapper-184">Note</div>
          <CustomButton
            text="Create Note"
            width=""
            imageType={"Add"}
            onClick={togglePopup}
          />
        </div>
        <div className="flex flex-wrap gap-4 items-start mt-5 max-md:max-w-full max-h-full overflow-y-scroll">
          {/* {notes.map((note, index) => (
            <div key={index} className="flex w-[370px] financial-note-card">
              <FinancialNotesCard
                {...note}
                onEdit={() => handleEditNote(note)}
                onDelete={() => handleDeleteNote(note._id)}
              />
            </div>
          ))} */}

          {notes.length === 0 ? (
            <div className="text-center text-gray-500 font-bold p-4">
              Data not found
            </div>
          ) : (
            notes.map((note, index) => (
              <div key={index} className="flex w-[370px] financial-note-card">
                <FinancialNotesCard
                  {...note}
                  onEdit={() => handleEditNote(note)}
                  onDelete={() => handleDeleteNote(note._id)}
                />
              </div>
            ))
          )}
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div>
            <AddNote
              closePopup={closePopup}
              onSubmit={handleAddNote}
              note={selectedNote}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialNote;
