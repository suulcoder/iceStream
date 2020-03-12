import { connect } from 'react-redux';
import React, { Fragment } from 'react'
import * as selectors from '../../reducers'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Header from '../Header'

class AppState extends React.Component{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired,
        babiesIDs: PropTypes.array.isRequired,
    };

    render(){
        const{ location } = this.props;
        return(
            <Fragment>
                <Header></Header>
            </Fragment>
        )
    }
}

export default withRouter(connect(
    undefined,
    undefined
)(AppState))