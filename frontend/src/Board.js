import React, { Component } from 'react';
import Column from './Column.js';
import './Board.css';
import './bootstrap.css';

function Board(props) {
  return (
      <div className='Board container-fluid'>
        <p>
            "Hi I'm a board"
        </p>
        <div className='row'>
          {props.columns.allIDs.map((id) => {
              let columnToAdd = props.columns.byID[id];
              let cardIDsToAdd = columnToAdd.cards;
              let cardsToAdd = cardIDsToAdd.map((cardID) => {return props.cards.byID[cardID]})
              return <Column id={columnToAdd.id}
                key={columnToAdd.id}
                columnName={columnToAdd.columnName}
                onEditColumnName={props.onEditColumnName}
                cards={cardsToAdd}
                onNewCardButtonClick={props.onNewCardButtonClick}
                onEditCardContent={props.onEditCardContent}
                onDragStart={props.onDragStart}
                onDrop={props.onDrop} />
          })}
          <div className='AddColumnButton col-md-3'
            onClick={props.onNewBoardButtonClick}>+</div>
        </div>
      </div>
    );
}

export default Board;
