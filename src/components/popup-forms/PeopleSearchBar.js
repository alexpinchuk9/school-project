import React, { Component } from 'react'
import SearchResultItem from "../SearchResultItem";

class PeopleSearchBar extends Component {

    state = {
        query: '',
        peopleResults: [],
        activeId: null
    };

    handleInputChange = () => {

        this.setState({
            query: this.groupSearch.value
        }, () => {
            if (this.state.query) {
                this.props.searchPeople(this.state.query, this.props.people);
                this.setState({ activeId: 0 })
            } else this.props.resetSearchResults();
        });
    };


    renderSearchResults = () => {

        const {  peopleResults } = this.props.search;


        const { activeId } = this.state;


        if( this.state.query !== "" && !peopleResults.length ) {
            return (
                <div className="no-results">
                    Sorry, nothing matches your search
                </div>
            );
        }

        return peopleResults.map((result, index) => <SearchResultItem
            key={result.id}
            item={result}
            onClick={() => this.handleResultClick(result)}
            className={activeId === index ? "active" : ""}
            onMouseEnter={() => this.handleResultMouseEnter(index)}/>);
    }

    handleResultClick = (result) => {

        const { selectPerson, resetSearchResults } = this.props;

        this.setState({
            query: ""
        });

        selectPerson(result);
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

        const searchResults = document.getElementsByClassName('people-search-result-list')[0];

        searchResults.classList.remove('visible')
    };

    handleFocus = () => {

        const searchResults = document.getElementsByClassName('people-search-result-list')[0];

        searchResults.classList.add('visible')
    };

    handleArrowUpScroll = (newActiveId, peopleResults) => {

        const searchResults = document.getElementsByClassName('people-search-result-list')[0];

        if (newActiveId > 3 && newActiveId !== 0) searchResults.scrollTop += 40;
        if (newActiveId === 0) searchResults.scrollTop = 0;
    }

    handleArrowDonwScroll = (newActiveId, peopleResults) => {

        const searchResults = document.getElementsByClassName('people-search-result-list')[0];

        if (newActiveId < peopleResults.length - 3) searchResults.scrollTop -= 40;
        else if (newActiveId === peopleResults.length - 1) searchResults.scrollTop = 40 * peopleResults.length;
    }

    handleKeyUp = (event) => {

        const { peopleResults } = this.props.search;

        const { activeId } = this.state;
        let key = event.keyCode;


        switch (key) {

            case 40: {
                let newActiveId = activeId === peopleResults.length - 1 ? 0 : activeId + 1;

                this.handleArrowUpScroll(newActiveId, peopleResults);
                this.setState((state, props) => ({ activeId: newActiveId }));
                break;
            }


            case 38: {
                let newActiveId = activeId === 0 ? peopleResults.length - 1 : activeId - 1;

                this.handleArrowDonwScroll(newActiveId, peopleResults);
                this.setState((state, props) => ({ activeId: newActiveId }));
                break;
            }

            case 13: {
                this.handleResultClick(peopleResults[activeId]);
                break;
            }
        }

    }

    render() {

        return (
            <div className="people-search-form"
                 tabIndex="0"
                 onBlur={this.handleBlur}
                 onFocus={this.handleFocus}
                 onKeyUp={this.handleKeyUp}>
                <input
                    placeholder="Search"
                    ref={input => this.groupSearch = input}
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    className="search-input"
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                />
                <div className="people-search-result-list">
                    {this.renderSearchResults()}
                </div>
            </div>
        )
    }
}

export default PeopleSearchBar;
