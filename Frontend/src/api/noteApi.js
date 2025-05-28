import axiosInstance, { endpoints } from '../axios';

export const getNotes = async () => {
  try {
    const response = await axiosInstance.get(endpoints.note.getNote);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createNote = async (noteData) => {
    try {
      const response = await axiosInstance.post(endpoints.note.addNote, noteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  export const updateNote = async (noteId, noteData) => {
    try {
      const response = await axiosInstance.put(endpoints.note.updateNote(noteId), noteData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
 
  export const deleteNote = async (noteId) => {
    try {
      const response = await axiosInstance.delete(endpoints.note.deleteNote(noteId));
      return response.data;
    } catch (error) {
      throw error;
    }
  };