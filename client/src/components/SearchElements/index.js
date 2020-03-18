import './styles.css';
import React from 'react';
import * as selectors from '../../reducers'
import { connect } from 'react-redux';
import Element from '../Element'
import * as actions from '../../actions/app'

const SearchElements = ({elements,onSubmit}) => (
    <div className="searchElements">
        <div className="result_header">
            <button className="return" type="submit" onClick={onSubmit}>
            </button>
            <div className="result_title"><strong>RESULT:</strong></div>
        </div>
            {elements.map(
                element => (
                    <Element key={element} id={element}>
                    </Element>
                )
        )}
    </div>
  )

export default connect(
    (state)=>({
        elements:selectors.getSearchedElements(state),
    }),
    dispatch=>({
        onSubmit(){
            dispatch(actions.changeState(1))
        }
    })
)(SearchElements)
