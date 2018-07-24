import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { ClipLoader } from 'react-spinners';

import filters from "../utils/filters";

import SelectedItemViewComponent from "./SelectedItemViewComponent";
import RelatedItemsViewComponent from "./RelatedItemsViewComponent";
import HeaderComponent from "./HeaderComponent";



class MainPageComponent extends Component {

    componentDidMount() {
        this.props.getItems();
    }

    renderRelatedItemsAbove = () => {

        const { items, selectedItem } = this.props.items;

          if (selectedItem && selectedItem.hasOwnProperty('surname')) {

              const groupsAbove = filters.filterContainerGroupsForPeople(items, selectedItem);

              return <RelatedItemsViewComponent
                                groups={groupsAbove}
                                people={[]}
                                selectItem={this.props.selectItem}
                                className="related-items-view-above"
                                />

          } else if (selectedItem) {

              const groupsAbove = filters.filterContainerGroupsForGroup(items, selectedItem);

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


            const dependantPeople = filters.filterDependantPeople(items, selectedItem);
            const guardianPeople = filters.filterGuardianPeople(items, selectedItem);

            const peopleBelow = [...dependantPeople, ...guardianPeople];

            return <RelatedItemsViewComponent
                                people={peopleBelow}
                                groups={[]}
                                selectItem={this.props.selectItem}
                                className="related-items-view-below"
                                />

        } else if (selectedItem) {


            const groupsBelow = filters.filterContainedGroups(items, selectedItem);
            const peopleBelow = filters.filterContainedPeople(items, selectedItem);

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

        const {
            refreshItems,
            goBack,
            search,
            searchItems,
            selectItem,
            resetSearchResults,
            items: {
                loading,
                items,
                error,
                selectedItem,
                previousSelectedItems,
                homeItem }
        } = this.props;

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
                    previousSelectedItems={previousSelectedItems}
                    homeItem={homeItem}
                    selectItem={selectItem}
                    items={items}
                    searchItems={searchItems}
                    search={search}
                    resetSearchResults={resetSearchResults}
                />
                <div className="items-container">
                    {this.renderRelatedItemsAbove()}
                    {this.renderSelectedItem()}
                    {this.renderRelatedItemsBelow()}
                </div>
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
