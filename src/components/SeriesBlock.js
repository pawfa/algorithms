import React, { Component } from 'react'
import './SeriesBlock.css'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import ItemTypes from '../ItemTypes'
import {flow} from "lodash/util";
import PropTypes from 'prop-types'


class SeriesBlock extends Component {

    static propTypes = {
        connectDragSource: PropTypes.func.isRequired,
        connectDropTarget: PropTypes.func.isRequired,
        isDragging: PropTypes.bool.isRequired,
        index: PropTypes.number.isRequired,
        number: PropTypes.any.isRequired,
        moveBlock: PropTypes.func.isRequired,
        resultClass: PropTypes.string.isRequired
    };

    render () {
        const {
            number,
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;
        const {resultClass} = this.props;
        return connectDragSource(
            connectDropTarget(<div className={'block '+resultClass} style={{opacity }}>{number}</div>),
        );
    }
}

const blockSource = {
    beginDrag(props) {
        return {
            index: props.index
        }
    },
};

const blockTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return
        }

        // Time to actually perform the action
        props.moveBlock(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex
    },
};


export default flow(DropTarget(ItemTypes.BLOCK, blockTarget,  connect => ({
    connectDropTarget: connect.dropTarget(),
})),DragSource(ItemTypes.BLOCK, blockSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
})))(SeriesBlock);