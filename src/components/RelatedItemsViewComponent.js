import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PersonComponent from "./PersonComponent";
import GroupComponent from "./GroupComponent";

class RelatedItemsViewComponent extends Component {

    renderPeople = () => {
        const { people } = this.props;
        if(people) {
            return people.map(person => <PersonComponent
                                                person={person}
                                                key={person.id}
                                                onClick={() => this.props.selectItem(person)}
                                                className="related-item"/>
            );
        }
        return null;
    }

    renderGroups = () => {
        const { groups } = this.props;
        if(groups) {
            return groups.map(group => <GroupComponent
                                                group={group}
                                                key={group.id}
                                                onClick={() => this.props.selectItem(group)}
                                                className="related-item"/>
            );
        }
        return null;
    }

    render() {
        const { className, people, groups } = this.props;
        if(!people.length && !groups.length) return null;
        return (
            <div className={`${className} related-items-view`}>
                {this.renderPeople()}
                {this.renderGroups()}
            </div>
        );
    }
}

RelatedItemsViewComponent.propTypes = {};

export default RelatedItemsViewComponent;
