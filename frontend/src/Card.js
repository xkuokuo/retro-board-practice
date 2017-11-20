import React, { Component } from 'react';
import './bootstrap.css';
import './Card.css';

class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dragged: false,
            draggedOver: false
        };

        this.dragStartHandler = this.dragStartHandler.bind(this);
        this.dragOverHandler = this.dragOverHandler.bind(this);
        this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
        this.dragEndHandler = this.dragEndHandler.bind(this);
        this.dropHandler = this.dropHandler.bind(this);
    }

    // event handler as drag source
    dragStartHandler(event) {
        /*
        event.target.style.opacity = '1.0';
        let dragImage = event.target.cloneNode(true);
        dragImage.style.position = "absolute";
        console.log(event.target.offsetWidth);
        console.log(event.target.offsetHeight);
        dragImage.style.width = `${event.target.offsetWidth}px`;
        dragImage.style.height = `${event.target.offsetHeight}px`;
        document.body.appendChild(dragImage);

        event.dataTransfer.setDragImage(dragImage, 0, 0);
        */

        this.props.onDragStart(this.props.id)
        this.setState({
            dragged: true,
        })
    }

    dragEndHandler(event) {
        event.target.style.opacity = '1.0';
        this.setState({
            dragged: false
        })
    }

    // event handler as drop target
    dropHandler(event) {
        event.preventDefault();
        this.props.onDrop(this.props.id)
        this.setState({
            dragged: false,
            draggedOver: false
        })
    }

    dragOverHandler(event) {
        event.preventDefault();
        if (!this.state.dragged) {
            this.setState({
                draggedOver: true
            });
        }
    }

    dragLeaveHandler(event) {
        console.log('leave')
        this.setState({
            draggedOver: false
        })
    }

    render(){
        return (
            <li draggable='true'
                onDragStart={this.dragStartHandler}
                onDragOver={this.dragOverHandler}
                onDragLeave={this.dragLeaveHandler}
                onDragEnd={this.dragEndHandler}
                onDrop={this.dropHandler}>
                <div className={ this.state.draggedOver ? 'Placeholder' : ''} />
                <div className={`Card ${this.state.dragged ? 'Dragged' : ''}`}>
                    <p>{this.props.id}</p>
                    <textarea onChange={(event) => this.props.onEditCardContent(this.props.id, event.target.value)}>
                        {this.props.content}
                    </textarea>
                    <p>{this.props.votes}</p>
                </div>
            </li>
        )
    }
}

export default Card;
