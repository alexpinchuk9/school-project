import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { submitPhoneForLogin, submitCodeForLogin, reinitLogin, setSessionCode } from "../actions/login";
import ServerResponseModal from "./ServerResponseModal";

class LoginForm extends Component {

    state = {
        phone: "",
        code: "",
        serverResponseModal: {
            open: false,
            message: ''
        }
    }

    handleChange = (property) => {
        this.setState({
            [property]: this[property].value
        })
    }

    componentDidUpdate(prevProps, prevState) {
        const { login, refreshItems, reinitLogin } = this.props;
        const prevServerResponse = prevProps.login.serverResponse;
        const newServerResponse = login.serverResponse;

        if (prevServerResponse !== newServerResponse && newServerResponse) {
            this.setState({
                serverResponseModal: {
                    ...this.state.serverResponseModal,
                    open: true,
                    message: newServerResponse
                },
                code: "",
                phone: ""
            })
        }

        if (login.codeVerified) {
            setSessionCode(login.sessionCode);
            refreshItems();
            reinitLogin();
        }
    }

    closeServerResponseModal = () => {
        const { reinitLogin } = this.props;

        this.setState((state, props) => ({
            serverResponseModal:
                {
                    ...state.serverResponseModal,
                    open: false
                }
        }), () => {
            setTimeout(() => {
                reinitLogin()
            }, 400)
        });
    }

    handleKeyPress = (event, data, callback) => {
        let { which } = event;
        if (which === 13) {
            callback(data)
        }
    }


    renderLoginForm = () => {
    const { phone, code } = this.state;
    const { submitPhoneForLogin, submitCodeForLogin, login } = this.props;

        const phoneForm = (
            <div className="login-form" onKeyPress={(event) => this.handleKeyPress(event, { phone }, submitPhoneForLogin)}>
                <button onClick={() => submitPhoneForLogin({ phone })} className="login-button">Log in:</button>
                <input
                    type="tel"
                    value={phone}
                    onChange={() => this.handleChange('phone')}
                    ref={input => this.phone = input}
                    placeholder="Enter your phone number"
                    className="login-input"/>
                <span title="Click to submit phone number">
                    <FontAwesomeIcon
                        size="lg"
                        icon={faSignInAlt}
                        className="login-icon"
                        onClick={() => submitPhoneForLogin({ phone })}/>
                </span>

            </div>
        );

        const codeForm = (
            <div className="login-form" onKeyPress={(event) => this.handleKeyPress(event, { code, phone }, submitCodeForLogin)}>
                <button  onClick={() => submitCodeForLogin({ code, phone })} className="login-button">Your code:</button>
                <input
                    type="text"
                    value={code}
                    onChange={() => this.handleChange('code')}
                    ref={input => this.code = input}
                    placeholder="Code from your phone"
                    className="login-input"/>
                <span title="Click to submit code">
                    <FontAwesomeIcon
                        size="lg"
                        icon={faSignInAlt}
                        className="login-icon"
                        onClick={() => submitCodeForLogin({ code, phone })}/>
                </span>
            </div>
        )

        return login.phoneVerified ? codeForm : phoneForm;
    }

    render() {
        const { serverResponseModal } = this.state;
        return (
           <Fragment>
               {this.renderLoginForm()}
               <ServerResponseModal
                   message={serverResponseModal.message}
                   isOpen={serverResponseModal.open}
                   closeModal={this.closeServerResponseModal}/>
          </Fragment>
        );
    }
}

LoginForm.propTypes = {
    refreshItems: PropTypes.func.isRequired,
    group: PropTypes.object,
    person: PropTypes.object
};

const mapStateToProps = state => {
    return {
        login: state.login
    }
}

const mapDispatchToProps = dispatch => {
    return {
        submitPhoneForLogin(data) {
            dispatch(submitPhoneForLogin(data))
        },
        submitCodeForLogin(data) {
            dispatch(submitCodeForLogin(data))
        },
        reinitLogin() {
            dispatch(reinitLogin())
        },
        setSessionCode(sessionCode) {
            dispatch(setSessionCode(sessionCode))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
