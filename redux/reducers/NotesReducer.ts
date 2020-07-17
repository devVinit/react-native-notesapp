import { ADD_NOTE, DELETE_NOTE, PIN_NOTE } from '../actions/ActionTypes';
import { Note } from '../../models/Note';

const initialState: Note[] = [
    {
        title: 'Title',
        content: 'Lorem Ipsum Idom',
        bgColor: '#F3FFE2',
        pinned: false
    },
    {
        title: 'Title 2',
        content: 'Lorem Ipsum Idom',
        bgColor: '#FFF6F6',
        pinned: false
    },
    {
        title: 'Title 3',
        content: 'Lorem Ipsum Idom',
        bgColor: '#FFF6F6',
        pinned: false
    }
];

const notes = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_NOTE:
            return [...state, action.payload];
        case DELETE_NOTE:
            state.splice(action.index);
            return [...state];
        case PIN_NOTE:
            state[action.index].pinned = true;
            return [...state];
        default:
            return state;
    }
}

export default notes;