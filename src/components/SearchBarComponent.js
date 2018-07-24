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
                this.setState({ activeId: 0 })
            } else this.props.resetSearchResults();
        });
    };


    renderSearchResults = () => {

        const { itemResults } = this.props.search;

        const { activeId } = this.state;


        if( this.state.query !== "" && !itemResults.length ) {
            return (
                <div className="no-results">
                    Sorry, nothing matches your search
                </div>
            );
        }

        return itemResults.map((result, index) => <SearchResultItem
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

        console.log(index);
        this.setState((state,props) => ({ activeId: index}));
    }

    handleBlur = () => {

       const searchResults = document.getElementsByClassName('search-result-list')[0];

       searchResults.classList.remove('visible')
    };

    handleFocus = () => {

       const searchResults = document.getElementsByClassName('search-result-list')[0];

       searchResults.classList.add('visible')
    };

    handleArrowUpScroll = (newActiveId, itemResults) => {

        const searchResults = document.getElementsByClassName('search-result-list')[0];

        if (newActiveId > 3 && newActiveId !== 0) searchResults.scrollTop += 40;
        if (newActiveId === 0) searchResults.scrollTop = 0;
    }

    handleArrowDonwScroll = (newActiveId, itemResults) => {

        const searchResults = document.getElementsByClassName('search-result-list')[0];

        if (newActiveId < itemResults.length - 3) searchResults.scrollTop -= 40;
        else if (newActiveId === itemResults.length - 1) searchResults.scrollTop = 40 * itemResults.length;
    }

    handleKeyUp = (event) => {

        const { itemResults } = this.props.search;

        const { activeId } = this.state;
        let key = event.keyCode;


        switch (key) {

            case 40: {
                let newActiveId = activeId === itemResults.length - 1 ? 0 : activeId + 1;

                this.handleArrowUpScroll(newActiveId, itemResults);
                this.setState((state, props) => ({ activeId: newActiveId }));
                break;
            }


            case 38: {
                let newActiveId = activeId === 0 ? itemResults.length - 1 : activeId - 1;

                this.handleArrowDonwScroll(newActiveId, itemResults);
                this.setState((state, props) => ({ activeId: newActiveId }));
                break;
            }

            case 13: {
                this.handleResultClick(itemResults[activeId]);
                break;
            }
        }

        console.log(activeId);

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
