import { connect } from 'react-redux';
import React, { Fragment } from 'react'
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import Header from '../Header'

const AppState = () => (
    <Fragment>
        <Header></Header>
    </Fragment>
)

export default connect(
    undefined,
    undefined
)(AppState)