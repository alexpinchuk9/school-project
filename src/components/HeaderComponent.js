import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import FaHome from 'react-icons/lib/fa/home';

import SearchBarComponent from "./SearchBarComponent";
import LoginForm from "./LoginForm";
import WelcomeForm from "./WelcomeForm";
import LogoutForm from "./LogoutForm";
import { faUndoAlt, faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            user,
            selectItem } = this.props;

        const goBackButton = previousSelectedItems.length ?
            (
                <span title="למסך הקודם">
                    <FontAwesomeIcon
                        size="2x"
                        icon={faChevronCircleLeft}
                        className="go-back-button"
                        onClick={onGoBack}/>
                </span>

            ) :
            (
                <span title="אין מסך קודם">
                    <FontAwesomeIcon
                        size="2x"
                        icon={faChevronCircleLeft}
                        className="go-back-button disabled"/>
                </span>

            );

        const profileSection = user ?
            (
                <div className="profile-section">
                    <WelcomeForm person={user} selectItem={selectItem}/>
                    <LogoutForm refreshItems={onRefresh}/>
                </div>
            ) :
            (
                <LoginForm refreshItems={onRefresh}/>
            );



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
                <div className="profile-and-search-wrapper">
                    {profileSection}
                    <SearchBarComponent
                        items={items}
                        searchItems={searchItems}
                        search={search}
                        selectItem={selectItem}
                        resetSearchResults={resetSearchResults}
                    />
                </div>

                <div className="header-action-buttons">
                    <span title="רענון">
                       <FontAwesomeIcon
                           size="2x"
                           icon={faUndoAlt}
                           onClick={onRefresh}
                           className="refresh-button" />
                    </span>
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
