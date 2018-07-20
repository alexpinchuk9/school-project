import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectedItemViewComponent from "./SelectedItemViewComponent";
import RelatedItemsViewComponent from "./RelatedItemsViewComponent";
import HeaderComponent from "./HeaderComponent";
import { ClipLoader } from 'react-spinners';

class MainPageComponent extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    renderRelatedItemsAbove = () => {

        const { items, selectedItem } = this.props.items;

          if (selectedItem && selectedItem.hasOwnProperty('surname')) {

              const groupsAboveIds = items.p2g
                  .filter(relation => relation.peopleId === selectedItem.id)
                  .map(relation => relation.groupId);


              const groupsAbove = items.groups
                  .filter(group => groupsAboveIds
                      .some(groupAboveId => groupAboveId === group.id));

              return <RelatedItemsViewComponent
                                groups={groupsAbove}
                                people={[]}
                                selectItem={this.props.selectItem}
                                className="related-items-view-above"
                                />

          } else if (selectedItem) {

              const groupsAboveIds = items.g2g
                  .filter(relation => relation.containedGroupId === selectedItem.id)
                  .map(relation => relation.containerGroupId);

              const groupsAbove = items.groups
                  .filter(group => groupsAboveIds
                      .some(groupAboveId => groupAboveId === group.id));

             return  <RelatedItemsViewComponent
                                groups={groupsAbove}
                                people={[]}
                                selectItem={this.props.selectItem}
                                className="related-items-view-above"
                                />
          }
    }

    renderRelatedItemsBelow = () => {

        const {items, selectedItem } = this.props.items;

        if (selectedItem && selectedItem.hasOwnProperty('surname')) {

            const dependantPeopleIds = items.p2p
                .filter(relation => relation.guardianId === selectedItem.id)
                .map(relation => ({id: relation.peopleId}));

            const dependantPeople = items.people
                .filter(person => dependantPeopleIds
                    .some(dependantPeopleId => dependantPeopleId.id === person.id));

            const guardianPeopleIds = items.p2p
                .filter(relation => relation.peopleId === selectedItem.id)
                .map(relation => ({id: relation.guardianId, relation: relation.relation}));

            const guardianPeople = items.people
                .filter(person => guardianPeopleIds
                    .some(guardianPeopleId => guardianPeopleId.id === person.id))
                .map(person => {
                    let result = {};
                    guardianPeopleIds.map(guardianPeopleId => {
                        if (person.id === guardianPeopleId.id) {
                            result = {...person, relation: guardianPeopleId.relation}
                        }
                    });

                    return result;
                });

            const peopleBelow = [...dependantPeople, ...guardianPeople];

            return <RelatedItemsViewComponent
                                people={peopleBelow}
                                groups={[]}
                                selectItem={this.props.selectItem}
                                className="related-items-view-below"
                                />

        } else if (selectedItem) {

            const peopleBelowIds = items.p2g
                .filter(relation => relation.groupId === selectedItem.id)
                .map(relation => ({id: relation.peopleId, relation: relation.relation}));
            const groupsBelowIds = items.g2g
                .filter(relation => relation.containerGroupId === selectedItem.id)
                .map(relation => relation.containedGroupId);

            const peopleBelow = items.people
                .filter(person => peopleBelowIds
                    .some(personBelowId => personBelowId.id === person.id))
                    .map(person => {
                    let result = {};
                    peopleBelowIds.map(personBelowId => {
                        if (person.id === personBelowId.id) {
                            result = {...person, relation: personBelowId.relation}
                        }
                    });

                    return result;
                });


            const groupsBelow = items.groups
                .filter(group => groupsBelowIds
                    .some(groupBelowId => groupBelowId === group.id));

           return <RelatedItemsViewComponent
                                people={peopleBelow}
                                groups={groupsBelow}
                                selectItem={this.props.selectItem}
                                className="related-items-view-below"
                                />
        }
    }

    renderSelectedItem = () => {
        const { selectedItem } = this.props.items;

        if (selectedItem) {
            return <SelectedItemViewComponent item={selectedItem} />
        }
    }

    render() {
        const {  loading, error, selectedItem, previousSelectedItem, shortcutItems } = this.props.items;

        const { refreshItems, goBack, selectItem } = this.props;

        if (loading) {
            return (
                <div className="main-page loading">
                    <ClipLoader  color={'#123abc'} />
                </div>);
        } else if (error) {
            return (
                <div className="main-page">
                    <div className="error-message">
                        Oops! Something went wrong.
                    </div>
                </div>
            );
        }

        return (
            <div className="main-page">
                <HeaderComponent
                    onRefresh={() => refreshItems(selectedItem)}
                    onGoBack={goBack}
                    previousItem={previousSelectedItem}
                    shortcutItems={shortcutItems}
                    selectItem={selectItem}
                >
                </HeaderComponent>
                {this.renderRelatedItemsAbove()}
                {this.renderSelectedItem()}
                {this.renderRelatedItemsBelow()}
            </div>
        );
    }
}

MainPageComponent.propTypes = {
    items: PropTypes.object,
    getItems: PropTypes.func.isRequired,
    selectItem: PropTypes.func.isRequired
};

export default MainPageComponent;
