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
            } // else this.props.resetSearchResults();
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

        const { selectPerson, resetSearchResults, guardianNumber } = this.props;

        this.setState( () => ({
            query: `${result.name} ${result.surname}`
        }));


        selectPerson(result, guardianNumber);
       // resetSearchResults()

        this.handleBlur()
    }

    handleResultMouseEnter = (index) => {
        //
        // this.search.value = value;
        // this.setState({
        //     query: value
        // });

        this.setState((state,props) => ({ activeId: index}));
    }

    handleBlur = () => {



        const searchResults = document.getElementById(this.props.searchResultId);

        console.log(searchResults);

        searchResults.classList.remove('visible');

        //this.props.resetSearchResults();


    };

    handleFocus = () => {

        const searchResults = document.getElementById(this.props.searchResultId);

        searchResults.classList.add('visible')
    };

    handleArrowUpScroll = (newActiveId, peopleResults) => {

        const searchResults = document.getElementById(this.props.searchResultId);

        if (newActiveId > 3 && newActiveId !== 0) searchResults.scrollTop += 40;
        if (newActiveId === 0) searchResults.scrollTop = 0;
    }

    handleArrowDonwScroll = (newActiveId, peopleResults) => {

        const searchResults = document.getElementById(this.props.searchResultId);

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
                event.preventDefault();
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
                 id={`people-search-form-${this.props.guardianNumber}`}
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
                <div className="people-search-result-list"  id={this.props.searchResultId}>
                    {this.renderSearchResults()}
                </div>
            </div>
        )
    }
}

export default PeopleSearchBar;
