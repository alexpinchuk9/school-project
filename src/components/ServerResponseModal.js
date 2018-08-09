import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ServerResponseModal extends Component {
    render() {
        const { message, closeModal, isOpen } = this.props;
        console.log(this.props);
        return (
            <div className={`server-response-modal modal ${isOpen ? 'visible' : ''} `}>
                <h1 className="modal-header">Here's what the server said:</h1>
                <div className="modal-message">
                    {message}
                </div>
                <div className="modal-close">
                    <button className="modal-close-button" onClick={closeModal}>
                        Okay, got it!
                    </button>
                </div>
            </div>
        );
    }
}

ServerResponseModal.propTypes = {
    message: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default ServerResponseModal;
