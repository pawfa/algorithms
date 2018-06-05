/* eslint-disable no-unused-vars,require-jsdoc,no-invalid-this */
import React, {Component} from 'react';
import './SeriesBlock.css';
import PropTypes from 'prop-types';

class SeriesBlock extends Component {
    static propTypes = {
        index: PropTypes.number.isRequired,
        number: PropTypes.any.isRequired,
    };

    sendId = () =>{
        if (this.props.click) {
            this.props.click(this.props.id);
        }
    };

    render() {
        const {number} = this.props;
        const {resultClass} = this.props;
        return <div className={'block '+resultClass} onClick={this.sendId}>{number}</div>;
    }
}

export default SeriesBlock;
