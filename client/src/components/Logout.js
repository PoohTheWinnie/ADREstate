import React, { Component, Fragment } from 'react';
import { logout } from '../actions/authActions';
import { connect } from 'react-redux';
import { NavLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };
    render() {
        return(
            <Fragment>
                <NavLink onClick={this.props.logout} href="#">
                    <Link to="/">
                        <strong>LOGOUT</strong>
                    </Link>
                </NavLink>
            </Fragment>
        )
    }
}

export default connect(null, { logout })(Logout);