import React, {Component} from 'react';
import PropTypes from 'prop-types';

class WelcomeForm extends Component {

    render() {
        const { person, selectItem } = this.props;
        return (
            <div className="welcome-form">
                Hello
                <span
                    className="user-link"
                    onClick={() => selectItem(person)}
                    title="Click here to select user">
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
