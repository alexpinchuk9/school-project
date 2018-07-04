import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PersonComponent from "./PersonComponent";
import GroupComponent from "./GroupComponent";

class SelectedItemViewComponent extends Component {

    renderSelectedItem = () => {
        const { item } = this.props;
        if(item.hasOwnProperty('surname')) {
            return <PersonComponent person={item} isSelected={true} />
        } else {
            return <GroupComponent group={item} isSelected={true} />
        }
    }
    render() {
        return (
            <div className="selected-item">
                {this.renderSelectedItem()}
            </div>
        );
    }
}

SelectedItemViewComponent.propTypes = {};

export default SelectedItemViewComponent;
