import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PersonComponent from "./PersonComponent";
import GroupComponent from "./GroupComponent";
import { isPerson } from "../utils/isPerson";

class SelectedItemViewComponent extends Component {

    renderSelectedItem = () => {

        const { item, guardians, containerGroups, user } = this.props;

        if (isPerson(item)) {
            return <PersonComponent
                            user={user}
                            guardians={guardians}
                            person={item}
                            isSelected
                            className="selected-item"
                            containerGroups={containerGroups}/>
        } else {
            return <GroupComponent
                            user={user}
                            group={item}
                            isSelected
                            className="selected-item"/>
        }
    }

    render() {
        return (
            <div className="selected-item-view">
                {this.renderSelectedItem()}
            </div>
        );
    }
}

SelectedItemViewComponent.propTypes = {
    item: PropTypes.object
};

export default SelectedItemViewComponent;
