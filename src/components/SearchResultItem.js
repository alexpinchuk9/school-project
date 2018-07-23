import React, {Component} from 'react';
import PropTypes from 'prop-types';

class SearchResultItem extends Component {

    render() {

        const { item, onClick, onMouseEnter } = this.props;

        const displayText = item.hasOwnProperty('surname') ? `${item.name} ${item.surname}` : item.groupName;

        return (
            <div className="search-result-item" onClick={onClick} onMouseEnter={ () => onMouseEnter(displayText)}>
                {displayText}
            </div>
        );
    }
}

SearchResultItem.propTypes = {};

export default SearchResultItem;
