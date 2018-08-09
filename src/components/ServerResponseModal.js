import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ServerResponseModal extends Component {

    handleClick = (event) => {
        let { target } = event;
        const { closeModal } = this.props;

        while (target.tagName !== 'BODY') {
            if (target.classList.contains(`server-response-modal`)) {
                return;
            }
            target = target.parentElement;
        }
      closeModal();
    }

    handleKeyEvent = (event) => {
        let { which, keyCode } = event;
        const { closeModal } = this.props;
        if (which === 27 || keyCode === 27) {
            closeModal();
        }
    }

    render() {
        const { message, closeModal, isOpen } = this.props;

        return (
            <div
                className={`modal-overlay ${isOpen ? 'visible' : ''}`}
                onClick={this.handleClick}
                onKeyDown={this.handleKeyEvent}
                onKeyPress={this.handleKeyEvent}
                tabIndex={-1}>
                <div className={`server-response-modal modal ${isOpen ? 'visible' : ''} `}>
                    <h1 className="modal-header">Here's what the server said:</h1>
                    <div className="modal-message">
                        {message}
                    </div>
                    <div className="modal-close">
                        <button className="modal-close-button" onClick={closeModal}>
                            Okay, got it! Close modal
                        </button>
                    </div>
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
