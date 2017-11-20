import React, { Component } from 'react';
import './bootstrap.css';
import './Card.css';

class CardPlaceholder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragged: false,
            draggedOver: false
        };
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }

    dragOverHandler(event) {
        event.preventDefault();
        this.setState({
            draggedOver: true
        });
    }

    dragLeaveHandler(event) {
        this.setState({
            draggedOver: false
        })
    }

    dropHandler(event) {
        console.log('drop placeholder')
        event.preventDefault();
        this.props.onDrop(this.props.id)
        this.setState({
            dragged: false,
            draggedOver: false
        })
    }

    render(){
        return (
            <li onDragOver={this.dragOverHandler}
                onDrop={this.dropHandler}
                onDragLeave={this.dragLeaveHandler}>
                <div className={ this.state.draggedOver ? 'Placeholder' : ''} />
                <div className='CardPlaceholder'>
                    Hi I am placeholder {this.props.id}
                </div>
            </li>
        );
    }
}

export default CardPlaceholder;
