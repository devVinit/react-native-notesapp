import { ADD_NOTE, DELETE_NOTE, PIN_NOTE, ADD_BULK_NOTES } from '../actions/ActionTypes';
import { Note } from '../../models/Note';

const initialState: Note[] = [
    {
        id: 0,
        title: 'Heath',
        content: 'It is a long established fact that a reader will be distracted by the readabl',
        bgColor: '#F3FFE2',
        pinned: true,
        date: '5 June'
    },
    {
        id: 1,
        title: 'Family',
        content: 'There are many variations of passages',
        bgColor: '#FFF6F6',
        pinned: false,
        date: '5 June'
    },
    {
        id: 2,
        title: 'Shop List',
        content: '1. Clothes 2. Table 3. Pizza 4. Book 5.Pen',
        bgColor: '#FFF6F6',
        pinned: false,
        date: '5 June'
    },
    {
        id: 3,
        title: 'New Year',
        content: 'Contrary to popular belief',
        bgColor: '#FFF6F6',
        pinned: false,
        date: '5 June'
    },
    {
        id: 4,
        title: 'Food',
        content: 'There are many variations of passages',
        bgColor: '#FFF6F6',
        pinned: false,
        date: '5 June'
    },
    {
        id: 5,
        title: 'Personal',
        content: '1. Clothes 2. Table 3. Pizza',
        bgColor: '#FFF6F6',
        pinned: false,
        date: '5 June'
    },

];

const notes = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_BULK_NOTES:
            return [...action.payload];
        case ADD_NOTE:
            return [...state, action.payload];
        case DELETE_NOTE:
            let noteIndex = state.findIndex((note: Note) => note.id === action.id);
            state.splice(noteIndex, 1);
            return [...state];
        case PIN_NOTE:
            let index = state.findIndex((note: Note) => note.id === action.id);
            state[index].pinned = !state[index].pinned;
            return [...state];
        default:
            return state;
    }
}

export default notes;