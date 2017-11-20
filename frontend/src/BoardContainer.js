import React, { Component } from 'react';
import { connect } from 'react-redux'
import { newColumn, editColumnName, newCard, editCardContent, dragStart, drop} from './actions.js'
import Board from './Board.js';

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

const mapStateToProps = (state, ownProps) => {
    return {
        columns: state.columns,
        cards: state.cards
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNewBoardButtonClick: () => {
      let randomColumnID = guid();
      dispatch(newColumn(guid()));
    },
    onEditColumnName: (columnID, columnName) => {
      dispatch(editColumnName(columnID, columnName));
    },
    onNewCardButtonClick: (columnID) => {
      let randomColumnID = guid();
      dispatch(newCard(columnID, guid()));
    },
    onEditCardContent: (cardID, cardContent) => {
      dispatch(editCardContent(cardID, cardContent));
    },
    onDragStart: (columnID, cardID) => {
      dispatch(dragStart(columnID, cardID));
    },
    onDrop: (columnID, cardID) => {
      dispatch(drop(columnID, cardID));
    },
  }
}

const BoardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default BoardContainer;
