import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WelcomeForm extends Component {

    render() {
        const { person, selectItem } = this.props;
        return (
            <div className="welcome-form">
                שלום
                <span
                    className="user-link"
                    onClick={() => selectItem(person)}
                    title="לחץ כאן כדי לבחור את המשתמש">
                  {person.name}!
                </span>
            </div>
        );
    }
}

WelcomeForm.propTypes = {
    person: PropTypes.object.isRequired,
    selectItem: PropTypes.func.isRequired
};

export default WelcomeForm;
