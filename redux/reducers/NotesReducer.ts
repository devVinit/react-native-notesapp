import { ADD_NOTE, DELETE_NOTE, PIN_NOTE } from '../actions/ActionTypes';
import { Note } from '../../models/Note';

const initialState: Note[] = [
    {
        title: 'Heath',
        content: 'It is a long established fact that a reader will be distracted by the readabl',
        bgColor: '#F3FFE2',
        pinned: true,
        date: new Date()
    },
    {
        title: 'Family',
        content: 'There are many variations of passages',
        bgColor: '#FFF6F6',
        pinned: false,
        date: new Date()
    },
    {
        title: 'Shop List',
        content: '1. Clothes 2. Table 3. Pizza 4. Book 5.Pen',
        bgColor: '#FFF6F6',
        pinned: false,
        date: new Date()
    },
    {
        title: 'New Year',
        content: 'Contrary to popular belief',
        bgColor: '#FFF6F6',
        pinned: false,
        date: new Date()
    },
    {
        title: 'Food',
        content: 'There are many variations of passages',
        bgColor: '#FFF6F6',
        pinned: false,
        date: new Date()
    },
    {
        title: 'Personal',
        content: '1. Clothes 2. Table 3. Pizza',
        bgColor: '#FFF6F6',
        pinned: false,
        date: new Date()
    },

];

const notes = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_NOTE:
            return [...state, action.payload];
        case DELETE_NOTE:
            state.splice(action.index);
            return [...state];
        case PIN_NOTE:
            state[action.index].pinned = !state[action.index].pinned;
            return [...state];
        default:
            return state;
    }
}

export default notes;