import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { logout } from "../actions/logout";

class LogoutForm extends Component {

    handleLogout = () => {
        const { logout, refreshItems } = this.props;
        logout();
        refreshItems();
    }
    render() {

        return (
            <div className="logout-form" title="Log out">
                <FontAwesomeIcon
                    size="lg"
                    icon={faSignOutAlt}
                    className="login-icon"
                    onClick={this.handleLogout}/>
            </div>
        );
    }
}

LogoutForm.propTypes = {};

const mapDispatchToProps = dispatch => {
    return {
        logout() {
            dispatch(logout())
        }
    }
}

export default connect(null, mapDispatchToProps)(LogoutForm);
