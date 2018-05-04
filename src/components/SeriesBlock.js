import React, { Component } from 'react'
import './SeriesBlock.css'
import PropTypes from 'prop-types'



class SeriesBlock extends Component {

    static propTypes = {
        index: PropTypes.number.isRequired,
        number: PropTypes.any.isRequired,
    };

    sendId = () =>{
        if(this.props.click){
            this.props.click(this.props.id);
        }
    };

    render () {
        const {number} = this.props;
        const {resultClass} = this.props;
        return <div className={'block '+resultClass} onClick={this.sendId}>{number}</div>
        // return connectDragSource(
        //     connectDropTarget(<div className={'block '+resultClass} style={Object.assign(opacity, pointer)} onClick={this.sendId}>{number}</div>,{ dropEffect }),
        // );
    }
}

export default SeriesBlock;