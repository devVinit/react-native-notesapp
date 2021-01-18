import { ADD_NOTE, DELETE_NOTE, PIN_NOTE, ADD_BULK_NOTES } from "./ActionTypes";
import { Note } from "../../models/Note";

export function addNote(payload: Note) {
  return {
    type: ADD_NOTE,
    payload,
  };
}

export function deleteNote(id: number) {
  return {
    type: DELETE_NOTE,
    id,
  };
}

export function pinNote(id: number) {
  return {
    type: PIN_NOTE,
    id,
  };
}

export function addBulkNotes(notes: any) {
  return {
    type: ADD_BULK_NOTES,
    payload: notes,
  };
}
