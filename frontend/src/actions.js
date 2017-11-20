/*
 * action types:
    new column
    delete column
    edit column name

    new card
    delete card
    edit card content
    vote card

    move card
 */

export const NEW_CARD = 'NEW_CARD'
export const EDIT_CARD_CONTENT= 'EDIT_CARD_CONTENT'
export const NEW_COLUMN = 'NEW_COLUMN'
export const EDIT_COLUMN_NAME = 'EDIT_COLUMN_NAME'

// Drag related action
export const DRAG_START = 'DRAG_START'
export const DROP = 'DROP'

/*
 * action creators
 */

export function newColumn(columnID) {
  return {
    type: NEW_COLUMN,
    columnID: columnID
  }
}

export function editColumnName(columnID, columnName) {
  return {
    type: EDIT_COLUMN_NAME,
    columnID: columnID,
    columnName: columnName
  }
}

export function newCard(columnID, cardID) {
  return {
    type: NEW_CARD,
    columnID: columnID,
    cardID: cardID
  }
}

export function editCardContent(cardID, cardContent) {
  return {
    type: EDIT_CARD_CONTENT,
    cardID: cardID,
    cardContent: cardContent
  }
}

export function dragStart(columnID, cardID) {
  return {
    type: DRAG_START,
    columnID: columnID,
    cardID: cardID,
  }
}

export function drop(columnID, cardID) {
    return {
        type: DROP,
        columnID: columnID,
        cardID: cardID,
    }
}

