import { ADD_NOTE, DELETE_NOTE, PIN_NOTE } from './ActionTypes';
import { Note } from '../../models/Note';

export function addNote(payload: Note) {
    return {
        type: ADD_NOTE,
        payload
    }
}

export function deleteNote(index: number) {
    return {
        type: DELETE_NOTE,
        index
    }
}

export function pinNote(index: number) {
    return {
        type: PIN_NOTE,
        index
    }
}