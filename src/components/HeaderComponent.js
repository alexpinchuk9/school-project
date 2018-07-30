import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FaHome from 'react-icons/lib/fa/home';

import SearchBarComponent from "./SearchBarComponent";

class HeaderComponent extends Component {

    render() {

        const {
            onRefresh,
            onGoBack,
            previousSelectedItems,
            items,
            searchItems,
            search,
            resetSearchResults,
            homeItem,
            selectItem } = this.props;

        const goBackButton = previousSelectedItems.length ?
            <button title="למסך הקודם" className="go-back-button" onClick={onGoBack}></button> :
            <button title="אין מסך קודם" className="go-back-button disabled"></button>;

        const homeButton = homeItem ?
            <div className="shortcut-container" onClick={() => selectItem(homeItem)}>
                <FaHome />
                <button className="shortcut-button" title="לדף הבית">
                    {homeItem.groupName}
                </button>
            </div>
            : null;

        return (
            <div className="header">

                    {homeButton}

                <SearchBarComponent
                    items={items}
                    searchItems={searchItems}
                    search={search}
                    selectItem={selectItem}
                    resetSearchResults={resetSearchResults}
                />

                <div className="header-action-buttons">
                    <button title="רענון" className="refresh-button" onClick={onRefresh}></button>
                    {goBackButton}
                </div>



            </div>
        );
    }
}

HeaderComponent.propTypes = {
    onRefresh: PropTypes.func.isRequired
};

export default HeaderComponent;
