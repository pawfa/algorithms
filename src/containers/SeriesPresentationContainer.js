/* eslint-disable no-unused-vars,require-jsdoc,no-invalid-this */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import SeriesBlock from '../components/SeriesBlock';
import {
  checkCorrectness,
  changeBlocksOrder,
  sendGraphData,
} from '../actions';
import './SeriesPresentationContainer.css';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import GraphContainer from './GraphContainer';
import {selectionSortChart} from '../algorithms/SelectionSort';
import {insertionSortChart} from '../algorithms/InsertionSort';
import {mergeSortChart} from '../algorithms/MergeSort';

class SeriesPresentationContainer extends Component {
  onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(
        this.props.workingSeries,
        result.source.index,
        result.destination.index,
    );

    this.props.changeBlocksOrder(items);
  };

  runSorting = () => {
    const {chartArray} = this.props.chartData;
    let array = chartArray.map((a) => Object.assign({}, a));
    const {algorithmType} = this.props;
    switch (algorithmType) {
      case 'SELECTIONSORT':
        selectionSortChart(array, this.props.sendGraphData, 0);
        break;
      case 'INSERTIONSORT':
        insertionSortChart(array, this.props.sendGraphData, 0);
        break;
      case 'MERGESORT':
        mergeSortChart(array, this.props.sendGraphData, 0);
        break;
      default:
        break;
    }
  };

  createBlock(i, numberObject) {
    const {value, id} = numberObject;
    const {wrongArray} = this.props;
    let blockClass = '';
    if (wrongArray.includes(id)) {
      blockClass = blockClass + 'wrong';
    }

    return (
        <Draggable key={id} draggableId={id} index={i}>
          {(provided, snapshot) => (
              <div
                  ref={provided.innerRef}
                  className={'item'}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style,
                  )
                  }
              >
                <SeriesBlock
                    key={id}
                    index={i}
                    id={id}
                    number={value}
                    resultClass={blockClass}/>
              </div>
          )}
        </Draggable>
    );
  }

  render() {
    const {
      workingSeries,
      iteration,
      end,
      chartData,
      algorithmType,
    } = this.props;
    let blocks = [];
    let showMessage = end
        ? 'Series is sorted'
        : 'Iteration number: ' + iteration;

    blocks = workingSeries.map((e, i) => this.createBlock(i, e))

    return (
        <div className={'container'}>
          <div className="row">
            <GraphContainer chartData={chartData}
                            algorithmType={algorithmType}
            />
            <button className={'buttonPresentation'} type='text'
                    onClick={this.runSorting}>Sort
            </button>
          </div>

          <div className="row">
            <div className={'iterationNumber'}><h5>{showMessage}</h5></div>
          </div>
          <div className="row">
            <DragDropContext onDragEnd={this.onDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal"
                         className={'blockContainer'}>
                {(provided, snapshot) => (
                    <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                    >
                      {blocks}
                    </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          <div className="row">
            <button className={'buttonPresentation'} type='text' disabled={end}
                    onClick={() => this.props.checkCorrectness()}>Check
            </button>
          </div>
        </div>
    );
  }
}

const grid = 8;

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#C3B6E3' : '#A79BC2',
  display: 'inline-flex',
  padding: grid,
  overflow: 'auto',
  border: '1px solid grey',
  borderRadius: '2px',
  margin: '0 auto',
  justifyContent: 'center',
});

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  ...draggableStyle,
});

const mapStateToProps = (state) => {
  return {
    initialSeries: state.seriesReducer.initialSeries,
    workingSeries: state.seriesReducer.workingSeries,
    wrongArray: state.seriesReducer.wrongArray,
    chartData: state.seriesReducer.chartData,
    iteration: state.seriesReducer.iteration,
    current: state.seriesReducer.current,
    algorithmType: state.seriesReducer.algorithmType,
    correct: state.seriesReducer.correct,
    end: state.seriesReducer.end,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeBlocksOrder: (dragIndex, hoverIndex, dragNumber) => {
      dispatch(changeBlocksOrder(dragIndex, hoverIndex, dragNumber));
    },
    checkCorrectness: () => {
      dispatch(checkCorrectness());
    },
    sendGraphData: (data) => {
      dispatch(sendGraphData(data));
    },
  };
};
SeriesPresentationContainer = connect(mapStateToProps, mapDispatchToProps)(
    SeriesPresentationContainer);
export default SeriesPresentationContainer;

