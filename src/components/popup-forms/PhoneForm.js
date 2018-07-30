import React, {Component} from 'react';
import PropTypes from 'prop-types';

class PhoneForm extends Component {

    copyToClipboard = (str) => {
        const el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };

    render()  {

        const { person, handleClose } = this.props;

        this.copyToClipboard(person.cellphone);

        return (
            <div className="form phone-form">
                <button className="button-close" onClick={handleClose} title="סגירה"></button>

                <div className="form-row">
                    <div className="form-text">
                        {person.cellphone}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-text">
                        המספר הועתק ללוח העריכה
                    </div>
                </div>

                <div className="form-row">
                    <button onClick={handleClose} className="button-submit">סגירה</button>
                </div>

            </div>
        );
    }
}

PhoneForm.propTypes = {
    person: PropTypes.object.isRequired,
    handleClose: PropTypes.object.isRequired
};

export default PhoneForm;
