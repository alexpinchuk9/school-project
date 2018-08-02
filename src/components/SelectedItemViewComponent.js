import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PersonComponent from "./PersonComponent";
import GroupComponent from "./GroupComponent";
import { isPerson } from "../utils/isPerson";

class SelectedItemViewComponent extends Component {

    renderSelectedItem = () => {

        const { item, guardians } = this.props;

        if (isPerson(item)) {
            return <PersonComponent guardians={guardians} person={item} isSelected={true} className="selected-item" />
        } else {
            return <GroupComponent group={item} isSelected={true} className="selected-item"/>
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
