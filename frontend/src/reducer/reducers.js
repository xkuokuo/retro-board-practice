import { combineReducers } from 'redux'
import { NEW_COLUMN,
    EDIT_COLUMN_NAME,
    NEW_CARD,
    EDIT_CARD_CONTENT,
    DRAG_START,
    DROP} from '../actions.js'
import {without, insert, indexOf, remove} from 'ramda'

const initialState = {
    boardID: '1',
    columns: {
        byID: {
            'f7775e7c-6c41-aaf2-4bfe-b36f5e3a47d5': {
                id: 'f7775e7c-6c41-aaf2-4bfe-b36f5e3a47d5',
                columnName: 'went well',
                cards: ['1', '2']
            }
        },
        allIDs: ['f7775e7c-6c41-aaf2-4bfe-b36f5e3a47d5']
    },
    cards: {
        byID: {
            '1': {
                id: '1',
                content: 'I love dog',
                votes: 0
            },
            '2': {
                id: '2',
                content: 'She love cat',
                votes: 1
            }
        },
        allIDs: ['1', '2']
    }
}

function cardReducer(state = initialState.cards, action) {
    switch (action.type) {
        case NEW_CARD:
            return Object.assign({}, {
                byID: Object.assign({}, state.byID,
                    {[action.cardID]: {
                        id: action.cardID,
                        content: 'New Card',
                        votes: 0}
                    }
                ),
                allIDs: [...state.allIDs, action.cardID]
            });
        case EDIT_CARD_CONTENT:
            return Object.assign({}, {
                byID: Object.assign({}, state.byID,
                    {[action.cardID]: {
                        id: action.cardID,
                        content: action.cardContent,
                        votes: state.byID[action.cardID].votes
                    }
                }),
                allIDs: [...state.allIDs]
         });
        default:
            return state;
    }
}

function columnsReducer(state = initialState.columns, action) {
    switch (action.type) {
        case NEW_COLUMN:
            return Object.assign({}, {
                byID: Object.assign({}, state.byID,
                    {[action.columnID]: {
                        id: action.columnID,
                        columnName: 'New Column',
                        cards: []}
                    }
                ),
                allIDs: [...state.allIDs, action.columnID]
            });
        case EDIT_COLUMN_NAME:
            return Object.assign({}, {
                byID: Object.assign({}, state.byID,
                    {[action.columnID]: {
                        id: action.columnID,
                        columnName: action.columnName,
                        cards: [...state.byID[action.columnID].cards]}
                    }
                ),
                allIDs: state.allIDs
            });
        case NEW_CARD:
            return Object.assign({}, {
                byID: Object.assign({}, state.byID,
                    {[action.columnID]: {
                        id: action.columnID,
                        columnName: state.byID[action.columnID].columnName,
                        cards: [...state.byID[action.columnID].cards, action.cardID]}
                    }
                ),
                allIDs: state.allIDs
            });
        case DRAG_START:
            return Object.assign({}, state, {
                isDragging: true,
                dragFrom: {
                    columnID: action.columnID,
                    cardID: action.cardID
                },
                dragTo: {
                    columnID: action.columnID,
                    cardID: action.cardID
                }
            });
        case DROP: {
            const moveToSameColumn = (toIndex, fromIndex, cards) => {
                let tmp = insert(toIndex, cards[fromIndex], cards)
                if (fromIndex < toIndex) {
                    return remove(fromIndex, 1, tmp)
                } else {
                    return remove(fromIndex + 1, 1, tmp)
                }
            }

            let dragFromCardID = state.dragFrom.cardID;
            let dragFromColumnID = state.dragFrom.columnID;
            let dragFromColumnName = state.byID[dragFromColumnID].columnName;

            let dragToCardID = action.cardID;
            let dragToColumnID = action.columnID;
            let dragToColumnName = state.byID[dragToColumnID].columnName;

            let dragFromCards = state.byID[state.dragFrom.columnID].cards
            let dragToCards = state.byID[dragToColumnID].cards

            let dragFromIndex = indexOf(dragFromCardID, dragFromCards)
            let dragToIndex = indexOf(dragToCardID, dragToCards)
            dragToIndex = dragToIndex >= 0 ? dragToIndex : dragToCards.length

            if (dragFromColumnID!= dragToColumnID) {
                return Object.assign({}, state,
                    {
                        isDragging: false
                    }, {
                        byID: Object.assign({}, state.byID,
                            {[dragFromColumnID]: {
                                id: dragFromColumnID,
                                columnName: dragFromColumnName,
                                cards: without([dragFromCardID], dragFromCards)
                            }},
                            {[dragToColumnID]: {
                                id: dragToColumnID,
                                columnName: dragToColumnName,
                                cards: insert(dragToIndex, dragFromCardID, dragToCards)}}
                )});
            } else {
                return Object.assign({}, state,
                    {
                        isDragging: false
                    }, {
                        byID: Object.assign({}, state.byID,
                            {[dragFromColumnID]: {
                                id: dragFromColumnID,
                                columnName: dragFromColumnName,
                                cards: moveToSameColumn(dragToIndex, dragFromIndex, dragToCards)
                            }}
                )});
            }
        }
        default:
            return state;
    }
}

const StateReducer = combineReducers({
    cards: cardReducer,
    columns: columnsReducer
})

export default StateReducer;
