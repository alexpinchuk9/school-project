import React, { Component } from 'react'
import SearchResultItem from "./SearchResultItem";

class SearchBarComponent extends Component {

    state = {
        query: '',
        results: [],
        activeId: null
    };

    handleInputChange = () => {

        this.setState({
            query: this.search.value
        }, () => {
            if (this.state.query) {
                this.props.searchItems(this.state.query, this.props.items);
                this.setState({ activeId: 1 })
            } else this.props.resetSearchResults();
        });
    };


    renderSearchResults = () => {

        const { peopleResults, groupResults } = this.props.search;

        const results = [...peopleResults, ...groupResults];

        const { activeId } = this.state;


        if( this.state.query !== "" && !results.length ) {
            return (
                <div className="no-results">
                    Sorry, nothing matches your search
                </div>
            );
        }

        return results.map((result, index) => <SearchResultItem
                                        key={result.id}
                                        item={result}
                                        onClick={() => this.handleResultClick(result)}
                                        className={activeId === index ? "active" : ""}
                                        onMouseEnter={() => this.handleResultMouseEnter(index)}/>);
    }

    handleResultClick = (result) => {

        const { selectItem, resetSearchResults } = this.props;

        this.setState({
            query: ""
        });

        selectItem(result);
        resetSearchResults()
    }

    handleResultMouseEnter = (index) => {
        //
        // this.search.value = value;
        // this.setState({
        //     query: value
        // });
        // this.setState((state,props) => ({ activeId: index}));
    }

    handleBlur = () => {

       const searchResults = document.getElementsByClassName('search-result-list')[0];

       searchResults.classList.remove('visible')
    };

    handleFocus = () => {

       const searchResults = document.getElementsByClassName('search-result-list')[0];

       searchResults.classList.add('visible')
    };

    handleKeyUp = (event) => {

        // const { peopleResults, groupResults } = this.props.search;
        //
        // const results = [...peopleResults, ...groupResults];
        //
        // const { activeId } = this.state;
        // const { selectItem } = this.props;
        //
        // let key = event.keyCode;
        //
        // switch (key) {
        //
        //     case 40: {
        //         let newActiveId = activeId === results.length ? 1 : activeId + 1;
        //
        //         this.setState((state, props) => ({ activeId: newActiveId }));
        //         break;
        //     }
        //
        //
        //     case 38: {
        //         let newActiveId = activeId === results.length ? 1 : activeId - 1;
        //
        //         this.setState((state, props) => ({ activeId: newActiveId }));
        //         break;
        //     }
        //
        //     case 13: {
        //         this.handleResultClick(results[activeId]);
        //         break;
        //     }
        // }

        //console.log(activeId);

    }

    render() {

        return (
            <div className="header-search-form"
                 tabIndex="0"
                 onBlur={this.handleBlur}
                 onFocus={this.handleFocus}
                 onKeyUp={this.handleKeyUp}>
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
