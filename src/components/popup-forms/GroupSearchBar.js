import React, { Component } from 'react'
import SearchResultItem from "../SearchResultItem";

class GroupSearchBar extends Component {

    state = {
        query: '',
        groupResults: [],
        activeId: null
    };

    handleInputChange = () => {

        this.setState({
            query: this.groupSearch.value
        }, () => {
            if (this.state.query) {
                this.props.searchGroups(this.state.query, this.props.groups);
                this.setState({ activeId: 0 })
            } else this.props.resetSearchResults();
        });
    };


    renderSearchResults = () => {

        const {  groupResults } = this.props.search;


        const { activeId } = this.state;


        if( this.state.query !== "" && !groupResults.length ) {
            return (
                <div className="no-results">
                    אין תוצאות מתאימות
                </div>
            );
        }

        return groupResults.map((result, index) => <SearchResultItem
            key={result.id}
            item={result}
            onClick={() => this.handleResultClick(result)}
            className={activeId === index ? "active" : ""}
            onMouseEnter={() => this.handleResultMouseEnter(index)}/>);
    }

    handleResultClick = (result) => {

        const { selectGroup, resetSearchResults } = this.props;

        this.setState({
            query: ""
        });

        selectGroup(result);
        resetSearchResults()
    }

    handleResultMouseEnter = (index) => {
        //
        // this.search.value = value;
        // this.setState({
        //     query: value
        // });

        console.log(index);
        this.setState((state,props) => ({ activeId: index}));
    }

    handleBlur = () => {

        const searchResults = document.getElementsByClassName('group-search-result-list')[0];

        searchResults.classList.remove('visible')
    };

    handleFocus = () => {

        const searchResults = document.getElementsByClassName('group-search-result-list')[0];

        searchResults.classList.add('visible')
    };

    handleArrowUpScroll = (newActiveId, groupResults) => {

        const searchResults = document.getElementsByClassName('group-search-result-list')[0];

        if (newActiveId > 3 && newActiveId !== 0) searchResults.scrollTop += 40;
        if (newActiveId === 0) searchResults.scrollTop = 0;
    }

    handleArrowDonwScroll = (newActiveId, groupResults) => {

        const searchResults = document.getElementsByClassName('group-search-result-list')[0];

        if (newActiveId < groupResults.length - 3) searchResults.scrollTop -= 40;
        else if (newActiveId === groupResults.length - 1) searchResults.scrollTop = 40 * groupResults.length;
    }

    handleKeyUp = (event) => {

        const { groupResults } = this.props.search;

        const { activeId } = this.state;
        let key = event.keyCode;


        switch (key) {

            case 40: {
                let newActiveId = activeId === groupResults.length - 1 ? 0 : activeId + 1;

                this.handleArrowUpScroll(newActiveId, groupResults);
                this.setState((state, props) => ({ activeId: newActiveId }));
                break;
            }


            case 38: {
                let newActiveId = activeId === 0 ? groupResults.length - 1 : activeId - 1;

                this.handleArrowDonwScroll(newActiveId, groupResults);
                this.setState((state, props) => ({ activeId: newActiveId }));
                break;
            }

            case 13: {
                event.preventDefault();
                this.handleResultClick(groupResults[activeId]);
                break;
            }
        }

    }

    render() {

            const { lastSelectedGroup } = this.props.search;

        return (
            <div className="group-search-form"
                 tabIndex="0"
                  onBlur={this.handleBlur}
                 onFocus={this.handleFocus}
                 onKeyUp={this.handleKeyUp}>
                <input
                    placeholder="חיפוש קבוצה"
                    ref={input => this.groupSearch = input}
                    value={!this.state.query && lastSelectedGroup ?  lastSelectedGroup.groupName : this.state.query}
                    onChange={this.handleInputChange}
                    className="search-input"
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                />
                <div className="group-search-result-list">
                    {this.renderSearchResults()}
                </div>
            </div>
        )
    }
}

export default GroupSearchBar;
