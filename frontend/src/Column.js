import React, { Component } from 'react';
import Card from './Card.js'
import CardPlaceholder from './CardPlaceholder.js'
import './bootstrap.css';
import './Column.css';

function Column(props) {
    return (
        <div className="Column col-md-3">
            <textarea onChange={(event) => {props.onEditColumnName(props.id, event.target.value)}}>{props.columnName}</textarea>
            <div className='AddCardButton col-md-3'
                onClick={() => props.onNewCardButtonClick(props.id)}>+</div>
            <ul>
                {props.cards.map((card) => {
                    return <Card key={card.id} id={card.id}
                        content={card.content}
                        votes={card.votes}
                        onEditCardContent={props.onEditCardContent}
                        onDragStart={(cardID) => {props.onDragStart(props.id, cardID)}}
                        onDrop={(cardID) => {props.onDrop(props.id, cardID)}} />;
                })}
                <CardPlaceholder
                    key={`placeHolder: ${props.id}`}
                    id={`placeHolder: ${props.id}`}
                    onDrop={(cardID) => {props.onDrop(props.id, cardID)}}
                />
            </ul>
        </div>
    )
}

export default Column;
