import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WelcomeForm extends Component {

    render() {
        const { person, selectItem } = this.props;
        return (
            <div className="welcome-form" onClick={() => selectItem(person)} title="Click here to select user">
                Welcome, {person.name}!
            </div>
        );
    }
}

WelcomeForm.propTypes = {
    person: PropTypes.object.isRequired,
    selectItem: PropTypes.func.isRequired
};

export default WelcomeForm;
