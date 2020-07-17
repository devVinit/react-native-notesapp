import { ADD_NOTE, UPDATE_NOTE, DELETE_NOTE, PIN_NOTE } from '../actions/ActionTypes';
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
            return state;
        case UPDATE_NOTE:
            return state;
        case DELETE_NOTE:
            return state;
        case PIN_NOTE:
            return state;
        default:
            return state;
    }
}

export default notes;