import React, { Component } from 'react'
import SearchResultItem from "./SearchResultItem";

class SearchBarComponent extends Component {

    state = {
        query: '',
        results: []
    };

    handleInputChange = () => {

        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query) {
                this.props.searchItems(this.state.query, this.props.items)
            } else this.props.resetSearchResults();
        });
    };

    renderSearchResults = () => {

        const { peopleResults, groupResults } = this.props.search;

        const results = [...peopleResults, ...groupResults];


        if( this.state.query !== "" && !results.length ) {
            return (
                <div className="no-results">
                    Sorry, nothing matches your search
                </div>
            );
        }

        return results.map(result => <SearchResultItem
                                        key={result.id}
                                        item={result}
                                        onClick={() => this.handleResultClick(result)}
                                        onMouseEnter={this.handleResultMouseEnter}/>);
    }

    handleResultClick = (result) => {

        const { selectItem, resetSearchResults } = this.props;

        this.setState({
            query: ""
        });

        selectItem(result);
        resetSearchResults()
    }

    handleResultMouseEnter = (value) => {
        //
        // this.search.value = value;
        // this.setState({
        //     query: value
        // });
    }

    handleBlur = () => {
      //  const searchResults = document.getElementsByClassName('search-result-list')[0];
       // searchResults.classList.remove('visible')
    }

    handleFocus = () => {
      //  const searchResults = document.getElementsByClassName('search-result-list')[0];
       // searchResults.classList.add('visible')
    }

    render() {

        return (
            <div className="header-search-form">
                <input
                    placeholder="Search"
                    ref={input => this.search = input}
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    className="search-input"
                    onBlur={this.handleBlur}
                    onFocus={this.handleFocus}
                />
                <div className="search-result-list">
                    {this.renderSearchResults()}
                </div>
            </div>
        )
    }
}

export default SearchBarComponent;
