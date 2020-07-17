import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, PIN_NOTE } from './ActionTypes';

export function addNote(payload: any) {
    return {
        type: ADD_NOTE,
        payload
    }
}

export function updateNote(index: number, payload: any) {
    return {
        type: UPDATE_NOTE,
        payload
    }
}

export function deleteNote(payload: any, index: number) {
    return {
        type: DELETE_NOTE,
        payload
    }
}

export function pinNote(payload: any, index: number) {
    return {
        type: PIN_NOTE,
        payload
    }
}