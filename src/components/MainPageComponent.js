import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SelectedItemViewComponent from "./SelectedItemViewComponent";
import RelatedItemsViewComponent from "./RelatedItemsViewComponent";
import { ClipLoader } from 'react-spinners';

class MainPageComponent extends Component {
    componentDidMount() {
        this.props.getItems();
    }

    renderRelatedItemsAbove = () => {
        const { items, selectedItem } = this.props.items;

          if(selectedItem && selectedItem.hasOwnProperty('surname')) {

              const peopleAboveIds = items.p2p
                  .filter(relation => relation.guardianId === selectedItem.id)
                  .map(relation => ({id: relation.peopleId}));
              const groupsAboveIds = items.p2g
                  .filter(relation => relation.peopleId === selectedItem.id)
                  .map(relation => relation.groupId);

              let peopleAbove = items.people
                  .filter(person => peopleAboveIds
                      .some(personAboveId => personAboveId.id === person.id));

              const groupsAbove = items.groups
                  .filter(group => groupsAboveIds
                      .some(groupAboveId => groupAboveId === group.id));

              return <RelatedItemsViewComponent
                                people={peopleAbove}
                                groups={groupsAbove}
                                selectItem={this.props.selectItem}/>

          } else if(selectedItem) {

              const groupsAboveIds = items.g2g
                  .filter(relation => relation.containedGroupId === selectedItem.id)
                  .map(relation => relation.containerGroupId);

              const groupsAbove = items.groups
                  .filter(group => groupsAboveIds
                      .some(groupAboveId => groupAboveId === group.id));

             return  <RelatedItemsViewComponent
                                groups={groupsAbove}
                                selectItem={this.props.selectItem}/>
          }
    }

    renderRelatedItemsBelow = () => {
        const {items, selectedItem } = this.props.items;

        if(selectedItem && selectedItem.hasOwnProperty('surname')) {

            const peopleBelowIds = items.p2p
                .filter(relation => relation.peopleId === selectedItem.id)
                .map(relation => ({id: relation.guardianId, relation: relation.relation}));

            const peopleBelow = items.people
                .filter(person => peopleBelowIds
                    .some(personBelowId => personBelowId.id === person.id))
                .map(person => {
                    let result = {};
                    peopleBelowIds.map(personBelowId => {
                        if(person.id === personBelowId.id) {
                            result = {...person, relation: personBelowId.relation}
                        }
                    });
                    return result;
                });

            return <RelatedItemsViewComponent
                                people={peopleBelow}
                                selectItem={this.props.selectItem} />

        } else if(selectedItem) {

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
                        if(person.id === personBelowId.id) {
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
                                selectItem={this.props.selectItem}/>
        }
    }

    renderSelectedItem = () => {
        const { selectedItem } = this.props.items;

        if(selectedItem) {
            return <SelectedItemViewComponent item={selectedItem} />
        }
    }

    render() {
        const {  loading, error } = this.props.items;
        if(loading) {
            return (
                <div className="main-page">
                    <ClipLoader  color={'#123abc'} />
                </div>);
        } else if(error) {
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
                {this.renderRelatedItemsAbove()}
                {this.renderSelectedItem()}
                {this.renderRelatedItemsBelow()}
            </div>
        );
    }
}

MainPageComponent.propTypes = {};

export default MainPageComponent;
